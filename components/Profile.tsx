import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface UserProfile {
  fullName: string;
  email: string;
}

interface Application {
    applicationId: number;
    jobId: number;
    jobTitle: string;
    company: string;
    applicantEmail: string;
    appliedAt: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      const storedApps = localStorage.getItem('jobApplications');
      const allApps: Application[] = storedApps ? JSON.parse(storedApps) : [];
      const userApps = allApps
        .filter(app => app.applicantEmail === parsedUser.email)
        .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
      
      setApplications(userApps);
    } else {
      // Not logged in, redirect to login page
      window.location.hash = '/login';
    }
  }, []);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
            <p className="dark:text-gray-300">...جاري التحميل</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/10 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/10 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        <div className="container mx-auto px-6 relative z-10">
            <ErrorBoundary>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">ملفي الشخصي</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">مرحباً, {user.fullName}!</p>
                    </div>

                    {/* User Info Section */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">معلوماتي</h2>
                        <div className="space-y-3">
                           <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">الاسم الكامل</p>
                                <p className="text-lg text-gray-800 dark:text-gray-200">{user.fullName}</p>
                           </div>
                           <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">البريد الإلكتروني</p>
                                <p className="text-lg text-gray-800 dark:text-gray-200">{user.email}</p>
                           </div>
                        </div>
                    </div>

                    {/* Applications Section */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">طلباتي الوظيفية</h2>
                        {applications.length > 0 ? (
                            <div className="space-y-4">
                                {applications.map(app => (
                                    <div key={app.applicationId} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <div>
                                            <a href={`#/apply/${app.jobId}`} className="font-bold text-indigo-600 hover:underline dark:text-indigo-400">{app.jobTitle}</a>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{app.company}</p>
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 text-left">
                                            <p>تاريخ التقديم:</p>
                                            <p>{formatDate(app.appliedAt)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-4">لم تقم بالتقديم على أي وظائف بعد.</p>
                        )}
                    </div>
                </div>
            </ErrorBoundary>
        </div>
    </div>
  );
};

export default Profile;
