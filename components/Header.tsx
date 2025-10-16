import React, { useState, useEffect, useCallback } from 'react';

// New, more relevant Compass SVG Logo as a Data URI.
const logoSvg = 'PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMzAwLjAwMDAwMHB0IiBoZWlnaHQ9IjMwMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDMwMC4wMDAwMDAgMzAwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMzAwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTAgMTUwMCBsMCAtMTUwMCAxNTAwIDAgMTUwMCAwIDAgMTUwMCAwIDE1MDAgLTE1MDAgMCAtMTUwMCAwIDAKLTE1MDB6IG0xNTU3IDcyOSBjNDcgLTIzIDgzIC03NyA4MyAtMTI1IDAgLTEwMSAtMTM0IC0xNzggLTIyMSAtMTI3IC0xNiAxMAotMjkgMjEgLTI5IDI0IDAgNCAtNiAxNCAtMTQgMjIgLTggNyAtMTkgMzAgLTI0IDUxIC0xOCA2MyAxOCAxMzMgODMgMTYyIDQzCjE5IDcyIDE3IDEyMiAtN3ogbTExNSAtMzUyIGM4OCAtMzIgMTU4IC03OCAyMTQgLTE0MCAyMDkgLTIzMiAxNjcgLTYwNSAtODcKLTc3NyAtMzMgLTIzIC02NiAtMzkgLTczIC0zNyAtNyAzIC0yMyAzMSAtMzUgNjQgbC0yMiA1OCAyNyAyMCBjOTkgNzEgMTUzCjE1MyAxNzQgMjYwIDMwIDE1NiAtNTggMzIzIC0yMDggMzk3IC02MSAzMCAtNzQgMzMgLTE2MiAzMyAtODggMCAtMTAxIC0zCi0xNjIgLTMzIC0yNjUgLTEzMCAtMjg2IC00OTIgLTM4IC02NTMgMjcgLTE3IDUxIC0zOCA1NSAtNDYgMTAgLTI4IC0zNSAtMTU2Ci02NyAtMTg5IC0zMCAtMzIgLTE2MCAtOTAgLTE3NiAtODAgLTEwIDYgLTU2IDEyNiAtNTAgMTMwIDEgMiAzNSAxNiA3NSAzMQpsNzEgMjggLTY4IDY3IGMtMjEzIDIxMCAtMjE1IDUzNCAtNSA3NDYgNjYgNjcgMTcyIDEyNSAyNjAgMTQzIDc3IDE2IDIwMSA2CjI3NyAtMjJ6IG0tMjkgLTIxOCBjMjAgLTExIDM3IC0yNCAzNyAtMzAgMCAtNiA0IC04IDggLTUgMjUgMTYgMTExIC0xMTkgMTEyCi0xNzUgMCAtNDcgLTE0IC00MCAtMjcgMTMgLTggMjkgLTIwIDYzIC0yOSA3NSAtOCAxMyAtMTQgMjUgLTE0IDI4IDEgMjMgLTg3Cjc1IC0xNTggOTQgLTI0IDcgLTQwIDE2IC0zNiAyMiA4IDEzIDU3IDIgMTA3IC0yMnoiLz4KPC9nPgo8L3N2Zz4K';

const navLinks = [
  { href: '#/', text: 'الرئيسية' },
  { href: '#/jobs', text: 'الوظائف' },
  { href: '#/#about', text: 'من نحن' },
  { href: '#/#services', text: 'خدماتنا' },
  { href: '#/#why-us', text: 'لماذا نحن' },
  { href: '#/#contact', text: 'تواصل معنا' },
];

