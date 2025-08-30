// Mock data for Chirag's Portfolio
export const mockData = {
  personal: {
    name: "Chirag",
    title: "ServiceNow Developer",
    subtitle: "Specializing in Service Portal & Automation | Transitioning to AI/ML",
    email: "chiraga581@gmail.com",
    phone: "9873464335",
    location: "Delhi, India",
    linkedin: "https://linkedin.com/in/chirag",
    github: "https://github.com/chirag"
  },
  
  about: {
    summary: "Experienced ServiceNow Developer with 2+ years of expertise in Service Portal development, automation, and workflow optimization. Currently enhancing enterprise platforms at Infosys while preparing for AI/ML Masters at Drexel University. Passionate about leveraging technology to solve complex business problems and exploring the intersection of enterprise automation and artificial intelligence.",
    highlights: [
      "2+ years ServiceNow development experience",
      "Specialized in Service Portal & UI Policies",
      "Automated workflow optimization expert", 
      "Planning AI/ML Masters at Drexel (2027)",
      "Active in Computer Vision projects"
    ]
  },

  skills: {
    serviceNow: [
      "Service Portal Development",
      "Business Rules & Client Scripts", 
      "UI Policies & UI Actions",
      "Script Includes & Workflow Editor",
      "Scheduled Jobs & Transform Maps",
      "ServiceNow CSA Certified"
    ],
    technical: [
      "JavaScript", "REST APIs", "XML/JSON",
      "Flow Designer", "Workflow Editor", 
      "Data Sources & Integration",
      "Role-Based Access Control"
    ],
    emerging: [
      "Computer Vision", "Python",
      "TensorFlow/PyTorch", "OpenCV",
      "Machine Learning", "Deep Learning"
    ]
  },

  projects: [
    {
      id: 1,
      title: "Facility Access Security Uplift (FASU)",
      category: "ServiceNow Enterprise",
      description: "Comprehensive security and compliance automation system for facility access management.",
      technologies: ["ServiceNow", "JavaScript", "UI Policies", "Business Rules", "MRVS"],
      features: [
        "Custom Service Portal widgets for access requests",
        "Multi-Row Variable Sets (MRVS) for complex data handling",
        "UI Policies and Client Scripts for enhanced UX",
        "Automated access request approvals using Flow Designer",
        "Real-time email and push notifications",
        "Role-Based Access Control (RBAC) implementation"
      ],
      status: "Production",
      impact: "Reduced manual access management by 80%, improved compliance tracking"
    },
    {
      id: 2, 
      title: "Automated Role Management System (ARMS)",
      category: "ServiceNow Automation",
      description: "User provisioning and data synchronization system with external integrations.",
      technologies: ["ServiceNow", "Scheduled Jobs", "Transform Maps", "REST APIs", "ACLs"],
      features: [
        "Scheduled imports with Transform Maps for AD-ServiceNow sync",
        "OnBefore, OnStart, OnAfter, OnComplete script validations",
        "Automated user role assignments based on organizational rules",
        "Custom ACLs for data access restriction",
        "External REST API integrations for real-time data exchange",
        "Optimized data import processes for improved performance"
      ],
      status: "Production",
      impact: "Automated user provisioning reduced manual effort by 90%"
    },
    {
      id: 3,
      title: "Cancer Detection using Computer Vision",
      category: "AI/ML Research",
      description: "Deep learning model for early cancer detection using medical imaging analysis.",
      technologies: ["Python", "TensorFlow", "OpenCV", "CNN", "Medical Imaging"],
      features: [
        "Convolutional Neural Network architecture for image classification",
        "Medical image preprocessing and augmentation pipeline", 
        "Transfer learning implementation for improved accuracy",
        "Model evaluation with sensitivity/specificity metrics",
        "Data visualization for model interpretability"
      ],
      status: "In Progress",
      impact: "Research project exploring AI applications in healthcare diagnostics"
    }
  ],

  experience: [
    {
      id: 1,
      company: "Infosys",
      position: "ServiceNow Developer", 
      duration: "07/2023 – Present",
      location: "Pune, India",
      achievements: [
        "Configured and Enhanced multiple Service Portal Pages optimizing ServiceNow service platform pages by implementing UI Policies, Variables, and Catalog Client Scripts",
        "Developed Automated Service Provisioning Workflows streamlining service delivery through automated workflows, reducing manual tasks using Workflow Editor",
        "Identified and Resolved ServiceNow Issues proactively troubleshooting issues using logs and incident analysis, ensuring reliable platform performance",
        "Developed optimized Scheduled Scripts automating routine tasks and data processing, improving system efficiency",
        "Configured Data Sources and Transform Maps enabling seamless integration and automated data imports with accuracy and consistency"
      ]
    },
    {
      id: 2,
      company: "Infosys", 
      position: "ServiceNow Administrator",
      duration: "06/2021 – 07/2023",
      location: "Pune, India",
      achievements: [
        "Managed Incident Management, Problem Management, and Change Management processes within ServiceNow",
        "Provided technical support for ITSM and ITAM tools, including BIG Panda and ServiceNow",
        "Assisted in user training and onboarding, increasing platform adoption",
        "Developed custom reports and dashboards, improving system performance monitoring",
        "Documented business requirements and technical specifications for ServiceNow enhancements"
      ]
    }
  ],

  education: [
    {
      id: 1,
      institution: "Drexel University",
      degree: "Masters in Artificial Intelligence & Machine Learning",
      duration: "2025 – 2027 (Planned)",
      location: "Philadelphia, PA",
      status: "Planning to Enroll"
    },
    {
      id: 2,
      institution: "HMR Institute of Technology and Management",
      degree: "BTech - Mechanical and Automation Engineering", 
      duration: "2016 – 2020",
      location: "Delhi, India",
      status: "Completed"
    }
  ],

  certifications: [
    "ServiceNow Certified System Administrator (CSA)",
    "ServiceNow Minor Certifications",
    "JavaScript Programming",
    "REST API Integration"
  ]
};