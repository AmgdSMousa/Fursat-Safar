import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center pt-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/10 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="container mx-auto px-6 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-4">
          <span className="gradient-text">فرصة سفر</span>: بوابتك لوظيفة أحلامك في الخارج
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          نحن نربط الكفاءات المصرية بأفضل الشركات العالمية ونوفر لك فرصة بناء مستقبل مهني واعد خارج مصر.
        </p>
        <a href="#/jobs" className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full transition-transform transform hover:scale-105 duration-300 shadow-lg shadow-indigo-500/30">
          ابحث عن وظيفة
        </a>
      </div>
    </section>
  );
};

export default Hero;
