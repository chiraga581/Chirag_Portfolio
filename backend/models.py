from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Skills Models
class SkillCategory(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str
    skills: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SkillCategoryCreate(BaseModel):
    category: str
    skills: List[str]

# Projects Models
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    category: str
    description: str
    technologies: List[str]
    features: List[str]
    status: str
    impact: str
    display_order: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    category: str
    description: str
    technologies: List[str]
    features: List[str]
    status: str
    impact: str
    display_order: Optional[int] = 0

# Experience Models
class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    company: str
    position: str
    duration: str
    location: str
    achievements: List[str]
    display_order: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ExperienceCreate(BaseModel):
    company: str
    position: str
    duration: str
    location: str
    achievements: List[str]
    display_order: Optional[int] = 0

# Education Models
class Education(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    institution: str
    degree: str
    duration: str
    location: str
    status: str
    display_order: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class EducationCreate(BaseModel):
    institution: str
    degree: str
    duration: str
    location: str
    status: str
    display_order: Optional[int] = 0

# Certifications Models
class Certification(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    issuer: Optional[str] = None
    date_obtained: Optional[datetime] = None
    display_order: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class CertificationCreate(BaseModel):
    name: str
    issuer: Optional[str] = None
    date_obtained: Optional[datetime] = None
    display_order: Optional[int] = 0

# Contact Models
class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    is_read: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

# API Response Models
class ApiResponse(BaseModel):
    success: bool
    data: Optional[dict] = None
    error: Optional[str] = None
    code: Optional[str] = None

class ApiListResponse(BaseModel):
    success: bool
    data: Optional[List[dict]] = None
    error: Optional[str] = None
    code: Optional[str] = None