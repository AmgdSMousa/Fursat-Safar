import React, { useState, useEffect } from 'react';
import { jobs as initialJobs, Job } from '../jobsData';

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: number | string;
    colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, colorClass }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4" style={{ borderColor: colorClass }}>
        <div className="flex items-center">
            <div className="p-3 rounded-full bg-opacity-20" style={{ backgroundColor: `${colorClass}20`, color: colorClass }}>
                {icon}
            </div>
            <div className="mr-4">
                <p className="text-gray-500 dark:text-gray-400 font-semibold">{label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    </div>
);

const AdminDashboard: React.FC = () => {
    const [totalJobs, setTotalJobs] = useState(0);
    const [totalApplications, setTotalApplications] = useState(0);

    useEffect(() => {
        // Calculate total jobs
        const storedJobs = localStorage.getItem('customJobs');
        const customJobs: Job[] = storedJobs ? JSON.parse(storedJobs) : [];
        setTotalJobs(initialJobs.length + customJobs.length);

        // Calculate total applications
        const storedApplications = localStorage.getItem('jobApplications');
        const applications = storedApplications ? JSON.parse(storedApplications) : [];
        setTotalApplications(applications.length);
    }, []);

    const stats = [
        {
            label: 'إجمالي الوظائف',
            value: totalJobs,
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            color: '#4F46E5', // Indigo
        },
        {
            label: 'طلبات التوظيف',
            value: totalApplications,
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
            color: '#10B981', // Emerald
        }
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">لوحة المعلومات</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map(stat => (
                    <StatCard 
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                        colorClass={stat.color}
                    />
                ))}
            </div>

             <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">مرحباً بك في لوحة التحكم</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    من هنا يمكنك إدارة محتوى موقع "فرصة سفر". استخدم الشريط الجانبي للتنقل بين إدارة الوظائف ومراجعة طلبات التوظيف.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;