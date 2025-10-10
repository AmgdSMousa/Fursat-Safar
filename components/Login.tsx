import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { initialUsers, User } from './usersData';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (email || password) {
        e.preventDefault();
        e.returnValue = ''; // Required for modern browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [email, password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Get all users from localStorage, or initialize with default users
    let users: User[] = JSON.parse(localStorage.getItem('users') || 'null');
    // Fix: Initialize with default users if localStorage is empty or doesn't exist.
    if (!users || users.length === 0) {
        users = initialUsers;
        localStorage.setItem('users', JSON.stringify(users));
    }

    const user = users.find(u => u.email === email.trim());

    if (user && user.password === password.trim()) {
      const userProfile = { fullName: user.fullName, email: user.email };
      localStorage.setItem('userProfile', JSON.stringify(userProfile));

      if (user.isAdmin) {
        localStorage.setItem('isAdmin', 'true');
        window.location.hash = '/admin';
      } else {
        localStorage.removeItem('isAdmin');
        window.location.hash = '/profile';
      }
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center pt-24 pb-12 px-4">
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/10 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      <ErrorBoundary>
        <div className="relative w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold gradient-text mb-2">تسجيل الدخول</h1>
            <p className="text-gray-600 dark:text-gray-400">مرحباً بعودتك! سجل الدخول للوصول إلى حسابك.</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
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
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right">
                  كلمة المرور
                </label>
                <div className="text-sm">
                  <a href="#/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                    هل نسيت كلمة المرور؟
                  </a>
                </div>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-right dark:placeholder-gray-400"
                placeholder="********"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-md transition-transform transform hover:scale-105 duration-300"
              >
                تسجيل الدخول
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            ليس لديك حساب؟{' '}
            <a href="#/signup" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              أنشئ حساباً الآن
            </a>
          </p>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Login;