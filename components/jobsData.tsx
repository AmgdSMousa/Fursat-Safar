export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  logo: string;
  postedDate: string; // ISO 8601 format date string
}

// Helper to get past dates for realistic data
const getPastDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const genericCompanyLogo = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM3QzdBODQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik02IDIyVjRhMiAyIDAgMCAxIDItMmg4YTIgMiAwIDAgMSAyIDJ2MTgiLz48cGF0aCBkPSJNNiAxMkggNGEyIDIgMCAwIDAtMiAydjZhMiAyIDAgMCAwIDIgMmgyIi8+PHBhdGggZD0iTTE4IDloMmEyIDIgMCAwIDEgMiAydjZhMiAyIDAgMCAxLTIgMmgtMiIvPjxwYXRoIGQ9Ik0xMCA2aDQiLz48cGF0aCBkPSJNMTAgMTBoNCIvPjxwYXRoIGQ9Ik0xMCAxNGg0Ii8+PHBhdGggZD0iTTEwIDE4aDQiLz48L3N2Zz4=';

export const jobs: Job[] = [
  {
    id: 1,
    title: 'مهندس برمجيات أول',
    company: 'Tech Solutions Inc.',
    location: 'دبي, الإمارات العربية المتحدة',
    type: 'دوام كامل',
    description: 'نبحث عن مهندس برمجيات أول ذو خبرة للانضمام إلى فريقنا المبتكر. ستكون مسؤولاً عن تصميم وتطوير واختبار ونشر تطبيقات الويب.',
    logo: genericCompanyLogo,
    postedDate: getPastDate(1), // Posted 1 day ago
  },
  {
    id: 2,
    title: 'مدير تسويق رقمي',
    company: 'Marketing Gurus',
    location: 'الرياض, المملكة العربية السعودية',
    type: 'دوام كامل',
    description: 'نبحث عن مدير تسويق رقمي مبدع لقيادة استراتيجياتنا التسويقية عبر الإنترنت. يجب أن يكون لديك خبرة في SEO/SEM والتسويق عبر وسائل التواصل الاجتماعي.',
    logo: genericCompanyLogo,
    postedDate: getPastDate(6), // Posted 6 days ago
  },
  {
    id: 3,
    title: 'مصمم واجهة مستخدم/تجربة مستخدم (UI/UX)',
    company: 'Creative Minds',
    location: 'الدوحة, قطر',
    type: 'عن بعد',
    description: 'انضم إلى فريقنا من المصممين الموهوبين لإنشاء تجارب مستخدم مذهلة لمنتجاتنا الرقمية. مطلوب خبرة في Figma و Adobe XD.',
    logo: genericCompanyLogo,
    postedDate: getPastDate(14), // Posted 14 days ago
  },
  {
    id: 4,
    title: 'محلل بيانات',
    company: 'Data Insights Co.',
    location: 'دبي, الإمارات العربية المتحدة',
    type: 'دوام جزئي',
    description: 'نبحث عن محلل بيانات شغوف لتحويل البيانات الخام إلى رؤى قابلة للتنفيذ. خبرة في SQL و Python و أدوات تصور البيانات مثل Tableau.',
    logo: genericCompanyLogo,
    postedDate: getPastDate(25), // Posted 25 days ago
  },
    {
    id: 5,
    title: 'مدير مشروع تقني',
    company: 'Innovatech',
    location: 'الرياض, المملكة العربية السعودية',
    type: 'دوام كامل',
    description: 'قيادة المشاريع التقنية من البداية إلى النهاية. خبرة في منهجيات Agile و Scrum. مهارات تواصل ممتازة.',
    logo: genericCompanyLogo,
    postedDate: getPastDate(0), // Posted today
  },
  {
    id: 6,
    title: 'كاتب محتوى تسويقي',
    company: 'Creative Minds',
    location: 'القاهرة, مصر',
    type: 'عن بعد',
    description: 'كتابة محتوى إبداعي وجذاب لمنصات التواصل الاجتماعي، المدونات، والحملات الإعلانية. إتقان اللغة العربية والإنجليزية.',
    logo: genericCompanyLogo,
    postedDate: getPastDate(40), // Posted 40 days ago
  }
];