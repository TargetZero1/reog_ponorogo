import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Layout } from '@/Components/Layout';
import { SEO } from '@/Components/SEO';
import { LanguageSwitcher } from '@/Components/LanguageSwitcher';
import { useTranslations } from '@/utils/translations';
import { User, Mail, Lock, Save, CheckCircle, Upload, X, Camera } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Profile() {
  const page = usePage();
  const { auth, csrf_token, flash } = page.props as any;
  const user = auth?.user;
  const { t, locale } = useTranslations();

  const { data, setData, put, errors, processing } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    password_confirmation: '',
    profile_picture: null as File | null,
  });

  const [success, setSuccess] = useState(flash?.success || '');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.profile_picture || null);

  useEffect(() => {
    if (flash?.success) {
      setSuccess(flash.success);
      setTimeout(() => setSuccess(''), 5000);
    }
  }, [flash?.success]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setData('profile_picture', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function removeImage() {
    setData('profile_picture', null);
    setPreviewUrl(null);
  }

  function submit(e: any) {
    e.preventDefault();
    
    // Use POST with _method for file uploads
    router.post(route('profile.update', { locale }), {
      _method: 'PUT',
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      profile_picture: data.profile_picture,
    }, {
      forceFormData: true,
      onSuccess: () => {
        setShowPasswordFields(false);
        setData('password', '');
        setData('password_confirmation', '');
      }
    });
  }

  return (
    <Layout>
      <SEO 
        title={`${t('profile.title')} - Reog Ponorogo`}
        description={t('profile.subtitle')}
      />
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-red-950 mb-2 flex items-center gap-3">
                <User size={36} />
                {t('profile.title')}
              </h1>
              <p className="text-neutral-600">{t('profile.subtitle')}</p>
            </div>
            <div className="self-start md:self-auto">
              <LanguageSwitcher variant="light" />
            </div>
          </div>

          {}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-center gap-3">
              <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
              <p className="text-green-800 font-medium">{success}</p>
            </div>
          )}

          {}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={submit} className="space-y-6">
              {}
              <div>
                <label className="block text-sm font-semibold text-red-950 mb-3 flex items-center gap-2">
                  <Camera size={16} />
                  {locale === 'en' ? 'Profile Picture' : 'Foto Profil'}
                </label>
                <div className="flex items-center gap-4">
                  {}
                  <div className="relative">
                    {previewUrl ? (
                      <img 
                        src={previewUrl} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full object-cover border-4 border-red-100"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-100 to-amber-100 flex items-center justify-center border-4 border-red-100">
                        <User size={40} className="text-red-400" />
                      </div>
                    )}
                  </div>

                  {}
                  <div className="flex-1">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                      <Upload size={18} />
                      {previewUrl ? (locale === 'en' ? 'Change Photo' : 'Ganti Foto') : (locale === 'en' ? 'Upload Photo' : 'Upload Foto')}
                      <input 
                        type="file" 
                        accept="image}
              <div>
                <label className="block text-sm font-semibold text-red-950 mb-2 flex items-center gap-2">
                  <User size={16} />
                  {t('profile.name')}
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  className={`w-full rounded-lg border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                    errors.name ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:border-red-500'
                  }`}
                  placeholder="Masukkan nama lengkap"
                />
                {errors.name && <p className="text-red-600 text-sm mt-2 font-medium">{errors.name}</p>}
              </div>

              {}
              <div>
                <label className="block text-sm font-semibold text-red-950 mb-2 flex items-center gap-2">
                  <Mail size={16} />
                  {t('profile.email')}
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  className={`w-full rounded-lg border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                    errors.email ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:border-red-500'
                  }`}
                  placeholder="nama@example.com"
                />
                {errors.email && <p className="text-red-600 text-sm mt-2 font-medium">{errors.email}</p>}
              </div>

              {}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold text-red-950 flex items-center gap-2">
                    <Lock size={16} />
                    {t('profile.password_change')}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPasswordFields(!showPasswordFields)}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    {showPasswordFields ? t('common.cancel') : t('profile.password_change')}
                  </button>
                </div>

                {showPasswordFields && (
                  <div className="space-y-4 bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profile.password_new')}
                      </label>
                      <input
                        type="password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        className={`w-full rounded-lg border-2 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${
                          errors.password ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:border-red-500'
                        }`}
                        placeholder="Minimal 6 karakter"
                      />
                      {errors.password && <p className="text-red-600 text-sm mt-2 font-medium">{errors.password}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profile.password_confirm')}
                      </label>
                      <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={e => setData('password_confirmation', e.target.value)}
                        className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                        placeholder="Ulangi password baru"
                      />
                    </div>
                  </div>
                )}
              </div>

              {}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={processing}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-800 disabled:opacity-50 transition shadow-lg"
                >
                  <Save size={18} />
                  {processing ? t('profile.saving') : t('profile.save_changes')}
                </button>
                {user?.role === 'admin' && (
                  <span className="text-sm text-gray-500">{t('profile.as_admin')}</span>
                )}
              </div>
            </form>
            
            {}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <form
                method="POST"
                action={route('logout')}
                onSubmit={(e) => {
                  // Let the form submit naturally as POST
                  // Don't prevent default
                }}
              >
                <input type="hidden" name="_token" value={csrf_token} />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition shadow-md w-full sm:w-auto"
                >
                  <Lock size={18} />
                  {t('nav.logout')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
