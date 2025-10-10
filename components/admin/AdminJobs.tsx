import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { jobs as initialJobs, Job } from '../jobsData';
import JobEditorModal from '../JobEditorModal';

const genericCompanyLogo = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM3QzdBODQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik02IDIyVjRhMiAyIDAgMCAxIDItMmg4YTIgMiAwIDAgMSAyIDJ2MTgiLz48cGF0aCBkPSJNNiAxMkggNGEyIDIgMCAwIDAtMiAydjZhMiAyIDAgMCAwIDIgMmgyIi8+PHBhdGggZD0iTTE4IDloMmEyIDIgMCAwIDEgMiAydjZhMiAyIDAgMCAxLTIgMmgtMiIvPjxwYXRoIGQ9Ik0xMCA2aDQiLz48cGF0aCBkPSJNMTAgMTBoNCIvPjxwYXRoIGQ9Ik0xMCAxNGg0Ii8+PHBhdGggZD0iTTEwIDE4aDQiLz48L3N2Zz4=';

type SortDirection = 'ascending' | 'descending';
type SortKey = keyof Job | null;

const Spinner: React.FC = () => (
    <div className="flex justify-center items-center h-full">
        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const AdminJobs: React.FC = () => {
    const [allJobs, setAllJobs] = useState<Job[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobToEdit, setJobToEdit] = useState<Job | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'postedDate', direction: 'descending' });

    const showFeedback = (message: string, type: 'success' | 'error' = 'success') => {
        setFeedback({ message, type });
        setTimeout(() => setFeedback(null), 3000);
    };

    const loadJobs = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            const storedJobs = localStorage.getItem('customJobs');
            const customJobs: Job[] = storedJobs ? JSON.parse(storedJobs) : [];

            const storedDeletedIds = localStorage.getItem('deletedDefaultJobIds');
            const deletedIds: number[] = storedDeletedIds ? JSON.parse(storedDeletedIds) : [];
            const activeInitialJobs = initialJobs.filter(j => !deletedIds.includes(j.id));
            
            setAllJobs([...activeInitialJobs, ...customJobs]);
            setIsLoading(false);
        }, 500);
    }, []);

    useEffect(() => {
        loadJobs();
    }, [loadJobs]);

    const handleAddNewJob = () => {
        setJobToEdit(null);
        setIsModalOpen(true);
    };

    const handleEditJob = (job: Job) => {
        setJobToEdit(job);
        setIsModalOpen(true);
    };

    const handleDeleteJob = (jobId: number) => {
        if (window.confirm('هل أنت متأكد من أنك تريد حذف هذه الوظيفة؟')) {
            const storedDeletedIds = localStorage.getItem('deletedDefaultJobIds');
            let deletedIds: number[] = storedDeletedIds ? JSON.parse(storedDeletedIds) : [];
            const storedCustomJobs = localStorage.getItem('customJobs');
            let customJobs: Job[] = storedCustomJobs ? JSON.parse(storedCustomJobs) : [];
            
            const isDefaultJob = initialJobs.some(j => j.id === jobId);

            if (isDefaultJob) {
                if (!deletedIds.includes(jobId)) deletedIds.push(jobId);
                localStorage.setItem('deletedDefaultJobIds', JSON.stringify(deletedIds));
            } else {
                customJobs = customJobs.filter(j => j.id !== jobId);
                localStorage.setItem('customJobs', JSON.stringify(customJobs));
            }
            loadJobs();
            showFeedback('تم حذف الوظيفة بنجاح.');
        }
    };
    
    const handleSaveJob = (jobData: Omit<Job, 'id' | 'logo' | 'postedDate'> & { id?: number }) => {
        setIsSaving(true);
        setTimeout(() => {
            const storedCustomJobs = localStorage.getItem('customJobs');
            let customJobs: Job[] = storedCustomJobs ? JSON.parse(storedCustomJobs) : [];
            const isEditing = !!jobData.id;

            if (isEditing) {
                const isDefaultJob = !customJobs.some(j => j.id === jobData.id);
                if (isDefaultJob) {
                     const originalJob = allJobs.find(j => j.id === jobData.id);
                     if (originalJob) {
                        const newCustomJob = { ...originalJob, ...jobData, id: Date.now() }; // Create a new job
                        customJobs.push(newCustomJob);
                        
                        const storedDeletedIds = localStorage.getItem('deletedDefaultJobIds');
                        let deletedIds: number[] = storedDeletedIds ? JSON.parse(storedDeletedIds) : [];
                        if (!deletedIds.includes(jobData.id!)) deletedIds.push(jobData.id!);
                        localStorage.setItem('deletedDefaultJobIds', JSON.stringify(deletedIds));
                     }
                } else { // It's a custom job
                    const jobIndex = customJobs.findIndex(j => j.id === jobData.id);
                    if (jobIndex !== -1) customJobs[jobIndex] = { ...customJobs[jobIndex], ...jobData };
                }
            } else { // Adding new job
                const newJob: Job = { ...jobData, id: Date.now(), logo: genericCompanyLogo, postedDate: new Date().toISOString() };
                customJobs.push(newJob);
            }
            
            localStorage.setItem('customJobs', JSON.stringify(customJobs));
            loadJobs();
            setIsModalOpen(false);
            setIsSaving(false);
            showFeedback(isEditing ? 'تم تحديث الوظيفة بنجاح.' : 'تم إضافة الوظيفة بنجاح.');
        }, 700);
    };
    
    const requestSort = (key: SortKey) => {
        let direction: SortDirection = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedAndFilteredJobs = useMemo(() => {
        let sortableItems = [...allJobs];

        if (searchTerm) {
            sortableItems = sortableItems.filter(job => 
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.location.toLowerCase().includes(searchTerm.toLowerCase())
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
    }, [allJobs, searchTerm, sortConfig]);
    
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('ar-EG');
    const SortArrow = ({ direction }: { direction: SortDirection }) => direction === 'ascending' ? '▲' : '▼';

    return (
        <div className="relative">
            {feedback && (
                <div className={`fixed top-24 right-8 p-4 rounded-lg shadow-lg text-white ${feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'} transition-transform transform animate-bounce z-50`}>
                    {feedback.message}
                </div>
            )}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الوظائف</h1>
                <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
                    <input 
                        type="text"
                        placeholder="ابحث عن وظيفة..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 bg-white dark:bg-gray-700 p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button onClick={handleAddNewJob} className="px-5 py-2 font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-md transition duration-300 whitespace-nowrap">
                        إضافة وظيفة
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
                {isLoading ? (
                     <div className="text-center py-24"><Spinner /></div>
                ) : (
                    <table className="w-full text-right">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                {[{key: 'title', label: 'المسمى الوظيفي'}, {key: 'company', label: 'الشركة'}, {key: 'location', label: 'الموقع'}, {key: 'postedDate', label: 'تاريخ النشر'}].map(header => (
                                    <th key={header.key} className="p-4 cursor-pointer" onClick={() => requestSort(header.key as keyof Job)}>
                                        {header.label} {sortConfig.key === header.key && <SortArrow direction={sortConfig.direction} />}
                                    </th>
                                ))}
                                <th className="p-4">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAndFilteredJobs.length > 0 ? sortedAndFilteredJobs.map(job => (
                                <tr key={job.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-4 font-semibold">{job.title}</td>
                                    <td className="p-4">{job.company}</td>
                                    <td className="p-4">{job.location}</td>
                                    <td className="p-4">{formatDate(job.postedDate)}</td>
                                    <td className="p-4 flex gap-2">
                                        <button onClick={() => handleEditJob(job)} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">تعديل</button>
                                        <button onClick={() => handleDeleteJob(job.id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">حذف</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={5} className="text-center p-8 text-gray-500 dark:text-gray-400">لا توجد وظائف تطابق بحثك.</td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            <JobEditorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveJob} jobToEdit={jobToEdit} isSaving={isSaving} />
        </div>
    );
};

export default AdminJobs;
