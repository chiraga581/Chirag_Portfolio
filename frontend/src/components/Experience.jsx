import React from 'react';
import { Building, MapPin, Calendar } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Experience = () => {
  const { experience } = mockData;

  return (
    <section id="experience" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4 font-mono">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Over 2+ years of hands-on experience in ServiceNow development and enterprise automation.
          </p>
        </div>

        <div className="space-y-12">
          {experience.map((job, index) => (
            <div key={job.id} className="relative">
              {/* Timeline line */}
              {index < experience.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-32 bg-gray-300"></div>
              )}
              
              <div className="flex items-start gap-8">
                {/* Timeline dot */}
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-2">
                  <Building className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 bg-white p-8 border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-1">
                        {job.position}
                      </h3>
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          <span className="font-medium">{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 mt-2 lg:mt-0">
                      <Calendar className="w-4 h-4" />
                      <span className="font-mono text-sm">{job.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {job.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600 leading-relaxed">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;