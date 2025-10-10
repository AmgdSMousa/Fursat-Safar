import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { User, initialUsers } from '../usersData';

type SortDirection = 'ascending' | 'descending';
type SortKey = keyof User | null;

const Spinner: React.FC = () => (
    <div className="flex justify-center items-center h-full">
        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const SmallSpinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


const AdminUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingEmail, setDeletingEmail] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'registeredAt', direction: 'descending' });

    const showFeedback = (message: string, type: 'success' | 'error' = 'success') => {
        setFeedback({ message, type });
        setTimeout(() => setFeedback(null), 3000);
    };

    const loadUsers = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            let storedUsers: User[] = JSON.parse(localStorage.getItem('users') || 'null');
            if (!storedUsers || storedUsers.length === 0) {
                storedUsers = initialUsers;
                localStorage.setItem('users', JSON.stringify(storedUsers));
            }
            setUsers(storedUsers);
            setIsLoading(false);
        }, 500);
    }, []);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);
    
    const handleDeleteUser = (emailToDelete: string) => {
        const currentUserProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        if (currentUserProfile.email === emailToDelete) {
            showFeedback('لا يمكنك حذف حسابك الخاص.', 'error');
            return;
        }
        if (window.confirm(`هل أنت متأكد من أنك تريد حذف المستخدم ${emailToDelete}؟`)) {
            setDeletingEmail(emailToDelete);
            setTimeout(() => {
                const updatedUsers = users.filter(user => user.email !== emailToDelete);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                setUsers(updatedUsers);
                setDeletingEmail(null);
                showFeedback('تم حذف المستخدم بنجاح.');
            }, 700);
        }
    };
    
    const requestSort = (key: SortKey) => {
        let direction: SortDirection = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedAndFilteredUsers = useMemo(() => {
        let sortableItems = [...users];

        if (searchTerm) {
            sortableItems = sortableItems.filter(user => 
                user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
    }, [users, searchTerm, sortConfig]);

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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة المستخدمين</h1>
                 <input 
                    type="text"
                    placeholder="ابحث عن مستخدم..."
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
                                {[{key: 'fullName', label: 'الاسم الكامل'}, {key: 'email', label: 'البريد الإلكتروني'}, {key: 'registeredAt', label: 'تاريخ التسجيل'}].map(header => (
                                    <th key={header.key} className="p-4 cursor-pointer" onClick={() => requestSort(header.key as keyof User)}>
                                        {header.label} {sortConfig.key === header.key && <SortArrow direction={sortConfig.direction} />}
                                    </th>
                                ))}
                                <th className="p-4">الدور</th>
                                <th className="p-4">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAndFilteredUsers.map(user => (
                                <tr key={user.email} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-4 font-semibold">{user.fullName}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{formatDate(user.registeredAt)}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-sm rounded-full ${user.isAdmin ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'}`}>
                                            {user.isAdmin ? 'مسؤول' : 'مستخدم'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button onClick={() => handleDeleteUser(user.email)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 flex items-center justify-center w-16" disabled={user.email === 'admin@fursatsafar.com' || deletingEmail === user.email}>
                                            {deletingEmail === user.email ? <SmallSpinner /> : 'حذف'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;