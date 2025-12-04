import { Head, useForm, usePage, router } from '@inertiajs/react';
import { Layout } from '@/Components/Layout';
import { SEO } from '@/Components/SEO';
import { LanguageSwitcher } from '@/Components/LanguageSwitcher';
import { useTranslations } from '@/utils/translations';
import { User, Mail, Lock, Save, CheckCircle } from 'lucide-react';
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
  });

  const [success, setSuccess] = useState(flash?.success || '');
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    if (flash?.success) {
      setSuccess(flash.success);
      setTimeout(() => setSuccess(''), 5000);
    }
  }, [flash?.success]);

  function submit(e: any) {
    e.preventDefault();
    put(route('profile.update', { locale }), {
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
          {/* Header */}
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

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-center gap-3">
              <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
              <p className="text-green-800 font-medium">{success}</p>
            </div>
          )}

          {/* Profile Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={submit} className="space-y-6">
              {/* Name Field */}
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

              {/* Email Field */}
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

              {/* Password Section */}
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

              {/* Submit Button */}
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
            
            {/* Logout Button */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <form 
                method="POST" 
                action="/logout" 
                className="inline"
                onSubmit={(e) => {
                  // Let form submit naturally - browser will handle redirect
                  // This ensures full page reload and session clearing
                }}
              >
                <input type="hidden" name="_token" value={csrf_token} />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition shadow-md"
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
