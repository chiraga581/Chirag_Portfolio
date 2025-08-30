import React from 'react';
import { Heart, Code } from 'lucide-react';
import { mockData } from '../mock';

const Footer = () => {
  const { personal } = mockData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold mb-4 font-mono">{personal.name}</h3>
            <p className="text-gray-400 leading-relaxed">
              ServiceNow Developer transitioning to AI/ML. Building enterprise automation 
              solutions and exploring the future of intelligent systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.querySelector(`#${item.toLowerCase()}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-4">Get in Touch</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{personal.location}</p>
              <a 
                href={`mailto:${personal.email}`} 
                className="block hover:text-white transition-colors"
              >
                {personal.email}
              </a>
              <a 
                href={`tel:${personal.phone}`} 
                className="block hover:text-white transition-colors"
              >
                {personal.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© {currentYear} {personal.name}. Built with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>and</span>
              <Code className="w-4 h-4" />
            </div>
            <div className="text-gray-400 text-sm">
              <span>Designed for modern web experiences</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;