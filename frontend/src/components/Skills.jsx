import React from 'react';
import { Code, Settings, Brain } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Skills = () => {
  const { data, loading, errors } = usePortfolioData();

  // Show loading state
  if (loading.skills) {
    return (
      <section id="skills" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4 font-mono">
              Technical Skills
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive skill set spanning enterprise automation, 
              system integration, and emerging AI/ML technologies.
            </p>
          </div>
          <LoadingSpinner text="Loading skills..." />
        </div>
      </section>
    );
  }

  // Show error state
  if (errors.skills) {
    return (
      <section id="skills" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4 font-mono">
              Technical Skills
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive skill set spanning enterprise automation, 
              system integration, and emerging AI/ML technologies.
            </p>
          </div>
          <ErrorMessage message={errors.skills} />
        </div>
      </section>
    );
  }

  // Transform API data to match component format
  const transformSkillsData = (skillsArray) => {
    const skillCategories = [
      {
        title: "ServiceNow Expertise",
        icon: <Settings className="w-6 h-6" />,
        skills: [],
        color: "border-blue-200 bg-blue-50",
        category: "serviceNow"
      },
      {
        title: "Technical Skills", 
        icon: <Code className="w-6 h-6" />,
        skills: [],
        color: "border-green-200 bg-green-50",
        category: "technical"
      },
      {
        title: "AI/ML & Emerging Tech",
        icon: <Brain className="w-6 h-6" />,
        skills: [],
        color: "border-purple-200 bg-purple-50",
        category: "emerging"
      }
    ];

    // Map API data to categories
    skillsArray.forEach(skillData => {
      const category = skillCategories.find(cat => cat.category === skillData.category);
      if (category) {
        category.skills = skillData.skills;
      }
    });

    return skillCategories;
  };

  const skillCategories = transformSkillsData(data.skills || []);

  return (
    <section id="skills" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4 font-mono">
            Technical Skills
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive skill set spanning enterprise automation, 
            system integration, and emerging AI/ML technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className={`p-8 border ${category.color} transition-transform duration-200 hover:scale-105`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-gray-700">
                  {category.icon}
                </div>
                <h3 className="text-xl font-medium text-gray-900 font-mono">
                  {category.title}
                </h3>
              </div>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;