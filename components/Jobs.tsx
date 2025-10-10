import React, { useState, useEffect, useCallback } from 'react';
import { jobs as initialJobs, Job } from './jobsData';
import JobCard from './JobCard';
import ErrorBoundary from './ErrorBoundary';

const Jobs: React.FC = () => {
    const [allJobs, setAllJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('all');
    const [datePosted, setDatePosted] = useState('all');

    // Load jobs from localStorage on initial render
    useEffect(() => {
        try {
            const storedJobs = localStorage.getItem('customJobs');
            const customJobs: Job[] = storedJobs ? JSON.parse(storedJobs) : [];

            const storedDeletedIds = localStorage.getItem('deletedDefaultJobIds');
            const deletedIds: number[] = storedDeletedIds ? JSON.parse(storedDeletedIds) : [];
            const activeInitialJobs = initialJobs.filter(j => !deletedIds.includes(j.id));
            
            const combinedJobs = [...activeInitialJobs];
            
            customJobs.forEach(customJob => {
                if (!combinedJobs.some(j => j.id === customJob.id)) {
                    combinedJobs.push(customJob);
                }
            });

            setAllJobs(combinedJobs);
        } catch (error) {
            console.error("Failed to load jobs from localStorage", error);
            setAllJobs(initialJobs); // Fallback to initial jobs
        }
    }, []);

    // Effect to update filtered jobs whenever allJobs or filters change
    const performSearch = useCallback(() => {
        let results = [...allJobs];

        if (keyword) {
            const lowercasedKeyword = keyword.toLowerCase();
            results = results.filter(job =>
                job.title.toLowerCase().includes(lowercasedKeyword) ||
                job.company.toLowerCase().includes(lowercasedKeyword) ||
                job.description.toLowerCase().includes(lowercasedKeyword)
            );
        }

        if (location) {
            const lowercasedLocation = location.toLowerCase();
            results = results.filter(job =>
                job.location.toLowerCase().includes(lowercasedLocation)
            );
        }

        if (jobType !== 'all') {
            results = results.filter(job => job.type === jobType);
        }

        if (datePosted !== 'all') {
            const now = new Date();
            const cutoffDate = new Date();
            switch (datePosted) {
                case '24h': cutoffDate.setDate(now.getDate() - 1); break;
                case '7d': cutoffDate.setDate(now.getDate() - 7); break;
                case '30d': cutoffDate.setDate(now.getDate() - 30); break;
            }
            results = results.filter(job => new Date(job.postedDate) >= cutoffDate);
        }
        
        results.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());

        setFilteredJobs(results);
    }, [allJobs, keyword, location, jobType, datePosted]);

    useEffect(() => {
        const hash = window.location.hash;
        const searchPart = hash.split('?')[1];
        if (searchPart) {
            const params = new URLSearchParams(searchPart);
            setKeyword(params.get('keyword') || '');
            setLocation(params.get('location') || '');
        }
    }, []);

    useEffect(() => {
        performSearch();
    }, [performSearch]);

    const handleReset = () => {
        setKeyword('');
        setLocation('');
        setJobType('all');
        setDatePosted('all');
    };

    const selectClassName = "w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition dark:placeholder-gray-400";

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/10 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <ErrorBoundary>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">ابحث عن وظيفتك التالية</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            تصفح مئات الفرص الوظيفية المتاحة في أفضل الشركات حول العالم.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto mb-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <form onSubmit={(e) => { e.preventDefault(); performSearch(); }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
                                <div>
                                    <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-2">الكلمات المفتاحية</label>
                                    <input id="keyword" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="الكلمات المفتاحية (مثل: مطور ويب)" className={selectClassName} />
                                </div>
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-2">الموقع</label>
                                    <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="الموقع (مثل: دبي)" className={selectClassName} />
                                </div>
                                <div>
                                    <label htmlFor="job-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-2">نوع الوظيفة</label>
                                    <select id="job-type" value={jobType} onChange={(e) => setJobType(e.target.value)} className={selectClassName}>
                                        <option value="all">كل أنواع الوظائف</option>
                                        <option value="دوام كامل">دوام كامل</option>
                                        <option value="دوام جزئي">دوام جزئي</option>
                                        <option value="عن بعد">عن بعد</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="date-posted" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-2">تاريخ النشر</label>
                                    <select id="date-posted" value={datePosted} onChange={(e) => setDatePosted(e.target.value)} className={selectClassName}>
                                        <option value="all">كل الأوقات</option>
                                        <option value="24h">آخر 24 ساعة</option>
                                        <option value="7d">آخر 7 أيام</option>
                                        <option value="30d">آخر 30 يومًا</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                 <button type="submit" className="w-full sm:w-auto flex-grow px-6 py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-md transition-transform transform hover:scale-105 duration-300">بحث</button>
                                 <button type="button" onClick={handleReset} className="w-full sm:w-auto flex-grow px-6 py-3 font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition duration-300">إعادة تعيين</button>
                            </div>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map(job => 
                                <JobCard 
                                    key={job.id} 
                                    job={job}
                                />
                            )
                        ) : (
                            <div className="md:col-span-2 lg:col-span-3 text-center py-16">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">لا توجد وظائف تطابق بحثك</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">حاول استخدام كلمات مفتاحية مختلفة أو توسيع نطاق بحثك.</p>
                            </div>
                        )}
                    </div>
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default Jobs;
