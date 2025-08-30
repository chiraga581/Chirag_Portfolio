import React from 'react';
import { ArrowDown, MapPin, Mail, Phone } from 'lucide-react';
import { mockData } from '../mock';

const Hero = () => {
  const { personal } = mockData;

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-4 font-mono tracking-tight">
            {personal.name}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-2 font-medium">
            {personal.title}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {personal.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 mb-12 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{personal.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{personal.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{personal.phone}</span>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={scrollToAbout}
            className="bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
          >
            View My Work
          </button>
          <button
            onClick={() => window.open(`mailto:${personal.email}`)}
            className="border border-gray-300 text-gray-700 px-8 py-3 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 text-sm font-medium"
          >
            Get In Touch
          </button>
        </div>

        <button
          onClick={scrollToAbout}
          className="animate-bounce p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default Hero;