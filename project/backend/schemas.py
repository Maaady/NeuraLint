from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class SecurityIssue(BaseModel):
    id: str
    type: str
    line: int
    column: int
    message: str
    severity: str
    code_snippet: str
    suggested_fix: str
    cwe: Optional[str] = None
    owasp: Optional[str] = None

class PerformanceIssue(BaseModel):
    id: str
    line: int
    column: int
    message: str
    impact: str
    code_snippet: str
    suggested_fix: str
    estimated_improvement: Optional[str] = None

class Suggestion(BaseModel):
    id: str
    line: int
    column: int
    message: str
    severity: str
    code_snippet: str
    suggested_fix: str

class BestPractice(BaseModel):
    id: str
    line: int
    column: int
    message: str
    code_snippet: str
    suggested_fix: str
    reference: Optional[str] = None

class CodeAnalysisRequest(BaseModel):
    code: str
    language: str
    project_context: Optional[str] = None

class CodeAnalysisResponse(BaseModel):
    suggestions: List[Suggestion]
    security_issues: List[SecurityIssue]
    performance_issues: List[PerformanceIssue]
    best_practices: List[BestPractice]
    overall_score: int

class User(BaseModel):
    email: str
    full_name: str

    class Config:
        from_attributes = True

class Analysis(BaseModel):
    id: int
    user_id: int
    code: str
    language: str
    results: dict
    created_at: datetime

    class Config:
        from_attributes = True