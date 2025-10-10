import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import AdminJobs from './AdminJobs';
import AdminApplications from './AdminApplications';
import AdminUsers from './AdminUsers';

type AdminView = 'dashboard' | 'jobs' | 'applications' | 'users';

const AdminPage: React.FC = () => {
    const [activeView, setActiveView] = useState<AdminView>('dashboard');

    const handleLogout = () => {
        localStorage.removeItem('userProfile');
        localStorage.removeItem('isAdmin');
        window.location.hash = '/';
    };

    const renderView = () => {
        switch (activeView) {
            case 'jobs':
                return <AdminJobs />;
            case 'applications':
                return <AdminApplications />;
            case 'users':
                return <AdminUsers />;
            case 'dashboard':
            default:
                return <AdminDashboard />;
        }
    };
    
    // Fix: Changed `JSX.Element` to `React.ReactElement` to resolve the "Cannot find namespace 'JSX'" error.
    const navItems: { id: AdminView; label: string; icon: React.ReactElement }[] = [
        { id: 'dashboard', label: 'لوحة المعلومات', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
        { id: 'jobs', label: 'إدارة الوظائف', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
        { id: 'applications', label: 'طلبات التوظيف', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { id: 'users', label: 'إدارة المستخدمين', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.978 5.978 0 0112 13a5.979 5.979 0 013 1" /></svg> },
    ];
    
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex text-gray-800 dark:text-gray-200" dir="rtl">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex-shrink-0 flex flex-col">
                <div className="h-20 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
                     <a href="#/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold gradient-text">لوحة التحكم</span>
                    </a>
                </div>
                <nav className="flex-grow p-4">
                    <ul>
                        {navItems.map(item => (
                             <li key={item.id}>
                                <button
                                    onClick={() => setActiveView(item.id)}
                                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-right transition-colors duration-200 ${
                                        activeView === item.id 
                                            ? 'bg-indigo-600 text-white' 
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-right transition-colors duration-200 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>
            
            {/* Main Content */}
            <main className="flex-grow p-8 overflow-auto">
                {renderView()}
            </main>
        </div>
    );
};

export default AdminPage;