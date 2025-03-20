import { CodeAnalysisResult, AnalysisHistory, User } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export const mockAnalysisResults: Record<string, CodeAnalysisResult> = {
  javascript: {
    suggestions: [
      {
        id: 's1',
        line: 5,
        column: 10,
        message: 'Consider using const for variables that are not reassigned',
        severity: 'info',
        codeSnippet: 'var x = 10;',
        suggestedFix: 'const x = 10;'
      },
      {
        id: 's2',
        line: 12,
        column: 3,
        message: 'Unnecessary else statement',
        severity: 'warning',
        codeSnippet: 'if (condition) {\n  return x;\n} else {\n  return y;\n}',
        suggestedFix: 'if (condition) {\n  return x;\n}\nreturn y;'
      }
    ],
    securityIssues: [
      {
        id: 'sec1',
        type: 'XSS',
        line: 23,
        column: 5,
        message: 'Potential XSS vulnerability with innerHTML',
        severity: 'high',
        codeSnippet: 'element.innerHTML = userInput;',
        suggestedFix: 'element.textContent = userInput;',
        cwe: 'CWE-79',
        owasp: 'A7:2017'
      }
    ],
    performanceIssues: [
      {
        id: 'perf1',
        line: 45,
        column: 3,
        message: 'Array inside loop could be hoisted',
        impact: 'medium',
        codeSnippet: 'for (let i = 0; i < items.length; i++) {\n  const arr = [1, 2, 3];\n  // ...\n}',
        suggestedFix: 'const arr = [1, 2, 3];\nfor (let i = 0; i < items.length; i++) {\n  // ...\n}',
        estimatedImprovement: '15% faster loop execution'
      }
    ],
    bestPractices: [
      {
        id: 'bp1',
        line: 67,
        column: 1,
        message: 'Function is too long (150 lines). Consider breaking it down into smaller functions',
        codeSnippet: 'function processData() {\n  // 150 lines of code\n}',
        suggestedFix: 'function processData() {\n  validateInput();\n  transformData();\n  saveResults();\n}\n\nfunction validateInput() {\n  // ...\n}\n\nfunction transformData() {\n  // ...\n}\n\nfunction saveResults() {\n  // ...\n}',
        reference: 'https://en.wikipedia.org/wiki/Single_responsibility_principle'
      }
    ],
    overallScore: 78
  },
  python: {
    suggestions: [
      {
        id: 's1',
        line: 8,
        column: 1,
        message: 'Use f-strings for string formatting',
        severity: 'info',
        codeSnippet: 'message = "Hello, %s" % name',
        suggestedFix: 'message = f"Hello, {name}"'
      }
    ],
    securityIssues: [
      {
        id: 'sec1',
        type: 'SQL Injection',
        line: 15,
        column: 5,
        message: 'Potential SQL injection vulnerability',
        severity: 'critical',
        codeSnippet: 'query = "SELECT * FROM users WHERE username = \'" + username + "\'"',
        suggestedFix: 'query = "SELECT * FROM users WHERE username = %s"\ncursor.execute(query, (username,))',
        cwe: 'CWE-89',
        owasp: 'A1:2017'
      }
    ],
    performanceIssues: [
      {
        id: 'perf1',
        line: 32,
        column: 5,
        message: 'Use list comprehension instead of map/lambda',
        impact: 'low',
        codeSnippet: 'result = list(map(lambda x: x * 2, numbers))',
        suggestedFix: 'result = [x * 2 for x in numbers]',
        estimatedImprovement: '5% faster execution'
      }
    ],
    bestPractices: [
      {
        id: 'bp1',
        line: 45,
        column: 1,
        message: 'Add type hints to function parameters',
        codeSnippet: 'def process_data(data, options):\n    # ...',
        suggestedFix: 'def process_data(data: List[Dict], options: Dict[str, Any]) -> Result:\n    # ...',
        reference: 'https://docs.python.org/3/library/typing.html'
      }
    ],
    overallScore: 82
  }
};

export const mockAnalysisHistory: AnalysisHistory[] = [
  {
    id: 'h1',
    userId: '1',
    timestamp: '2025-04-15T14:30:00Z',
    codeSnippet: 'function calculateTotal(items) {\n  var total = 0;\n  for (var i = 0; i < items.length; i++) {\n    total += items[i].price;\n  }\n  return total;\n}',
    language: 'javascript',
    result: mockAnalysisResults.javascript
  },
  {
    id: 'h2',
    userId: '1',
    timestamp: '2025-04-14T10:15:00Z',
    codeSnippet: 'def calculate_total(items):\n    total = 0\n    for item in items:\n        total += item["price"]\n    return total',
    language: 'python',
    result: mockAnalysisResults.python
  }
];

export const sampleCode = {
  javascript: `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

function displayUserData(userData) {
  var element = document.getElementById('user-info');
  // Potential XSS vulnerability
  element.innerHTML = userData.name;
  
  if (userData.isAdmin) {
    return showAdminPanel();
  } else {
    return showUserPanel();
  }
}

function processItems(items) {
  for (let i = 0; i < items.length; i++) {
    // Array could be hoisted outside the loop
    const statusCodes = [200, 201, 204];
    if (statusCodes.includes(items[i].status)) {
      // Process item
    }
  }
}`,
  python: `def get_user(username):
    # SQL Injection vulnerability
    query = "SELECT * FROM users WHERE username = '" + username + "'"
    cursor.execute(query)
    return cursor.fetchone()

def format_greeting(name):
    # Could use f-string
    return "Hello, %s" % name

def process_numbers(numbers):
    # Could use list comprehension
    result = list(map(lambda x: x * 2, numbers))
    return result

def calculate_statistics(data, options):
    # Missing type hints
    total = sum(data)
    average = total / len(data)
    return {
        "total": total,
        "average": average,
        "options": options
    }`
};