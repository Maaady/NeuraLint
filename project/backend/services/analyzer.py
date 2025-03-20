from typing import List, Tuple
import openai
import os
from ..schemas import Suggestion, BestPractice

class CodeAnalyzer:
    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        openai.api_key = self.openai_api_key

    def analyze(self, code: str, language: str) -> Tuple[List[Suggestion], List[BestPractice]]:
        try:
            # Call OpenAI API for code analysis
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a code review expert. Analyze the following code and provide suggestions and best practices."},
                    {"role": "user", "content": f"Language: {language}\n\nCode:\n{code}"}
                ]
            )

            # Process OpenAI response and generate suggestions and best practices
            # This is a simplified implementation
            suggestions = [
                Suggestion(
                    id="s1",
                    line=1,
                    column=1,
                    message="Consider using more descriptive variable names",
                    severity="info",
                    code_snippet="example code",
                    suggested_fix="suggested fix"
                )
            ]

            best_practices = [
                BestPractice(
                    id="bp1",
                    line=1,
                    column=1,
                    message="Follow the single responsibility principle",
                    code_snippet="example code",
                    suggested_fix="suggested fix",
                    reference="https://example.com"
                )
            ]

            return suggestions, best_practices
        except Exception as e:
            print(f"Error in code analysis: {str(e)}")
            return [], []