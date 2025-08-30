from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import logging
from pathlib import Path
from typing import List

# Import models and database
from models import (
    SkillCategory, Project, Experience, Education, Certification, Contact,
    SkillCategoryCreate, ProjectCreate, ExperienceCreate, EducationCreate, 
    CertificationCreate, ContactCreate, ApiResponse, ApiListResponse
)
from database import (
    db, SKILLS_COLLECTION, PROJECTS_COLLECTION, EXPERIENCE_COLLECTION,
    EDUCATION_COLLECTION, CERTIFICATIONS_COLLECTION, CONTACTS_COLLECTION
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(title="Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Original hello world endpoint
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running!"}

# Skills endpoints
@api_router.get("/skills", response_model=ApiListResponse)
async def get_skills():
    try:
        skills = await db[SKILLS_COLLECTION].find().to_list(1000)
        # Convert ObjectId to string for JSON serialization
        for skill in skills:
            skill['_id'] = str(skill['_id'])
        
        return ApiListResponse(success=True, data=skills)
    except Exception as e:
        logging.error(f"Error fetching skills: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch skills")

# Projects endpoints
@api_router.get("/projects", response_model=ApiListResponse)
async def get_projects():
    try:
        projects = await db[PROJECTS_COLLECTION].find().sort("display_order", 1).to_list(1000)
        # Convert ObjectId to string for JSON serialization
        for project in projects:
            project['_id'] = str(project['_id'])
        
        return ApiListResponse(success=True, data=projects)
    except Exception as e:
        logging.error(f"Error fetching projects: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch projects")

@api_router.get("/projects/{project_id}", response_model=ApiResponse)
async def get_project(project_id: str):
    try:
        project = await db[PROJECTS_COLLECTION].find_one({"id": project_id})
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        project['_id'] = str(project['_id'])
        return ApiResponse(success=True, data=project)
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error fetching project {project_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch project")

# Experience endpoints
@api_router.get("/experience", response_model=ApiListResponse)
async def get_experience():
    try:
        experiences = await db[EXPERIENCE_COLLECTION].find().sort("display_order", 1).to_list(1000)
        # Convert ObjectId to string for JSON serialization
        for exp in experiences:
            exp['_id'] = str(exp['_id'])
        
        return ApiListResponse(success=True, data=experiences)
    except Exception as e:
        logging.error(f"Error fetching experience: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch experience")

# Education endpoints
@api_router.get("/education", response_model=ApiListResponse)
async def get_education():
    try:
        education = await db[EDUCATION_COLLECTION].find().sort("display_order", 1).to_list(1000)
        # Convert ObjectId to string for JSON serialization
        for edu in education:
            edu['_id'] = str(edu['_id'])
        
        return ApiListResponse(success=True, data=education)
    except Exception as e:
        logging.error(f"Error fetching education: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch education")

# Certifications endpoints
@api_router.get("/certifications", response_model=ApiListResponse)
async def get_certifications():
    try:
        certifications = await db[CERTIFICATIONS_COLLECTION].find().sort("display_order", 1).to_list(1000)
        # Convert ObjectId to string for JSON serialization
        for cert in certifications:
            cert['_id'] = str(cert['_id'])
        
        return ApiListResponse(success=True, data=certifications)
    except Exception as e:
        logging.error(f"Error fetching certifications: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch certifications")

# Contact endpoints
@api_router.post("/contact", response_model=ApiResponse)
async def create_contact(contact: ContactCreate):
    try:
        contact_obj = Contact(**contact.dict())
        result = await db[CONTACTS_COLLECTION].insert_one(contact_obj.dict())
        
        return ApiResponse(
            success=True, 
            data={"message": "Contact form submitted successfully!", "id": str(result.inserted_id)}
        )
    except Exception as e:
        logging.error(f"Error creating contact: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contacts", response_model=ApiListResponse)
async def get_contacts():
    """Admin endpoint to view contact submissions"""
    try:
        contacts = await db[CONTACTS_COLLECTION].find().sort("created_at", -1).to_list(1000)
        # Convert ObjectId to string for JSON serialization
        for contact in contacts:
            contact['_id'] = str(contact['_id'])
        
        return ApiListResponse(success=True, data=contacts)
    except Exception as e:
        logging.error(f"Error fetching contacts: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch contacts")

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_event():
    from database import close_db_connection
    await close_db_connection()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)