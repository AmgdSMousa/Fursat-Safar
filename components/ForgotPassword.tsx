import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending a reset link
    console.log(`Password reset requested for: ${email}`);
    setMessage('إذا كان هذا البريد الإلكتروني مسجلاً لدينا، فسيتم إرسال رابط إعادة تعيين كلمة المرور إليه.');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center pt-24 pb-12 px-4">
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/10 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      <ErrorBoundary>
        <div className="relative w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold gradient-text mb-2">إعادة تعيين كلمة المرور</h1>
            <p className="text-gray-600 dark:text-gray-400">أدخل بريدك الإلكتروني وسنرسل لك رابطًا لاستعادة حسابك.</p>
          </div>

          {message ? (
            <div className="p-4 text-center bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700 rounded-lg">
              <p>{message}</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative group">
                <span className="absolute bottom-full mb-2 w-max px-3 py-1 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none left-1/2 -translate-x-1/2 z-10">
                  أدخل بريدك الإلكتروني المسجل لاستعادة حسابك
                </span>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-right dark:placeholder-gray-400"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-md transition-transform transform hover:scale-105 duration-300"
                >
                  إرسال رابط إعادة التعيين
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            تذكرت كلمة المرور؟{' '}
            <a href="#/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              العودة لتسجيل الدخول
            </a>
          </p>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default ForgotPassword;
