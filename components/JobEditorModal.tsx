import React, { useState, useEffect } from 'react';
import { Job } from './jobsData';

interface JobEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (job: Omit<Job, 'id' | 'logo' | 'postedDate'> & { id?: number }) => void;
    jobToEdit: Job | null;
    isSaving: boolean;
}

const JobEditorModal: React.FC<JobEditorModalProps> = ({ isOpen, onClose, onSave, jobToEdit, isSaving }) => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('دوام كامل');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (jobToEdit) {
            setTitle(jobToEdit.title);
            setCompany(jobToEdit.company);
            setLocation(jobToEdit.location);
            setType(jobToEdit.type);
            setDescription(jobToEdit.description);
        } else {
            // Reset form for new job
            setTitle('');
            setCompany('');
            setLocation('');
            setType('دوام كامل');
            setDescription('');
        }
    }, [jobToEdit, isOpen]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            const hasUnsavedChanges = title || company || location || description;
            if (isOpen && hasUnsavedChanges && !isSaving) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isOpen, title, company, location, description, isSaving]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: jobToEdit?.id,
            title,
            company,
            location,
            type,
            description,
        });
    };

    if (!isOpen) return null;

    const inputClassName = "w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-right dark:placeholder-gray-400";

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {jobToEdit ? 'تعديل وظيفة' : 'إضافة وظيفة جديدة'}
                        </h2>
                        <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Close modal" disabled={isSaving}>
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-1">المسمى الوظيفي</label>
                            <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputClassName} />
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-1">الشركة</label>
                            <input id="company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} required className={inputClassName} />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-1">الموقع</label>
                            <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className={inputClassName} />
                        </div>
                         <div>
                            <label htmlFor="modal-job-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-1">نوع الوظيفة</label>
                            <select id="modal-job-type" value={type} onChange={(e) => setType(e.target.value)} className={inputClassName}>
                                <option value="دوام كامل">دوام كامل</option>
                                <option value="دوام جزئي">دوام جزئي</option>
                                <option value="عن بعد">عن بعد</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-1">الوصف</label>
                            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={5} className={inputClassName}></textarea>
                        </div>
                        <div className="flex justify-end gap-4 pt-4">
                            <button type="button" onClick={onClose} disabled={isSaving} className="px-6 py-2 font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-md transition duration-300 disabled:opacity-50">
                                إلغاء
                            </button>
                            <button type="submit" disabled={isSaving} className="px-6 py-2 font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-md transition duration-300 flex items-center justify-center w-36 disabled:opacity-75">
                                {isSaving ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    jobToEdit ? 'حفظ التعديلات' : 'إضافة الوظيفة'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobEditorModal;
