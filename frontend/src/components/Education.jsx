import React from 'react';
import { GraduationCap, Calendar, MapPin, Clock } from 'lucide-react';
import { mockData } from '../mock';

const Education = () => {
  const { education, certifications } = mockData;

  return (
    <section id="education" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4 font-mono">
            Education & Certifications
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Continuous learning and professional development in technology and engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {education.map((edu) => (
            <div key={edu.id} className="bg-white border border-gray-200 p-8 hover:border-gray-300 transition-colors">
              <div className="flex items-start gap-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  edu.status === 'Planning to Enroll' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <GraduationCap className={`w-6 h-6 ${
                    edu.status === 'Planning to Enroll' ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {edu.degree}
                    </h3>
                    {edu.status === 'Planning to Enroll' && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">Upcoming</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-700 font-medium mb-3">{edu.institution}</p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  {edu.status === 'Planning to Enroll' && (
                    <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400">
                      <p className="text-blue-800 text-sm">
                        <strong>Next Step:</strong> Transitioning from enterprise automation to AI/ML research 
                        and applications in healthcare technology.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-8 border-l-4 border-gray-900">
          <h3 className="text-xl font-medium text-gray-900 mb-6 font-mono">
            Professional Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm font-medium">{cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;