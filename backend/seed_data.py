import asyncio
from database import db, SKILLS_COLLECTION, PROJECTS_COLLECTION, EXPERIENCE_COLLECTION, EDUCATION_COLLECTION, CERTIFICATIONS_COLLECTION
from models import SkillCategory, Project, Experience, Education, Certification

async def seed_database():
    """Seed the database with initial portfolio data"""
    
    # Clear existing data
    await db[SKILLS_COLLECTION].delete_many({})
    await db[PROJECTS_COLLECTION].delete_many({})
    await db[EXPERIENCE_COLLECTION].delete_many({})
    await db[EDUCATION_COLLECTION].delete_many({})
    await db[CERTIFICATIONS_COLLECTION].delete_many({})
    
    # Seed Skills
    skills_data = [
        SkillCategory(
            category="serviceNow",
            skills=[
                "Service Portal Development",
                "Business Rules & Client Scripts", 
                "UI Policies & UI Actions",
                "Script Includes & Workflow Editor",
                "Scheduled Jobs & Transform Maps",
                "ServiceNow CSA Certified"
            ]
        ),
        SkillCategory(
            category="technical",
            skills=[
                "JavaScript", "REST APIs", "XML/JSON",
                "Flow Designer", "Workflow Editor", 
                "Data Sources & Integration",
                "Role-Based Access Control"
            ]
        ),
        SkillCategory(
            category="emerging",
            skills=[
                "Computer Vision", "Python",
                "TensorFlow/PyTorch", "OpenCV",
                "Machine Learning", "Deep Learning"
            ]
        )
    ]
    
    for skill in skills_data:
        await db[SKILLS_COLLECTION].insert_one(skill.dict())
    
    # Seed Projects
    projects_data = [
        Project(
            title="Facility Access Security Uplift (FASU)",
            category="ServiceNow Enterprise",
            description="Comprehensive security and compliance automation system for facility access management.",
            technologies=["ServiceNow", "JavaScript", "UI Policies", "Business Rules", "MRVS"],
            features=[
                "Custom Service Portal widgets for access requests",
                "Multi-Row Variable Sets (MRVS) for complex data handling",
                "UI Policies and Client Scripts for enhanced UX",
                "Automated access request approvals using Flow Designer",
                "Real-time email and push notifications",
                "Role-Based Access Control (RBAC) implementation"
            ],
            status="Production",
            impact="Reduced manual access management by 80%, improved compliance tracking",
            display_order=1
        ),
        Project(
            title="Automated Role Management System (ARMS)",
            category="ServiceNow Automation",
            description="User provisioning and data synchronization system with external integrations.",
            technologies=["ServiceNow", "Scheduled Jobs", "Transform Maps", "REST APIs", "ACLs"],
            features=[
                "Scheduled imports with Transform Maps for AD-ServiceNow sync",
                "OnBefore, OnStart, OnAfter, OnComplete script validations",
                "Automated user role assignments based on organizational rules",
                "Custom ACLs for data access restriction",
                "External REST API integrations for real-time data exchange",
                "Optimized data import processes for improved performance"
            ],
            status="Production",
            impact="Automated user provisioning reduced manual effort by 90%",
            display_order=2
        ),
        Project(
            title="Cancer Detection using Computer Vision",
            category="AI/ML Research",
            description="Deep learning model for early cancer detection using medical imaging analysis.",
            technologies=["Python", "TensorFlow", "OpenCV", "CNN", "Medical Imaging"],
            features=[
                "Convolutional Neural Network architecture for image classification",
                "Medical image preprocessing and augmentation pipeline", 
                "Transfer learning implementation for improved accuracy",
                "Model evaluation with sensitivity/specificity metrics",
                "Data visualization for model interpretability"
            ],
            status="In Progress",
            impact="Research project exploring AI applications in healthcare diagnostics",
            display_order=3
        )
    ]
    
    for project in projects_data:
        await db[PROJECTS_COLLECTION].insert_one(project.dict())
    
    # Seed Experience
    experience_data = [
        Experience(
            company="Infosys",
            position="ServiceNow Developer", 
            duration="07/2023 – Present",
            location="Pune, India",
            achievements=[
                "Configured and Enhanced multiple Service Portal Pages optimizing ServiceNow service platform pages by implementing UI Policies, Variables, and Catalog Client Scripts",
                "Developed Automated Service Provisioning Workflows streamlining service delivery through automated workflows, reducing manual tasks using Workflow Editor",
                "Identified and Resolved ServiceNow Issues proactively troubleshooting issues using logs and incident analysis, ensuring reliable platform performance",
                "Developed optimized Scheduled Scripts automating routine tasks and data processing, improving system efficiency",
                "Configured Data Sources and Transform Maps enabling seamless integration and automated data imports with accuracy and consistency"
            ],
            display_order=1
        ),
        Experience(
            company="Infosys", 
            position="ServiceNow Administrator",
            duration="06/2021 – 07/2023",
            location="Pune, India",
            achievements=[
                "Managed Incident Management, Problem Management, and Change Management processes within ServiceNow",
                "Provided technical support for ITSM and ITAM tools, including BIG Panda and ServiceNow",
                "Assisted in user training and onboarding, increasing platform adoption",
                "Developed custom reports and dashboards, improving system performance monitoring",
                "Documented business requirements and technical specifications for ServiceNow enhancements"
            ],
            display_order=2
        )
    ]
    
    for exp in experience_data:
        await db[EXPERIENCE_COLLECTION].insert_one(exp.dict())
    
    # Seed Education
    education_data = [
        Education(
            institution="Drexel University",
            degree="Masters in Artificial Intelligence & Machine Learning",
            duration="2025 – 2027 (Planned)",
            location="Philadelphia, PA",
            status="Planning to Enroll",
            display_order=1
        ),
        Education(
            institution="HMR Institute of Technology and Management",
            degree="BTech - Mechanical and Automation Engineering", 
            duration="2016 – 2020",
            location="Delhi, India",
            status="Completed",
            display_order=2
        )
    ]
    
    for edu in education_data:
        await db[EDUCATION_COLLECTION].insert_one(edu.dict())
    
    # Seed Certifications
    certifications_data = [
        Certification(name="ServiceNow Certified System Administrator (CSA)", display_order=1),
        Certification(name="ServiceNow Minor Certifications", display_order=2),
        Certification(name="JavaScript Programming", display_order=3),
        Certification(name="REST API Integration", display_order=4)
    ]
    
    for cert in certifications_data:
        await db[CERTIFICATIONS_COLLECTION].insert_one(cert.dict())
    
    print("✅ Database seeded successfully with portfolio data!")

if __name__ == "__main__":
    asyncio.run(seed_database())