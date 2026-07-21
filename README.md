# GenAI Client Intelligence Dashboard

A modern, production-ready MVP application that automatically analyzes coach-client conversation transcripts to generate structured, actionable client intelligence. 

Built for health and wellness coaches, this tool processes conversation transcripts and extracts key insights across 12 vital domains (e.g., nutrition, sleep, exercise, risk flags) to save time and improve client tracking.

## Features

- **Automated Intelligence Extraction**: Uses the advanced Groq API (Llama 3) to extract structured JSON data from natural language conversations.
- **Multiple Input Methods**: Paste transcript text directly, or upload `.txt` and `.pdf` files for immediate parsing.
- **Structured Insights**: Automatically categorizes findings into 12 domains, complete with a confidence score, classification type (e.g., "Client Reported", "Confirmed Fact"), and direct evidence quoted from the transcript.
- **Review Workflow**: A built-in status badge system to approve, reject, or mark insights for editing.

## Tech Stack

- **Frontend**: React.js (Vite) with custom modern CSS styling
- **Backend**: Python FastAPI with Pydantic for strict data validation
- **AI Integration**: Groq REST API utilizing the `llama-3.3-70b-versatile` model for lightning-fast JSON inference

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- A Groq API Key

### Backend Setup

1. Open a terminal and navigate to the project root directory.
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the root directory and add your Groq API key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   MODEL_NAME=llama-3.3-70b-versatile
   ```
5. Start the FastAPI backend server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The backend will run on `http://localhost:8000`.

### Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `frontend` directory to link the backend:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or the port specified by Vite).

## Usage

1. Open the frontend URL in your browser.
2. Paste a transcript or upload a `.pdf`/`.txt` file into the Conversation Input panel.
3. Click "Analyze Conversation". 
4. Review the structured intelligence cards populated on the dashboard. Use the action bar at the bottom to set the review status.
