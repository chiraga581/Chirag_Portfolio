import React from 'react';
import { CheckCircle } from 'lucide-react';
import { mockData } from '../mock';

const About = () => {
  const { about } = mockData;

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-light text-gray-900 mb-8 font-mono">
              About Me
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {about.summary}
            </p>
            <div className="space-y-3">
              {about.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:pl-12">
            <div className="bg-gray-50 p-8 border-l-4 border-gray-900">
              <h3 className="text-xl font-medium text-gray-900 mb-4 font-mono">
                Current Focus
              </h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Present:</strong> Developing enterprise automation solutions at Infosys, 
                  specializing in ServiceNow platform optimization and workflow automation.
                </p>
                <p>
                  <strong>Future:</strong> Pursuing AI/ML Masters at Drexel University to bridge 
                  enterprise automation with artificial intelligence applications.
                </p>
                <p>
                  <strong>Research:</strong> Exploring computer vision applications in healthcare, 
                  currently working on cancer detection using deep learning models.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;