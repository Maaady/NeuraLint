from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import os
from dotenv import load_dotenv

from models import Base, engine
from database import get_db
from schemas import CodeAnalysisRequest, CodeAnalysisResponse
from services.analyzer import CodeAnalyzer
from services.security import SecurityScanner
from services.performance import PerformanceAnalyzer

# Load environment variables
load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="NeuraLint API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to NeuraLint API"}

@app.post("/api/analyze", response_model=CodeAnalysisResponse)
async def analyze_code(request: CodeAnalysisRequest, db: Session = Depends(get_db)):
    try:
        # Initialize analyzers
        code_analyzer = CodeAnalyzer()
        security_scanner = SecurityScanner()
        performance_analyzer = PerformanceAnalyzer()

        # Perform analysis
        security_issues = security_scanner.scan(request.code, request.language)
        performance_issues = performance_analyzer.analyze(request.code, request.language)
        suggestions, best_practices = code_analyzer.analyze(request.code, request.language)

        # Calculate overall score
        total_issues = (
            len(security_issues) +
            len(performance_issues) +
            len(suggestions) +
            len(best_practices)
        )
        max_score = 100
        deductions = total_issues * 5  # Deduct 5 points per issue
        overall_score = max(0, max_score - deductions)

        return CodeAnalysisResponse(
            suggestions=suggestions,
            security_issues=security_issues,
            performance_issues=performance_issues,
            best_practices=best_practices,
            overall_score=overall_score
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)