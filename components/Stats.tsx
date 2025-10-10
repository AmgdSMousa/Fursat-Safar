import React, { useState, useEffect } from 'react';

interface StatItemProps {
    icon: React.ReactNode;
    endValue: number;
    label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, endValue, label }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = endValue / (duration / 16); 

        const counter = setInterval(() => {
            start += increment;
            if (start > endValue) {
                setCount(endValue);
                clearInterval(counter);
            } else {
                setCount(Math.ceil(start));
            }
        }, 16);

        return () => clearInterval(counter);
    }, [endValue]);

    return (
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
            <div className="mb-3 text-indigo-600 dark:text-indigo-400 mx-auto w-16 h-16 flex items-center justify-center">
                {icon}
            </div>
            <p className="text-5xl font-bold gradient-text">{count}+</p>
            <p className="text-gray-600 dark:text-gray-400 mt-2 font-semibold">{label}</p>
        </div>
    );
};


const Stats: React.FC = () => {
    const statsData = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.93L5.5 8m7 2H5m7 0a2 2 0 012 2v.286a1 1 0 01-1.707.707l-2.428-2.428A1 1 0 017 10h1" /></svg>,
            endValue: 350,
            label: "مرشح تم توظيفه"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            endValue: 800,
            label: "فرصة عمل متاحة"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M12 15v6m-6.414-8.586a2 2 0 112.828 2.828L12 18.071l-2.828-2.829a2 2 0 010-2.828z" /></svg>,
            endValue: 90,
            label: "شريك حول العالم"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
            endValue: 10,
            label: "سنوات من الخبرة"
        }
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-black/20">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statsData.map((stat, index) => (
                        <StatItem key={index} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;