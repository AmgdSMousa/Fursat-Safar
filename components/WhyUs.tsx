import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-indigo-500/20 transition-shadow duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center h-full">
    <div className="relative group mb-4">
        <div className="mb-4 w-16 h-16 bg-indigo-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            {icon}
        </div>
        <div className="absolute bottom-full mb-2 w-max px-3 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-black rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none left-1/2 -translate-x-1/2">
            {description}
        </div>
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const WhyUs: React.FC = () => {
  const features = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: "الخبرة والموثوقية",
      description: "سنوات من الخبرة في مجال التوظيف الدولي تضمن لك الحصول على أفضل الفرص الموثوقة."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3" /></svg>,
      title: "شبكة علاقات واسعة",
      description: "علاقات قوية مع مئات الشركات الرائدة في مختلف أنحاء العالم، مما يفتح أمامك أبوابًا متعددة."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: "دعم شامل ومستمر",
      description: "نحن معك في كل خطوة، من تجهيز ملفك الشخصي وحتى إتمام إجراءات السفر وبدء العمل."
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>,
        title: "شفافية ومصداقية",
        description: "نعمل بشفافية تامة في جميع مراحل عملية التوظيف، بدون أي رسوم خفية أو وعود غير واقعية."
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">لماذا نحن؟</h2>
          <h3 className="text-4xl font-bold text-gray-900 dark:text-white max-w-2xl mx-auto">اختيارك الأمثل لمستقبل مهني أفضل</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-3xl mx-auto">
            نحن لا نقدم وعودًا فحسب، بل نقدم نتائج حقيقية. اكتشف لماذا يثق بنا مئات المرشحين لتحقيق أهدافهم المهنية.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;