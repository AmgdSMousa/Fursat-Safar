import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { User, initialUsers } from './usersData';

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (fullName || email || password || confirmPassword) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [fullName, email, password, confirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين.');
      return;
    }

    // Get all users from localStorage, or initialize with default users
    let users: User[] = JSON.parse(localStorage.getItem('users') || 'null');
    // Fix: Initialize with default users if localStorage is empty or doesn't exist.
    if (!users || users.length === 0) {
        users = initialUsers;
    }

    // Check if user already exists
    if (users.some(u => u.email === email)) {
        setError('هذا البريد الإلكتروني مسجل بالفعل.');
        return;
    }

    // Add new user
    const newUser: User = {
        fullName,
        email,
        password, // Storing password directly for this simulation
        registeredAt: new Date().toISOString(),
        isAdmin: false
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Log the new user in
    const userProfile = { fullName, email };
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.removeItem('isAdmin');

    // Navigate to profile page
    window.location.hash = '/profile';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center pt-24 pb-12 px-4">
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/10 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      <ErrorBoundary>
        <div className="relative w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold gradient-text mb-2">إنشاء حساب جديد</h1>
            <p className="text-gray-600 dark:text-gray-400">انضم إلينا وابدأ رحلتك نحو وظيفة أحلامك.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-2">
                الاسم الكامل
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-right dark:placeholder-gray-400"
                placeholder="اسمك الكامل"
              />
            </div>
             <div>
              <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-2">
                البريد الإلكتروني
              </label>
              <input
                id="email-signup"
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
              <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-2">
                كلمة المرور
              </label>
              <input
                id="password-signup"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-right dark:placeholder-gray-400"
                placeholder="********"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-2">
                تأكيد كلمة المرور
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-right dark:placeholder-gray-400"
                placeholder="********"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-md transition-transform transform hover:scale-105 duration-300"
              >
                إنشاء حساب
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            لديك حساب بالفعل؟{' '}
            <a href="#/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              سجل الدخول
            </a>
          </p>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default SignUp;