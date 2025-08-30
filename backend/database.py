from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collection names
SKILLS_COLLECTION = "skills"
PROJECTS_COLLECTION = "projects"
EXPERIENCE_COLLECTION = "experience"
EDUCATION_COLLECTION = "education"
CERTIFICATIONS_COLLECTION = "certifications"
CONTACTS_COLLECTION = "contacts"

# Database utility functions
async def get_collection(collection_name: str):
    """Get a database collection"""
    return db[collection_name]

async def close_db_connection():
    """Close database connection"""
    client.close()