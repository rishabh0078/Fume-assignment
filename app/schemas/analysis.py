from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

class ClassificationEnum(str, Enum):
    confirmed_fact = "confirmed_fact"
    client_reported = "client_reported"
    ai_inference = "ai_inference"
    missing_information = "missing_information"

class FindingStatus(str, Enum):
    green = "green"
    yellow = "yellow"
    red = "red"
    gray = "gray"

class Finding(BaseModel):
    title: str
    status: FindingStatus
    confidence: float
    classification: ClassificationEnum
    evidence: str

class AnalysisResponse(BaseModel):
    weekly_summary: Finding
    nutrition: Finding
    exercise: Finding
    sleep: Finding
    water: Finding
    stress: Finding
    symptoms: Finding
    engagement: Finding
    barriers: Finding
    pending_actions: Finding
    risk_flags: Finding
    coach_recommendation: Finding
