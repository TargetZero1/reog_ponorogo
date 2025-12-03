<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Ticket;
use App\Models\Event;
use App\Models\Place;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Dompdf\Dompdf;
use Dompdf\Options;


class BookingController extends Controller
{


    public function showRegister(Request $request)
    {
        return Inertia::render('Booking/Register', [
            'attraction' => $request->query('attraction')
        ]);
    }

    public function showLogin(Request $request)
    {
        return Inertia::render('Booking/Login');
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required|string',
            'attraction' => 'nullable|string'
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'user',
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        // After register, continue to checkout if attraction is present
        if (!empty($data['attraction'])) {
            return redirect()->to('/pesan-ticket/checkout?attraction=' . urlencode($data['attraction']))->with('success', 'Pendaftaran berhasil! Silakan lanjutkan pemesanan.');
        }

        return redirect()->to('/')->with('success', 'Pendaftaran berhasil!');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            // Check if there's an attraction parameter to redirect to checkout
            $attraction = $request->query('attraction');
            if ($attraction) {
                return redirect()->to('/pesan-ticket/checkout?attraction=' . urlencode($attraction))->with('success', 'Login berhasil!');
            }

            return redirect()->intended('/')->with('success', 'Login berhasil!');
        }

        return back()->withErrors(['email' => 'Email atau password salah'])->onlyInput('email');
    }

    // Show checkout — user must be authenticated
    public function showCheckout(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('pesan.register', ['attraction' => $request->query('attraction')]);
        }

        $attraction = $request->query('attraction');
        $type = $request->query('type'); // 'event' or 'place'
        $id = $request->query('id'); // Event or Place ID

        $pricePerTicket = 0;
        $attractionName = $attraction;

        // If type and id are provided, load dynamic price from Event or Place model
        if ($type && $id) {
            if ($type === 'event') {
                $event = Event::find($id);
                if ($event) {
                    $pricePerTicket = $event->price ?? 0;
                    $attractionName = $event->title; // Fixed: Event uses 'title' not 'name'
                }
            } elseif ($type === 'place') {
                $place = Place::find($id);
                if ($place) {
                    $pricePerTicket = $place->price ?? 0;
                    $attractionName = $place->name;
                }
            }
        } else {
            // Fallback to static price mapping for backward compatibility
            $ticketPrices = [
                'Grebeg Suro' => 0, // Gratis
                'Telaga Ngebel' => 10000,
                'Masjid Tegalsari' => 0, // Gratis
                'Taman Wisata Ngembag' => 15000,
                'Alun-alun Ponorogo' => 0, // Gratis
                'Air Terjun Pletuk' => 5000,
                'Gunung Bayangkaki' => 20000,
            ];
            $pricePerTicket = $ticketPrices[$attraction] ?? 0;
        }

        return Inertia::render('Booking/Checkout', [
            'attraction' => $attractionName,
            'pricePerTicket' => $pricePerTicket,
            'ticketType' => $type,
            'sourceId' => $id,
        ]);
    }



    public function createTicket(Request $request)
    {
        try {
            $data = $request->validate([
                'attraction' => 'required|string',
                'quantity' => 'required|integer|min:1|max:10',
                'total_price' => 'required|numeric|min:0',
                'visit_date' => 'required|date|after:today',
            ]);

            // Log the booking attempt
            Log::info('Ticket booking attempt', [
                'user_id' => Auth::id(),
                'attraction' => $data['attraction'],
                'quantity' => $data['quantity'],
                'total_price' => $data['total_price'],
                'visit_date' => $data['visit_date'],
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent()
            ]);

            $ticket = Ticket::create([
                'user_id' => Auth::id(),
                'attraction_name' => $data['attraction'],
                'quantity' => $data['quantity'],
                'total_price' => $data['total_price'],
                'visit_date' => $data['visit_date'],
                'payment_status' => 'completed',
                'ticket_type' => $request->input('ticket_type'),
                'source_id' => $request->input('source_id'),
            ]);

            // Log successful booking
            Log::info('Ticket booking successful', [
                'ticket_id' => $ticket->id,
                'user_id' => Auth::id(),
                'attraction' => $data['attraction']
            ]);

            // Generate WhatsApp message
            $message = "Halo, saya ingin memesan tiket:\n\n" .
                       "Attraction: {$data['attraction']}\n" .
                       "Jumlah Tiket: {$data['quantity']}\n" .
                       "Total Harga: Rp " . number_format($data['total_price'], 0, ',', '.') . "\n" .
                       "Tanggal Kunjungan: " . date('d/m/Y', strtotime($data['visit_date'])) . "\n\n" .
                       "Mohon konfirmasi pemesanan ini.";

            // Use WhatsApp API endpoint (api.whatsapp.com)
            $whatsappUrl = "https://api.whatsapp.com/send?phone=62882009759102&text=" . urlencode($message);

            // Render confirmation page with WhatsApp URL instead of redirect away
            return Inertia::render('Booking/Confirmation', [
                'ticket' => $ticket,
                'whatsappUrl' => $whatsappUrl,
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Log validation errors
            Log::warning('Ticket booking validation failed', [
                'user_id' => Auth::id(),
                'errors' => $e->errors(),
                'input' => $request->all()
            ]);

            return back()->withErrors($e->errors())->withInput();

        } catch (\Exception $e) {
            // Log unexpected errors
            Log::error('Ticket booking failed with unexpected error', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'input' => $request->all()
            ]);

            return back()->withErrors(['general' => 'Terjadi kesalahan saat memproses pemesanan. Silakan coba lagi.'])->withInput();
        }
    }

    public function showConfirmation($id)
    {
        $ticket = Ticket::findOrFail($id);
        return Inertia::render('Booking/Confirmation', [
            'ticket' => $ticket,
        ]);
    }



    public function showPaymentHistory()
    {
        if (!Auth::check()) {
            return redirect()->route('pesan.login');
        }

        $payments = Ticket::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('PaymentHistory', [
            'payments' => $payments,
        ]);
    }

    // Admin Dashboard
    public function adminDashboard()
    {
        $totalOrders = Ticket::count();
        $totalRevenue = Ticket::sum('total_price');
        $totalUsers = User::where('role', 'user')->count();
        $totalEvents = Event::count();
        
        $recentOrders = Ticket::with('user')
            ->latest()
            ->limit(5)
            ->get();

        // Orders by month for chart (last 6 months)
        $ordersByMonth = Ticket::selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count, SUM(total_price) as revenue")
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupByRaw("DATE_FORMAT(created_at, '%Y-%m')")
            ->orderByRaw('month ASC')
            ->get();

        // Revenue by attraction (top 5)
        $revenueByAttraction = Ticket::selectRaw('attraction_name, SUM(total_price) as revenue, COUNT(*) as orders')
            ->groupBy('attraction_name')
            ->orderByDesc('revenue')
            ->limit(5)
            ->get();

        // Payment status breakdown
        $paymentStatusBreakdown = Ticket::selectRaw('payment_status, COUNT(*) as count, SUM(total_price) as revenue')
            ->groupBy('payment_status')
            ->get();

        // Today's stats
        $todayOrders = Ticket::whereDate('created_at', today())->count();
        $todayRevenue = Ticket::whereDate('created_at', today())->sum('total_price');
        $thisMonthOrders = Ticket::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
        $thisMonthRevenue = Ticket::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('total_price');
        
        // Additional stats for Users and Events
        $thisMonthNewUsers = User::where('role', 'user')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
        $thisMonthNewEvents = Event::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalOrders' => $totalOrders,
                'totalRevenue' => $totalRevenue,
                'totalUsers' => $totalUsers,
                'totalEvents' => $totalEvents,
                'todayOrders' => $todayOrders,
                'todayRevenue' => $todayRevenue,
                'thisMonthOrders' => $thisMonthOrders,
                'thisMonthRevenue' => $thisMonthRevenue,
                'thisMonthNewUsers' => $thisMonthNewUsers,
                'thisMonthNewEvents' => $thisMonthNewEvents,
            ],
            'recentOrders' => $recentOrders,
            'ordersByMonth' => $ordersByMonth,
            'revenueByAttraction' => $revenueByAttraction,
            'paymentStatusBreakdown' => $paymentStatusBreakdown,
        ]);
    }

    // Admin Analytics
    public function adminAnalytics()
    {
        $ticketsByAttraction = Ticket::selectRaw('attraction_name, COUNT(*) as count, SUM(total_price) as revenue')
            ->groupBy('attraction_name')
            ->orderByDesc('count')
            ->get();

        // MySQL-compatible monthly aggregation (use first day of month)
        $ordersByMonth = Ticket::selectRaw("DATE_FORMAT(created_at, '%Y-%m-01') as month, COUNT(*) as count, SUM(total_price) as revenue")
            ->groupByRaw("DATE_FORMAT(created_at, '%Y-%m-01')")
            ->orderByRaw('month DESC')
            ->limit(12)
            ->get();

        $averageOrderValue = Ticket::avg('total_price');
        $totalTicketsSold = Ticket::sum('quantity');
        $totalRevenue = Ticket::sum('total_price');
        $totalOrders = Ticket::count();
        $totalUsers = User::where('role', 'user')->count();

        // Additional metrics
        $todayOrders = Ticket::whereDate('created_at', today())->count();
        $todayRevenue = Ticket::whereDate('created_at', today())->sum('total_price');
        $thisMonthOrders = Ticket::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
        $thisMonthRevenue = Ticket::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('total_price');

        // Payment status breakdown
        $paymentStatusBreakdown = Ticket::selectRaw('payment_status, COUNT(*) as count, SUM(total_price) as revenue')
            ->groupBy('payment_status')
            ->get();

        return Inertia::render('Admin/Analytics', [
            'ticketsByAttraction' => $ticketsByAttraction,
            'ordersByMonth' => $ordersByMonth,
            'averageOrderValue' => $averageOrderValue,
            'totalTicketsSold' => $totalTicketsSold,
            'totalRevenue' => $totalRevenue,
            'totalOrders' => $totalOrders,
            'totalUsers' => $totalUsers,
            'todayOrders' => $todayOrders,
            'todayRevenue' => $todayRevenue,
            'thisMonthOrders' => $thisMonthOrders,
            'thisMonthRevenue' => $thisMonthRevenue,
            'paymentStatusBreakdown' => $paymentStatusBreakdown,
        ]);
    }

    // Admin Orders Management
    public function adminOrders(Request $request)
    {
        $query = Ticket::with('user');

        // Filters: search query, date range, status
        if ($q = $request->query('q')) {
            $query->where(function ($sub) use ($q) {
                $sub->where('attraction_name', 'like', "%{$q}%")
                    ->orWhere('id', 'like', "%{$q}%")
                    ->orWhereHas('user', function ($u) use ($q) {
                        $u->where('name', 'like', "%{$q}%")->orWhere('email', 'like', "%{$q}%");
                    });
            });
        }

        if ($start = $request->query('start_date')) {
            $query->whereDate('created_at', '>=', $start);
        }

        if ($end = $request->query('end_date')) {
            $query->whereDate('created_at', '<=', $end);
        }

        if ($status = $request->query('status')) {
            $query->where('payment_status', $status);
        }

        $orders = $query->orderBy('created_at', 'desc')->paginate(15)->appends($request->query());

        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
            'filters' => [
                'q' => $request->query('q'),
                'start_date' => $request->query('start_date'),
                'end_date' => $request->query('end_date'),
                'status' => $request->query('status'),
            ],
        ]);
    }

    // Show single order
    public function adminOrderShow($id)
    {
        $ticket = Ticket::with('user')->findOrFail($id);
        return Inertia::render('Admin/OrderShow', [
            'order' => $ticket,
        ]);
    }

    // Update order status (e.g., refund, cancel, complete)
    public function adminUpdateOrderStatus(Request $request, $id)
    {
        $data = $request->validate([
            'status' => 'required|string|in:pending,completed,cancelled,refunded'
        ]);

        $ticket = Ticket::findOrFail($id);
        $ticket->payment_status = $data['status'];
        $ticket->save();

        return redirect()->route('admin.orders')->with('success', 'Status pesanan diperbarui.');
    }

    // Helper function to generate PDF
    private function generatePDF($html, $filename)
    {
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', true);
        $options->set('defaultFont', 'Arial');
        
        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        
        return $dompdf->stream($filename);
    }

    // Export orders as PDF
    public function adminExportOrders(Request $request)
    {
        $query = Ticket::with('user');

        if ($q = $request->query('q')) {
            $query->where(function ($sub) use ($q) {
                $sub->where('attraction_name', 'like', "%{$q}%")
                    ->orWhere('id', 'like', "%{$q}%")
                    ->orWhereHas('user', function ($u) use ($q) {
                        $u->where('name', 'like', "%{$q}%")->orWhere('email', 'like', "%{$q}%");
                    });
            });
        }

        if ($start = $request->query('start_date')) {
            $query->whereDate('created_at', '>=', $start);
        }

        if ($end = $request->query('end_date')) {
            $query->whereDate('created_at', '<=', $end);
        }

        if ($status = $request->query('status')) {
            $query->where('payment_status', $status);
        }

        $orders = $query->orderBy('created_at', 'desc')->get();

        $html = '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #8B0000; border-bottom: 3px solid #D97706; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background-color: #8B0000; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .header { margin-bottom: 30px; }
        .summary { background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Orders Report</h1>
        <p><strong>Generated:</strong> ' . now()->format('d F Y H:i:s') . '</p>
        <p><strong>Total Orders:</strong> ' . $orders->count() . '</p>
    </div>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Attraction</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Visit Date</th>
                <th>Created At</th>
            </tr>
        </thead>
        <tbody>';

        foreach ($orders as $o) {
            $html .= '<tr>
                <td>#' . $o->id . '</td>
                <td>' . htmlspecialchars(optional($o->user)->name ?? 'N/A') . '</td>
                <td>' . htmlspecialchars(optional($o->user)->email ?? 'N/A') . '</td>
                <td>' . htmlspecialchars($o->attraction_name) . '</td>
                <td>' . $o->quantity . '</td>
                <td>Rp ' . number_format($o->total_price, 0, ',', '.') . '</td>
                <td>' . htmlspecialchars($o->payment_status) . '</td>
                <td>' . ($o->visit_date ? date('d M Y', strtotime($o->visit_date)) : 'N/A') . '</td>
                <td>' . $o->created_at->format('d M Y H:i') . '</td>
            </tr>';
        }

        $html .= '</tbody>
    </table>
</body>
</html>';

        $filename = 'orders_export_' . now()->format('Ymd_His') . '.pdf';
        return $this->generatePDF($html, $filename);
    }

    // Admin Users Management
    public function adminUsers()
    {
        $users = User::where('role', 'user')
            ->withCount('tickets')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    // Admin Reports
    public function adminReports()
    {
        $totalOrders = Ticket::count();
        $totalRevenue = Ticket::sum('total_price');
        $totalUsers = User::where('role', 'user')->count();
        $averageOrderValue = Ticket::avg('total_price');

        $topAttractions = Ticket::selectRaw('attraction_name, COUNT(*) as orders, SUM(total_price) as revenue')
            ->groupBy('attraction_name')
            ->orderByDesc('revenue')
            ->limit(10)
            ->get();

        $topCustomers = User::where('role', 'user')
            ->withCount('tickets')
            ->orderByDesc('tickets_count')
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Reports', [
            'summary' => [
                'totalOrders' => $totalOrders,
                'totalRevenue' => $totalRevenue,
                'totalUsers' => $totalUsers,
                'averageOrderValue' => $averageOrderValue,
            ],
            'topAttractions' => $topAttractions,
            'topCustomers' => $topCustomers,
        ]);
    }

    // Export Analytics as PDF
    public function adminExportAnalytics(Request $request)
    {

        $ticketsByAttraction = Ticket::selectRaw('attraction_name, COUNT(*) as count, SUM(total_price) as revenue')
            ->groupBy('attraction_name')
            ->orderByDesc('count')
            ->get();

        $ordersByMonth = Ticket::selectRaw("DATE_FORMAT(created_at, '%Y-%m-01') as month, COUNT(*) as count, SUM(total_price) as revenue")
            ->groupByRaw("DATE_FORMAT(created_at, '%Y-%m-01')")
            ->orderByRaw('month DESC')
            ->limit(12)
            ->get();

        $averageOrderValue = Ticket::avg('total_price');
        $totalTicketsSold = Ticket::sum('quantity');
        $totalRevenue = Ticket::sum('total_price');

        $html = '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #8B0000; border-bottom: 3px solid #D97706; padding-bottom: 10px; }
        h2 { color: #8B0000; margin-top: 30px; border-bottom: 2px solid #D97706; padding-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background-color: #8B0000; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .summary { background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .summary-item { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #D97706; }
        .summary-item strong { display: block; color: #8B0000; margin-bottom: 5px; }
    </style>
</head>
<body>
    <div>
        <h1>Analytics Report</h1>
        <p><strong>Generated:</strong> ' . now()->format('d F Y H:i:s') . '</p>
    </div>
    
    <div class="summary">
        <div class="summary-item">
            <strong>Total Revenue</strong>
            <span>Rp ' . number_format($totalRevenue, 0, ',', '.') . '</span>
        </div>
        <div class="summary-item">
            <strong>Average Order Value</strong>
            <span>Rp ' . number_format($averageOrderValue, 0, ',', '.') . '</span>
        </div>
        <div class="summary-item">
            <strong>Total Tickets Sold</strong>
            <span>' . $totalTicketsSold . '</span>
        </div>
    </div>

    <h2>Sales by Attraction</h2>
    <table>
        <thead>
            <tr>
                <th>Attraction</th>
                <th>Orders</th>
                <th>Revenue</th>
            </tr>
        </thead>
        <tbody>';

        foreach ($ticketsByAttraction as $attr) {
            $html .= '<tr>
                <td>' . htmlspecialchars($attr->attraction_name) . '</td>
                <td>' . $attr->count . '</td>
                <td>Rp ' . number_format($attr->revenue, 0, ',', '.') . '</td>
            </tr>';
        }

        $html .= '</tbody>
    </table>

    <h2>Orders by Month</h2>
    <table>
        <thead>
            <tr>
                <th>Month</th>
                <th>Orders</th>
                <th>Revenue</th>
            </tr>
        </thead>
        <tbody>';

        foreach ($ordersByMonth as $month) {
            $html .= '<tr>
                <td>' . date('F Y', strtotime($month->month)) . '</td>
                <td>' . $month->count . '</td>
                <td>Rp ' . number_format($month->revenue, 0, ',', '.') . '</td>
            </tr>';
        }

        $html .= '</tbody>
    </table>
</body>
</html>';

        $filename = 'analytics_export_' . now()->format('Ymd_His') . '.pdf';
        return $this->generatePDF($html, $filename);
    }

    // Export Reports as PDF
    public function adminExportReports(Request $request)
    {

        $totalOrders = Ticket::count();
        $totalRevenue = Ticket::sum('total_price');
        $totalUsers = User::where('role', 'user')->count();
        $averageOrderValue = Ticket::avg('total_price');

        $topAttractions = Ticket::selectRaw('attraction_name, COUNT(*) as orders, SUM(total_price) as revenue')
            ->groupBy('attraction_name')
            ->orderByDesc('revenue')
            ->limit(10)
            ->get();

        $topCustomers = User::where('role', 'user')
            ->withCount('tickets')
            ->orderByDesc('tickets_count')
            ->limit(10)
            ->get();

        $html = '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #8B0000; border-bottom: 3px solid #D97706; padding-bottom: 10px; }
        h2 { color: #8B0000; margin-top: 30px; border-bottom: 2px solid #D97706; padding-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background-color: #8B0000; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .summary { background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
        .summary-item { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #D97706; }
        .summary-item strong { display: block; color: #8B0000; margin-bottom: 5px; }
    </style>
</head>
<body>
    <div>
        <h1>Business Reports</h1>
        <p><strong>Generated:</strong> ' . now()->format('d F Y H:i:s') . '</p>
    </div>
    
    <div class="summary">
        <div class="summary-item">
            <strong>Total Orders</strong>
            <span>' . $totalOrders . '</span>
        </div>
        <div class="summary-item">
            <strong>Total Revenue</strong>
            <span>Rp ' . number_format($totalRevenue, 0, ',', '.') . '</span>
        </div>
        <div class="summary-item">
            <strong>Total Users</strong>
            <span>' . $totalUsers . '</span>
        </div>
        <div class="summary-item">
            <strong>Average Order Value</strong>
            <span>Rp ' . number_format($averageOrderValue, 0, ',', '.') . '</span>
        </div>
    </div>

    <h2>Top Attractions by Revenue</h2>
    <table>
        <thead>
            <tr>
                <th>Rank</th>
                <th>Attraction</th>
                <th>Orders</th>
                <th>Revenue</th>
            </tr>
        </thead>
        <tbody>';

        $rank = 1;
        foreach ($topAttractions as $attr) {
            $html .= '<tr>
                <td>' . $rank++ . '</td>
                <td>' . htmlspecialchars($attr->attraction_name) . '</td>
                <td>' . $attr->orders . '</td>
                <td>Rp ' . number_format($attr->revenue, 0, ',', '.') . '</td>
            </tr>';
        }

        $html .= '</tbody>
    </table>

    <h2>Top Customers by Order Count</h2>
    <table>
        <thead>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Email</th>
                <th>Total Orders</th>
            </tr>
        </thead>
        <tbody>';

        $rank = 1;
        foreach ($topCustomers as $customer) {
            $html .= '<tr>
                <td>' . $rank++ . '</td>
                <td>' . htmlspecialchars($customer->name) . '</td>
                <td>' . htmlspecialchars($customer->email) . '</td>
                <td>' . $customer->tickets_count . '</td>
            </tr>';
        }

        $html .= '</tbody>
    </table>
</body>
</html>';

        $filename = 'reports_export_' . now()->format('Ymd_His') . '.pdf';
        return $this->generatePDF($html, $filename);
    }
}
