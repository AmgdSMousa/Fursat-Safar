import React, { useState, useEffect } from 'react';

const ContactInfoItem: React.FC<{ icon: React.ReactNode; title: string; value: string }> = ({ icon, title, value }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-gray-900 dark:text-white">{title}</h4>
            <p className="text-gray-600 dark:text-gray-400">{value}</p>
        </div>
    </div>
);


const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (name || email || subject || message) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [name, email, subject, message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log({ name, email, subject, message });
    setFeedback('شكراً لتواصلك! سنرد عليك قريباً.');
    // Clear form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    // Hide feedback message after a few seconds
    setTimeout(() => setFeedback(''), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">تواصل معنا</h2>
          <h3 className="text-4xl font-bold text-gray-900 dark:text-white max-w-2xl mx-auto">هل تبحث عن فرصة؟ نحن هنا للمساعدة</h3>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2 bg-gray-50 dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit}>
              {feedback && (
                <div className="mb-4 p-3 text-center bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700 rounded-lg">
                  {feedback}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input type="text" placeholder="الاسم" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition dark:placeholder-gray-400" />
                <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition dark:placeholder-gray-400" />
              </div>
              <div className="mb-6">
                <input type="text" placeholder="الموضوع" value={subject} onChange={e => setSubject(e.target.value)} required className="w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition dark:placeholder-gray-400" />
              </div>
              <div className="mb-6">
                <textarea placeholder="رسالتك" rows={5} value={message} onChange={e => setMessage(e.target.value)} required className="w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition dark:placeholder-gray-400"></textarea>
              </div>
              <button type="submit" className="w-full px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-md transition-transform transform hover:scale-105 duration-300">
                أرسل الآن
              </button>
            </form>
          </div>
          <div className="lg:w-1/2 space-y-8 mt-4 lg:mt-0">
            <ContactInfoItem 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                title="العنوان"
                value="46 Al Mesaha Street, Dokki, Giza EG, Giza, Egypt"
            />
            <ContactInfoItem 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                title="البريد الإلكتروني"
                value="info@fursatsafar.com"
            />
             <ContactInfoItem 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                title="الهاتف"
                value="+201010038006"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;