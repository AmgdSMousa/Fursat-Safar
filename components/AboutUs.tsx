import React from 'react';

const CheckIcon: React.FC = () => (
    <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

const AboutUs: React.FC = () => {
  const points = [
    "فرص عمل موثوقة في الخارج.",
    "متابعة ودعم طوال عملية التوظيف.",
    "تواصل مباشر مع كبرى الشركات.",
    "استشارات مهنية متخصصة.",
  ];

  // Self-contained SVG placeholder to avoid external network requests
  const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJwbGFjZWhvbGRlci1ncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNGY0NmU1Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOTMzM2VhIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSIzOTUiIGZpbGw9InVybCgjcGxhY2Vob2xkZXItZ3JhZCkiIGZpbGwtb3BhY2l0eT0iMC4wOCIvPjxwYXRoIGQ9Ik0gMCAzMDAgTCAyMDAgMTUwIEwgMzUwIDI1MCBMIDUwMCAyMDAgTCA2MDAgMjQwIFYgNDAwIEggMCBaIiBmaWxsPSJ1cmwoI3BsYWNlaG9sZGVyLWdyYWQpIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjxjaXJjbGUgY3g9IjQ1MCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9InVybCgjcGxhY2Vob2xkZXItZ3JhZCkiIGZpbGwtb3BhY2l0eT0iMC4zIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJDYWlybywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIzMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM0ZjQ2ZTUiIGZpbGwtb3BhY2l0eT0iMC41Ij5Gb3JzYSBTZnI8L3RleHQ+PC9zdmc+';

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4 gradient-text">من نحن</h2>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">شريكك لتحقيق طموحك المهني العالمي</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              شركة فرصة سفر هي شركة رائدة متخصصة في توظيف الكفاءات المصرية في كبرى الشركات خارج مصر. نحن نؤمن بأن لكل شخص موهوب الحق في الحصول على فرصة عمل ترتقي بمسيرته المهنية.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {points.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg blur-xl transform -rotate-3 opacity-30 dark:opacity-40"></div>
                <img 
                    src={placeholderImage} 
                    alt="About Us" 
                    className="rounded-lg shadow-2xl relative z-10"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;