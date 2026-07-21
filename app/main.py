import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.analyze import router as analyze_router

load_dotenv()

app = FastAPI(title="GenAI Client Intelligence Dashboard API")

# Read FRONTEND_URL from environment variable, fallback to localhost
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
origins = [frontend_url]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the GenAI Client Intelligence Dashboard API"}
