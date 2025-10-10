import React from 'react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl dark:hover:shadow-indigo-500/20 transition-shadow duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 text-center">
    <div className="relative group mb-4 inline-block">
        <div className="p-4 bg-indigo-100 dark:bg-gray-700 rounded-full">
            <div className="w-10 h-10 text-indigo-600 dark:text-indigo-400">
                {icon}
            </div>
        </div>
        <div className="absolute bottom-full mb-2 w-48 px-3 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-black rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none left-1/2 -translate-x-1/2">
            {description}
        </div>
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const Services: React.FC = () => {
  const servicesData = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      title: "ربط مباشر بالشركات",
      description: "نوفر لك وصولاً مباشرًا إلى شبكة واسعة من الشركات العالمية المرموقة التي تبحث عن مواهب مثلك."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
      title: "تجهيز السيرة الذاتية",
      description: "نساعدك في إعداد سيرة ذاتية احترافية تتوافق مع المعايير الدولية وتبرز مهاراتك وخبراتك."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
      title: "استشارات مهنية",
      description: "يقدم خبراؤنا استشارات مخصصة لمساعدتك في تحديد مسارك المهني واتخاذ القرارات الصحيحة."
    },
     {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: "دعم لوجستي",
      description: "نقدم المساعدة في إجراءات التأشيرة وترتيبات السفر لضمان انتقال سلس إلى وظيفتك الجديدة."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-black/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">خدماتنا</h2>
          <h3 className="text-4xl font-bold text-gray-900 dark:text-white max-w-2xl mx-auto">نحن نمهد لك الطريق نحو العالمية</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-3xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات المصممة خصيصًا لدعمك في كل خطوة من رحلتك المهنية للحصول على أفضل فرصة عمل في الخارج.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;