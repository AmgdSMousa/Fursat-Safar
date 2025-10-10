import React from 'react';
import { Job } from './jobsData';

interface JobCardProps {
    job: Job;
}


const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl dark:hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 flex flex-col h-full relative">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
            <img src={job.logo} alt={`${job.company} logo`} className="w-10 h-10 object-contain p-1" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 font-medium">{job.company}</p>
        </div>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2 mb-4 flex-grow">
        <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>{job.type}</span>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3">
        {job.description}
      </p>
      <div className="mt-auto">
        <a href={`#/apply/${job.id}`} className="w-full block text-center px-6 py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-md transition-transform transform hover:scale-105 duration-300">
            قدم الآن
        </a>
      </div>
    </div>
  );
};

export default JobCard;
