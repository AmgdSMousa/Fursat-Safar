import React, { useState, useEffect, useMemo } from 'react';

interface Application {
    applicationId: number;
    jobId: number;
    jobTitle: string;
    company: string;
    applicantName: string;
    applicantEmail: string;
    coverLetter: string;
    cvFileName: string;
    appliedAt: string;
}

type SortDirection = 'ascending' | 'descending';
type SortKey = keyof Application | null;

const Spinner: React.FC = () => (
    <div className="flex justify-center items-center h-full">
        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);


const AdminApplications: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'appliedAt', direction: 'descending' });


    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const storedApps = localStorage.getItem('jobApplications');
            const allApps: Application[] = storedApps ? JSON.parse(storedApps) : [];
            setApplications(allApps);
            setIsLoading(false);
        }, 500);
    }, []);

    const requestSort = (key: SortKey) => {
        let direction: SortDirection = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedAndFilteredApps = useMemo(() => {
        let sortableItems = [...applications];

        if (searchTerm) {
            sortableItems = sortableItems.filter(app => 
                app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.applicantEmail.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key!];
                const bValue = b[sortConfig.key!];
                if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [applications, searchTerm, sortConfig]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ar-EG', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };
    
    const SortArrow = ({ direction }: { direction: SortDirection }) => direction === 'ascending' ? '▲' : '▼';

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">طلبات التوظيف</h1>
                <input 
                    type="text"
                    placeholder="ابحث عن طلب..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 bg-white dark:bg-gray-700 p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
                 {isLoading ? (
                     <div className="text-center py-24"><Spinner /></div>
                ) : (
                    <table className="w-full text-right">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                {[{key: 'jobTitle', label: 'المسمى الوظيفي'}, {key: 'applicantName', label: 'اسم المتقدم'}, {key: 'applicantEmail', label: 'البريد الإلكتروني'}, {key: 'appliedAt', label: 'تاريخ التقديم'}].map(header => (
                                    <th key={header.key} className="p-4 cursor-pointer" onClick={() => requestSort(header.key as keyof Application)}>
                                        {header.label} {sortConfig.key === header.key && <SortArrow direction={sortConfig.direction} />}
                                    </th>
                                ))}
                                <th className="p-4">السيرة الذاتية</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAndFilteredApps.length > 0 ? sortedAndFilteredApps.map(app => (
                                <tr key={app.applicationId} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-4 font-semibold">{app.jobTitle} <span className="text-sm text-gray-500">({app.company})</span></td>
                                    <td className="p-4">{app.applicantName}</td>
                                    <td className="p-4">{app.applicantEmail}</td>
                                    <td className="p-4">{formatDate(app.appliedAt)}</td>
                                    <td className="p-4 text-sm">{app.cvFileName}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan={5} className="text-center p-8 text-gray-500 dark:text-gray-400">
                                    {searchTerm ? 'لا توجد طلبات تطابق بحثك.' : 'لا توجد طلبات توظيف حتى الآن.'}
                                </td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminApplications;
