<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTicketRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'attraction' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'integer', 'min:1', 'max:10'],
            'total_price' => ['required', 'numeric', 'min:0'],
            'visit_date' => ['required', 'date', 'after:today'],
        ];
    }

    public function messages(): array
    {
        return [
            'attraction.required' => 'Pilihan wisata harus dipilih.',
            'quantity.required' => 'Jumlah tiket harus diisi.',
            'quantity.min' => 'Jumlah tiket minimal 1.',
            'quantity.max' => 'Jumlah tiket maksimal 10.',
            'total_price.required' => 'Total harga harus dihitung.',
            'visit_date.required' => 'Tanggal kunjungan harus dipilih.',
            'visit_date.after' => 'Tanggal kunjungan harus di masa depan.',
        ];
    }
}
