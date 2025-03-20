from typing import List
from ..schemas import PerformanceIssue
import re

class PerformanceAnalyzer:
    def __init__(self):
        self.performance_patterns = {
            'array_in_loop': r"(const|let|var).*=.*\[.*\].*for",
            'nested_loops': r"for.*for",
            'inefficient_selectors': r"document\.getElementsBy(TagName|ClassName)",
        }

    def analyze(self, code: str, language: str) -> List[PerformanceIssue]:
        performance_issues = []
        lines = code.split('\n')

        for i, line in enumerate(lines, 1):
            # Check for array declaration inside loops
            if re.search(self.performance_patterns['array_in_loop'], line):
                performance_issues.append(
                    PerformanceIssue(
                        id=f"perf{len(performance_issues)+1}",
                        line=i,
                        column=1,
                        message="Array declaration inside loop",
                        impact="medium",
                        code_snippet=line.strip(),
                        suggested_fix="Move array declaration outside the loop",
                        estimated_improvement="15% faster loop execution"
                    )
                )

            # Check for nested loops
            if re.search(self.performance_patterns['nested_loops'], line):
                performance_issues.append(
                    PerformanceIssue(
                        id=f"perf{len(performance_issues)+1}",
                        line=i,
                        column=1,
                        message="Nested loops detected",
                        impact="high",
                        code_snippet=line.strip(),
                        suggested_fix="Consider using a more efficient data structure or algorithm",
                        estimated_improvement="Up to 50% performance improvement"
                    )
                )

            # Check for inefficient DOM selectors
            if re.search(self.performance_patterns['inefficient_selectors'], line):
                performance_issues.append(
                    PerformanceIssue(
                        id=f"perf{len(performance_issues)+1}",
                        line=i,
                        column=1,
                        message="Inefficient DOM selector usage",
                        impact="low",
                        code_snippet=line.strip(),
                        suggested_fix="Use querySelector or getElementById for better performance",
                        estimated_improvement="5-10% faster DOM operations"
                    )
                )

        return performance_issues