import React, { useState } from 'react';
import { ExternalLink, Github, Code, Zap, Brain } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Projects = () => {
  const { data, loading, errors } = usePortfolioData();
  const [selectedProject, setSelectedProject] = useState(null);

  // Show loading state
  if (loading.projects) {
    return (
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4 font-mono">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A showcase of enterprise automation solutions and emerging AI/ML research projects.
            </p>
          </div>
          <LoadingSpinner text="Loading projects..." />
        </div>
      </section>
    );
  }

  // Show error state
  if (errors.projects) {
    return (
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4 font-mono">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A showcase of enterprise automation solutions and emerging AI/ML research projects.
            </p>
          </div>
          <ErrorMessage message={errors.projects} />
        </div>
      </section>
    );
  }

  const projects = data.projects || [];

  const getCategoryIcon = (category) => {
    if (category.includes('ServiceNow')) return <Code className="w-5 h-5" />;
    if (category.includes('AI/ML')) return <Brain className="w-5 h-5" />;
    return <Zap className="w-5 h-5" />;
  };

  const getCategoryColor = (category) => {
    if (category.includes('ServiceNow Enterprise')) return 'bg-blue-100 text-blue-800';
    if (category.includes('ServiceNow Automation')) return 'bg-green-100 text-green-800';  
    if (category.includes('AI/ML')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4 font-mono">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of enterprise automation solutions and emerging AI/ML research projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(project.category)}
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                  </div>
                  <div className={`px-2 py-1 text-xs rounded ${
                    project.status === 'Production' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {project.status}
                  </div>
                </div>

                <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                    View Details →
                  </button>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Github className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(selectedProject.category)}
                    <h3 className="text-2xl font-medium text-gray-900 font-mono">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-light"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {selectedProject.description}
                    </p>

                    <h4 className="font-medium text-gray-900 mb-4">Key Features:</h4>
                    <ul className="space-y-2 mb-6">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-gray-50 p-4 border-l-4 border-gray-900">
                      <p className="text-gray-700">
                        <strong>Impact:</strong> {selectedProject.impact}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Technologies Used:</h4>
                    <div className="space-y-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <div key={index} className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-mono">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;