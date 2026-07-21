import os
import json
import urllib.request
import urllib.error
from dotenv import load_dotenv
from fastapi import HTTPException
from app.schemas.analysis import AnalysisResponse
from app.prompts.analysis_prompt import SYSTEM_PROMPT, build_user_prompt

load_dotenv()

def analyze_conversation(conversation: str) -> AnalysisResponse:
    load_dotenv(override=True)
    
    api_key = os.getenv("GROQ_API_KEY", "").strip()
    model_name = os.getenv("MODEL_NAME", "llama-3.3-70b-versatile").strip()

    if not api_key or api_key == "your_groq_api_key":
        raise HTTPException(
            status_code=400, 
            detail="GROQ_API_KEY is not configured in .env file. Please add your GROQ_API_KEY to .env."
        )

    # Directly call Groq's OpenAI-compatible REST endpoint with a custom User-Agent to bypass Cloudflare 1010 filter
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    payload = {
        "model": model_name,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": build_user_prompt(conversation)},
        ],
        "response_format": {"type": "json_object"},
        "temperature": 0.2
    }

    try:
        req = urllib.request.Request(
            url, 
            data=json.dumps(payload).encode("utf-8"), 
            headers=headers, 
            method="POST"
        )
        with urllib.request.urlopen(req) as resp:
            body = resp.read().decode("utf-8")
            res_data = json.loads(body)

        content = res_data["choices"][0]["message"]["content"].strip()
        if content.startswith("```json"):
            content = content[7:]
        if content.startswith("```"):
            content = content[3:]
        if content.endswith("```"):
            content = content[:-3]
        content = content.strip()

        data = json.loads(content)

        return AnalysisResponse.model_validate(data)

    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        try:
            err_json = json.loads(error_body)
            msg = err_json.get("error", {}).get("message", error_body)
        except Exception:
            msg = error_body
        raise HTTPException(status_code=e.code, detail=f"Groq API Error: {msg}")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis Error: {str(e)}")
