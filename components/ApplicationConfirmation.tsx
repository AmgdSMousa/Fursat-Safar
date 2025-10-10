import React, { useState, useEffect } from 'react';

const ApplicationConfirmation: React.FC = () => {
    const [lastJob, setLastJob] = useState<{title: string, company: string} | null>(null);

    useEffect(() => {
        const jobInfo = localStorage.getItem('lastAppliedJob');
        if (jobInfo) {
            setLastJob(JSON.parse(jobInfo));
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center pt-24 pb-12 px-4 text-center">
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/10 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            
            <div className="relative w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-10">
                <div className="w-24 h-24 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold gradient-text mb-2">تم إرسال طلبك بنجاح!</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    شكراً لاهتمامك بالانضمام إلى فريقنا. سنقوم بمراجعة طلبك وسنتواصل معك قريباً.
                </p>

                {lastJob && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-lg text-right mb-8">
                        <h3 className="font-bold text-gray-800 dark:text-white">تفاصيل الوظيفة</h3>
                        <p className="text-gray-600 dark:text-gray-300">{lastJob.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{lastJob.company}</p>
                    </div>
                )}

                <a 
                    href="#/jobs" 
                    className="w-full px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-md transition-transform transform hover:scale-105 duration-300 inline-block"
                >
                    العودة إلى الوظائف
                </a>
            </div>
        </div>
    );
};

export default ApplicationConfirmation;
