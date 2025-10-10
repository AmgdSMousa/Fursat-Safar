import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import ErrorBoundary from './components/ErrorBoundary';
import Jobs from './components/Jobs';
import ApplyPage from './components/ApplyPage';
import ApplicationConfirmation from './components/ApplicationConfirmation';
import AdminPage from './components/admin/AdminPage';

const App: React.FC = () => {
  const getPathFromHash = () => {
    // e.g., #/jobs?q=1 -> /jobs?q=1
    return window.location.hash.substring(1) || '/';
  };

  const [pathname, setPathname] = useState(getPathFromHash());
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) return storedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);
  
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);


  useEffect(() => {
    const updateMetaTags = (path: string) => {
      let title = 'فرصة سفر | بوابتك للعمل في الخارج';
      let description = 'شركة فرصة سفر هي بوابتك الأولى للحصول على وظيفة أحلامك في الخارج. نحن نربط الكفاءات المصرية بأفضل الشركات العالمية.';
      
      const cleanPath = path.split('?')[0];

      if (cleanPath.startsWith('/apply/')) {
        title = 'التقديم على وظيفة - فرصة سفر';
        description = 'أكمل طلبك وقدم سيرتك الذاتية للوظيفة التي اخترتها. خطوة واحدة تفصلك عن وظيفة أحلامك.';
      } else if (cleanPath.startsWith('/admin')) {
        title = 'لوحة التحكم - فرصة سفر';
        description = 'إدارة الوظائف، طلبات التوظيف، والمزيد من لوحة التحكم.';
      } else {
         switch (cleanPath) {
          case '/login':
            title = 'تسجيل الدخول - فرصة سفر';
            description = 'سجل الدخول إلى حسابك في فرصة سفر لمتابعة طلباتك والوصول إلى فرص عمل حصرية في الخارج.';
            break;
          case '/signup':
            title = 'إنشاء حساب جديد - فرصة سفر';
            description = 'أنشئ حساباً جديداً في فرصة سفر وابدأ رحلتك نحو مستقبل مهني واعد. قم بتحميل سيرتك الذاتية وتواصل مع أفضل الشركات.';
            break;
          case '/profile':
            title = 'ملفي الشخصي - فرصة سفر';
            description = 'قم بإدارة ملفك الشخصي وتحديث معلوماتك على منصة فرصة سفر. تابع حالة طلباتك الوظيفية بسهولة.';
            break;
          case '/forgot-password':
            title = 'استعادة كلمة المرور - فرصة سفر';
            description = 'هل نسيت كلمة المرور؟ قم باستعادة الوصول إلى حسابك في فرصة سفر بسهولة وأمان.';
            break;
          case '/jobs':
              title = 'الوظائف - فرصة سفر';
              description = 'ابحث عن وظيفة أحلامك في الخارج. تصفح مئات الفرص الوظيفية المتاحة في أفضل الشركات حول العالم.';
              break;
          case '/application-confirmation':
            title = 'تم إرسال طلبك - فرصة سفر';
            description = 'شكراً لتقديمك! تم إرسال طلبك بنجاح وسنقوم بمراجعته قريباً.';
            break;
        }
      }
      
      document.title = title;

      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    };

    updateMetaTags(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleHashChange = () => {
      const newPath = getPathFromHash();
      setPathname(newPath);

      const hashParts = newPath.split('#');
      const hashFragment = hashParts.length > 1 ? hashParts[1] : null;

      if (hashFragment) {
        setTimeout(() => {
          const element = document.getElementById(hashFragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial load check to set path and scroll if needed
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    const cleanPathname = pathname.split('?')[0];
    
    if (cleanPathname.startsWith('/admin')) {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (!isAdmin) {
            // If not an admin, redirect to login page.
            window.location.hash = '/login';
            return null; // Render nothing while redirecting
        }
        return <AdminPage />;
    }
    
    const applyPageMatch = cleanPathname.match(/^\/apply\/(\d+)$/);
    if (applyPageMatch) {
        const jobId = parseInt(applyPageMatch[1], 10);
        return <ApplyPage jobId={jobId} />;
    }

    switch (cleanPathname) {
      case '/login':
        return <Login />;
      case '/signup':
        return <SignUp />;
      case '/profile':
        return <Profile />;
      case '/forgot-password':
        return <ForgotPassword />;
      case '/jobs':
        return <Jobs />;
      case '/application-confirmation':
        return <ApplicationConfirmation />;
      default:
        return <HomePage />;
    }
  };
  
  const cleanPathname = pathname.split('?')[0];
  const isAuthPage = ['/login', '/signup', '/profile', '/forgot-password', '/application-confirmation'].includes(cleanPathname) || cleanPathname.startsWith('/apply/');
  const isAdminPage = cleanPathname.startsWith('/admin');

  return (
    <div className="overflow-x-hidden">
      {!isAdminPage && <Header currentTheme={theme} toggleTheme={toggleTheme} />}
      <main>
        <ErrorBoundary>
          {renderPage()}
        </ErrorBoundary>
      </main>
      {!isAuthPage && !isAdminPage && <Footer />}
    </div>
  );
};

export default App;
