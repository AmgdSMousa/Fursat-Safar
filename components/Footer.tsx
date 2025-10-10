import React from 'react';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
    {children}
  </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 dark:bg-black">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">فرصة سفر</h3>
            <p className="text-gray-400">
              بوابتك الأولى للحصول على وظيفة أحلامك في الخارج. نربط الكفاءات المصرية بأفضل الشركات العالمية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><a href="#/" className="hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#/jobs" className="hover:text-white transition-colors">الوظائف</a></li>
              <li><a href="#/#about" className="hover:text-white transition-colors">من نحن</a></li>
              <li><a href="#/#services" className="hover:text-white transition-colors">خدماتنا</a></li>
            </ul>
          </div>

          {/* More Links */}
          <div>
             <h3 className="text-xl font-bold text-white mb-4">المزيد</h3>
             <ul className="space-y-2">
              <li><a href="#/#why-us" className="hover:text-white transition-colors">لماذا نحن</a></li>
              <li><a href="#/#contact" className="hover:text-white transition-colors">تواصل معنا</a></li>
              <li><a href="#/login" className="hover:text-white transition-colors">تسجيل الدخول</a></li>
             </ul>
          </div>
          
          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">تابعنا</h3>
            <div className="flex space-x-8 rtl:space-x-reverse">
               <SocialIcon href="https://www.facebook.com/fursatsafar">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com/fursatsafar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zM12 0C8.74 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947C21.305 2.69 18.882.273 14.948.072 13.667.014 13.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324A6.162 6.162 0 0012 5.838zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" clipRule="evenodd" /></svg>
              </SocialIcon>
              <SocialIcon href="https://linkedin.com/in/fursatsafar1215">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.345 0H4.655C2.085 0 0 2.085 0 4.655v14.69C0 21.915 2.085 24 4.655 24h14.69C21.915 24 24 21.915 24 19.345V4.655C24 2.085 21.915 0 19.345 0zm-13.31 19.345H2.965v-9.47h3.07v9.47zm-1.535-10.82c-1.005 0-1.815-.81-1.815-1.815s.81-1.815 1.815-1.815 1.815.81 1.815 1.815-.81 1.815-1.815 1.815zm14.845 10.82h-3.07v-4.68c0-1.115-.02-2.55-1.555-2.55s-1.795 1.215-1.795 2.47v4.76h-3.07v-9.47h2.95v1.35h.04c.41-  .78 1.415-1.6 2.91-1.6 3.115 0 3.69 2.05 3.69 4.71v5.51z"></path></svg>
              </SocialIcon>
            </div>
            <p className="mt-4 text-gray-400">info@fursatsafar.com</p>
            <p className="text-gray-400">+201010038006</p>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} فرصة سفر. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
