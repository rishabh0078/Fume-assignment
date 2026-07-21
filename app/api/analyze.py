from fastapi import APIRouter
from pydantic import BaseModel
from app.schemas.analysis import AnalysisResponse
from app.services.analyzer import analyze_conversation

router = APIRouter()

class AnalyzeRequest(BaseModel):
    conversation: str

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_conversation_endpoint(request: AnalyzeRequest):
    return analyze_conversation(request.conversation)
