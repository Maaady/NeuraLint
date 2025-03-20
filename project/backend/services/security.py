from typing import List
from ..schemas import SecurityIssue
import re

class SecurityScanner:
    def __init__(self):
        self.vulnerability_patterns = {
            'sql_injection': r"SELECT.*\+.*\+",
            'xss': r"innerHTML.*=",
            'eval_usage': r"eval\(",
        }

    def scan(self, code: str, language: str) -> List[SecurityIssue]:
        security_issues = []
        lines = code.split('\n')

        for i, line in enumerate(lines, 1):
            # Check for SQL Injection
            if re.search(self.vulnerability_patterns['sql_injection'], line):
                security_issues.append(
                    SecurityIssue(
                        id=f"sec{len(security_issues)+1}",
                        type="SQL Injection",
                        line=i,
                        column=1,
                        message="Potential SQL injection vulnerability detected",
                        severity="critical",
                        code_snippet=line.strip(),
                        suggested_fix="Use parameterized queries instead of string concatenation",
                        cwe="CWE-89",
                        owasp="A1:2017"
                    )
                )

            # Check for XSS
            if re.search(self.vulnerability_patterns['xss'], line):
                security_issues.append(
                    SecurityIssue(
                        id=f"sec{len(security_issues)+1}",
                        type="XSS",
                        line=i,
                        column=1,
                        message="Potential XSS vulnerability detected",
                        severity="high",
                        code_snippet=line.strip(),
                        suggested_fix="Use textContent instead of innerHTML",
                        cwe="CWE-79",
                        owasp="A7:2017"
                    )
                )

            # Check for eval usage
            if re.search(self.vulnerability_patterns['eval_usage'], line):
                security_issues.append(
                    SecurityIssue(
                        id=f"sec{len(security_issues)+1}",
                        type="Unsafe Eval",
                        line=i,
                        column=1,
                        message="Unsafe use of eval() detected",
                        severity="high",
                        code_snippet=line.strip(),
                        suggested_fix="Avoid using eval(). Use safer alternatives",
                        cwe="CWE-95",
                        owasp="A1:2017"
                    )
                )

        return security_issues