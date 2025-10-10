import React, { useState, useEffect } from 'react';
import { jobs, Job } from './jobsData';
import ErrorBoundary from './ErrorBoundary';

interface ApplyPageProps {
  jobId: number;
}

// --- Validation Constants ---
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ALLOWED_FILE_EXTENSIONS_STRING = '.pdf, .doc, .docx';

const ApplyPage: React.FC<ApplyPageProps> = ({ jobId }) => {
  const [job, setJob] = useState<Job | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [fileName, setFileName] = useState('لم يتم اختيار ملف');
  const [fileError, setFileError] = useState(''); // State for validation feedback

  useEffect(() => {
    const foundJob = jobs.find(j => j.id === jobId);
    if (foundJob) {
      setJob(foundJob);
    } else {
      // Redirect if job not found
      window.location.hash = '/jobs';
    }

    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFullName(user.fullName || '');
      setEmail(user.email || '');
    }
  }, [jobId]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (fullName || email || cvFile || coverLetter) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [fullName, email, cvFile, coverLetter]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Clear previous state on new file selection
    setFileError('');
    setCvFile(null);
    setFileName('لم يتم اختيار ملف');

    if (!file) {
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError('حجم الملف كبير جدًا. الحد الأقصى هو 5 ميغابايت.');
      e.target.value = ''; // Reset file input to allow re-selection
      return;
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError(`نوع الملف غير صالح. الأنواع المسموح بها: ${ALLOWED_FILE_EXTENSIONS_STRING}`);
      e.target.value = ''; // Reset file input
      return;
    }

    // If all checks pass, update the state
    setCvFile(file);
    setFileName(file.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!job || !cvFile || !fullName || !email) {
        alert("يرجى ملء جميع الحقول المطلوبة وتحميل سيرة ذاتية صالحة.");
        return;
    }
     if (fileError) {
        alert("يرجى تصحيح الخطأ في ملف السيرة الذاتية قبل الإرسال.");
        return;
    }
    
    const newApplication = {
        applicationId: Date.now(),
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        applicantName: fullName,
        applicantEmail: email,
        coverLetter: coverLetter,
        cvFileName: cvFile.name,
        appliedAt: new Date().toISOString(),
    };

    const existingApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    existingApplications.push(newApplication);
    localStorage.setItem('jobApplications', JSON.stringify(existingApplications));
    
    // Pass job info to confirmation page via localStorage
    localStorage.setItem('lastAppliedJob', JSON.stringify({ title: job.title, company: job.company }));

    // Navigate to confirmation
    window.location.hash = '/application-confirmation';
  };

  if (!job) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
            <p className="dark:text-gray-300">...جاري تحميل بيانات الوظيفة</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center pt-24 pb-12 px-4">
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/10 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      <ErrorBoundary>
        <div className="relative w-full max-w-lg p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-10">
          <div className="text-center">
            <p className="text-indigo-600 dark:text-indigo-400 font-semibold">التقديم لوظيفة</p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{job.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">{job.company}</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-2">الاسم الكامل</label>
                    <input id="fullname" name="fullname" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-right dark:placeholder-gray-400" placeholder="اسمك الكامل" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-2">البريد الإلكتروني</label>
                    <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-right dark:placeholder-gray-400" placeholder="your@email.com" />
                </div>
            </div>
            <div>
                 <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right">السيرة الذاتية (CV)</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">الحد الأقصى 5MB (PDF, DOC)</span>
                 </div>
                 <label htmlFor="cv-upload" className={`w-full flex items-center justify-center px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition ${fileError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-400 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    <span className="text-gray-600 dark:text-gray-300 truncate">{fileName}</span>
                 </label>
                 <input id="cv-upload" name="cv-upload" type="file" accept={ALLOWED_FILE_EXTENSIONS_STRING} onChange={handleFileChange} required className="hidden" />
                 {fileError && <p className="text-red-500 dark:text-red-400 text-sm mt-2 text-right">{fileError}</p>}
            </div>
             <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right mb-2">رسالة التغطية (اختياري)</label>
                <textarea id="coverLetter" name="coverLetter" rows={4} value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-right dark:placeholder-gray-400" placeholder="اكتب رسالة موجزة توضح فيها سبب اهتمامك بالوظيفة..."></textarea>
            </div>
            <div>
              <button type="submit" className="w-full mt-2 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-md transition-transform transform hover:scale-105 duration-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!!fileError || !cvFile}>إرسال الطلب</button>
            </div>
          </form>
           <p className="text-center text-sm text-gray-600 dark:text-gray-400">
             بالنقر على "إرسال الطلب"، فإنك توافق على{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              شروط الخدمة
            </a>.
          </p>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default ApplyPage;