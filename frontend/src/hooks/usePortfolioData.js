import { useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';

// Custom hook for fetching portfolio data
export const usePortfolioData = () => {
  const [data, setData] = useState({
    skills: null,
    projects: null,
    experience: null,
    education: null,
    certifications: null
  });
  
  const [loading, setLoading] = useState({
    skills: true,
    projects: true,
    experience: true,
    education: true,
    certifications: true
  });
  
  const [errors, setErrors] = useState({
    skills: null,
    projects: null,
    experience: null,
    education: null,
    certifications: null
  });

  // Helper function to update state for a specific data type
  const updateState = (type, data = null, loading = false, error = null) => {
    setData(prev => ({ ...prev, [type]: data }));
    setLoading(prev => ({ ...prev, [type]: loading }));
    setErrors(prev => ({ ...prev, [type]: error }));
  };

  // Load all portfolio data
  useEffect(() => {
    const loadPortfolioData = async () => {
      // Skills
      try {
        const skillsData = await portfolioAPI.getSkills();
        updateState('skills', skillsData, false, null);
      } catch (error) {
        console.error('Failed to load skills:', error);
        updateState('skills', null, false, 'Failed to load skills');
      }

      // Projects
      try {
        const projectsData = await portfolioAPI.getProjects();
        updateState('projects', projectsData, false, null);
      } catch (error) {
        console.error('Failed to load projects:', error);
        updateState('projects', null, false, 'Failed to load projects');
      }

      // Experience
      try {
        const experienceData = await portfolioAPI.getExperience();
        updateState('experience', experienceData, false, null);
      } catch (error) {
        console.error('Failed to load experience:', error);
        updateState('experience', null, false, 'Failed to load experience');
      }

      // Education
      try {
        const educationData = await portfolioAPI.getEducation();
        updateState('education', educationData, false, null);
      } catch (error) {
        console.error('Failed to load education:', error);
        updateState('education', null, false, 'Failed to load education');
      }

      // Certifications
      try {
        const certificationsData = await portfolioAPI.getCertifications();
        updateState('certifications', certificationsData, false, null);
      } catch (error) {
        console.error('Failed to load certifications:', error);
        updateState('certifications', null, false, 'Failed to load certifications');
      }
    };

    loadPortfolioData();
  }, []);

  // Check if all data is loaded
  const isAllLoaded = Object.values(loading).every(isLoading => !isLoading);
  const hasErrors = Object.values(errors).some(error => error !== null);

  return {
    data,
    loading,
    errors,
    isAllLoaded,
    hasErrors
  };
};

// Custom hook for contact form submission
export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const submitContact = async (formData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await portfolioAPI.submitContact(formData);
      setSubmitStatus('success');
      return { success: true };
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      setSubmitStatus('error');
      return { success: false, error: error.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetStatus = () => {
    setSubmitStatus(null);
  };

  return {
    isSubmitting,
    submitStatus,
    submitContact,
    resetStatus
  };
};