interface HeaderProps {
  currentTheme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentTheme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeSection, setActiveSection] = useState('#/');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  
  const getPathFromHash = () => window.location.hash || '#/';

  const checkLoginStatus = useCallback(() => {
    const userProfile = localStorage.getItem('userProfile');
    setIsLoggedIn(!!userProfile);
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsMenuOpen(false);
    window.location.hash = '/';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKeyword && !searchLocation) return;

    const params = new URLSearchParams();
    if (searchKeyword) {
      params.set('keyword', searchKeyword);
    }
    if (searchLocation) {
      params.set('location', searchLocation);
    }
    
    window.location.hash = `/jobs?${params.toString()}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let scrollSpyCleanup = () => {};

    const handleLocationChange = () => {
      scrollSpyCleanup(); // Clean up existing scroll listener
      checkLoginStatus();
      setIsMenuOpen(false);
      const currentHash = getPathFromHash();
      const currentPath = currentHash.split('?')[0];
      
      if (currentPath === '#/') {
        // Setup scrollspy for the homepage
        const scrollSpy = () => {
          let currentSectionId = '#/';
          const sections = navLinks.map(l => l.href.startsWith('#/#') ? l.href.substring(3) : null).filter(Boolean);

          for (const id of sections) {
            const section = document.getElementById(id!);
            if (section) {
              const rect = section.getBoundingClientRect();
              if (rect.top <= 100 && rect.bottom >= 100) {
                currentSectionId = `#/#${id}`;
                break;
              }
            }
          }
          
          if (window.scrollY < 200) {
            currentSectionId = '#/';
          } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            currentSectionId = '#/#contact';
          }
          
          setActiveSection(currentSectionId);
        };
        
        scrollSpy();
        window.addEventListener('scroll', scrollSpy, { passive: true });
        scrollSpyCleanup = () => window.removeEventListener('scroll', scrollSpy);
      } else {
        setActiveSection(currentPath);
        scrollSpyCleanup = () => {};
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      scrollSpyCleanup();
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [checkLoginStatus]);
  
  const currentPath = getPathFromHash().split('?')[0];
  const isHomePage = currentPath === '#/';
  const isAuthPage = ['#/login', '#/signup', '#/profile', '#/forgot-password'].includes(currentPath);
  const isSolidHeaderPage = isAuthPage || currentPath === '#/jobs' || currentPath.startsWith('#/apply') || currentPath === '#/application-confirmation';
  const headerBgClass = isScrolled || isMenuOpen || isSolidHeaderPage ? 'bg-white/95 dark:bg-gray-800/95 shadow-md backdrop-blur-sm' : 'bg-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a href="#/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logoSvg} alt="Forsa Sfr Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold gradient-text hidden sm:inline">فرصة سفر</span>
          </a>
          
          <div className="hidden lg:flex flex-grow items-center justify-center px-8">
            {isHomePage ? (
              <form onSubmit={handleSearchSubmit} className="w-full max-w-lg flex items-center bg-gray-100 dark:bg-gray-700/80 rounded-full shadow-inner border border-transparent focus-within:border-indigo-500 transition-colors duration-300">
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="الكلمة المفتاحية..."
                  className="w-1/2 px-5 py-2 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                  aria-label="Job keyword"
                />
                <div className="border-l border-gray-300 dark:border-gray-500 h-6"></div>
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="الموقع..."
                  className="w-1/2 px-5 py-2 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                  aria-label="Job location"
                />
                <button type="submit" className="p-2 mr-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-opacity" aria-label="Search jobs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </form>
            ) : (
              !isAuthPage && (
                <nav className="flex items-center space-x-2">
                  {navLinks.map(link => (
                    <a 
                      key={link.href} 
                      href={link.href} 
                      className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${activeSection === link.href ? 'gradient-text font-bold' : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white'}`}
                    >
                      {link.text}
                    </a>
                  ))}
                </nav>
              )
            )}
          </div>

          <div className="flex items-center flex-shrink-0 gap-x-4">
            {!isHomePage && (
                <a href="#/" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-300" aria-label="العودة إلى الرئيسية">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </a>
            )}
             <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                {currentTheme === 'light' ? (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                )}
            </button>
            <div className="hidden lg:flex items-center space-x-4">
                {isLoggedIn || isAdmin ? (
                  <>
                    {isAdmin ? (
                        <a href="#/admin" className={`px-5 py-2 rounded-full transition duration-300 ${activeSection.startsWith('#/admin') ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600' : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700'}`}>لوحة التحكم</a>
                    ) : (
                        <a href="#/profile" className={`px-5 py-2 rounded-full transition duration-300 ${activeSection === '#/profile' ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600' : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700'}`}>الملف الشخصي</a>
                    )}
                    <button onClick={handleLogout} className="px-5 py-2 text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full transition-transform transform hover:scale-105 duration-300">تسجيل الخروج</button>
                  </>
                ) : (
                  <>
                    <a href="#/login" className={`px-5 py-2 rounded-full transition duration-300 ${activeSection === '#/login' ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600' : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700'}`}>تسجيل الدخول</a>
                    <a href="#/signup" className={`px-5 py-2 text-white rounded-full transition-transform transform hover:scale-105 duration-300 ${activeSection === '#/signup' ? 'bg-gradient-to-r from-indigo-700 to-purple-800' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`}>إنشاء حساب</a>
                  </>
                )}
            </div>
             <div className="lg:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 dark:text-gray-200 focus:outline-none p-2" aria-label="Toggle menu">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                  </svg>
                </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* --- Mobile Menu --- */}
      <div className={`
          lg:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg 
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}
      `}>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-2">
              {!isAuthPage && navLinks.map(link => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className={`p-3 rounded-md text-center ${activeSection === link.href ? 'gradient-text font-bold bg-indigo-50 dark:bg-gray-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                >
                  {link.text}
                </a>
              ))}
              <hr className="my-2 border-gray-200 dark:border-gray-700"/>
              {isLoggedIn || isAdmin ? (
                <div className="flex flex-col space-y-2 pt-2">
                    {isAdmin ? (
                        <a href="#/admin" className={`text-center w-full px-5 py-3 rounded-full transition duration-300 ${activeSection.startsWith('#/admin') ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600' : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700'}`}>لوحة التحكم</a>
                    ) : (
                        <a href="#/profile" className={`text-center w-full px-5 py-3 rounded-full transition duration-300 ${activeSection === '#/profile' ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600' : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700'}`}>الملف الشخصي</a>
                    )}
                   <button onClick={handleLogout} className="text-center w-full px-5 py-3 text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full transition duration-300">تسجيل الخروج</button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <a href="#/login" className={`text-center w-full px-5 py-3 rounded-full transition duration-300 ${activeSection === '#/login' ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600' : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700'}`}>تسجيل الدخول</a>
                  <a href="#/signup" className={`text-center w-full px-5 py-3 text-white rounded-full transition-transform transform hover:scale-105 duration-300 ${activeSection === '#/signup' ? 'bg-gradient-to-r from-indigo-700 to-purple-800' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`}>إنشاء حساب</a>
                </div>
              )}
            </nav>
          </div>
      </div>
    </header>
  );
};

export default Header;
