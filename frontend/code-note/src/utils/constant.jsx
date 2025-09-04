// src/utils/constants.js
export const mockNotes = [
  {
    id: '1',
    title: 'Fibonacci Function',
    language: 'python',
    code: 'def fibonacci(n):\n    if n <= 1:\n        return n\n    else:\n        return fibonacci(n-1) + fibonacci(n-2)\n\n# Print first 10 Fibonacci numbers\nfor i in range(10):\n    print(fibonacci(i))',
    notes: 'This is a recursive implementation of Fibonacci sequence. Time complexity is O(2^n).',
    output: '0\n1\n1\n2\n3\n5\n8\n13\n21\n34'
  },
  {
    id: '2',
    title: 'Quick Sort Example',
    language: 'javascript',
    code: 'function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  \n  const pivot = arr[0];\n  const left = [];\n  const right = [];\n  \n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] < pivot) {\n      left.push(arr[i]);\n    } else {\n      right.push(arr[i]);\n    }\n  }\n  \n  return [...quickSort(left), pivot, ...quickSort(right)];\n}\n\nconst sorted = quickSort([5, 2, 9, 1, 7, 3]);\nconsole.log("Sorted array:", sorted);',
    notes: 'QuickSort is a divide and conquer algorithm. It works by selecting a pivot element and partitioning the array around the pivot.',
    output: 'Sorted array: [1, 2, 3, 5, 7, 9]'
  },
  {
    id: '3',
    title: 'API Request Example',
    language: 'javascript',
    code: '// Using fetch to get data from an API\nasync function fetchUserData(userId) {\n  try {\n    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);\n    const user = await response.json();\n    console.log(user);\n    return user;\n  } catch (error) {\n    console.error("Error fetching user:", error);\n  }\n}\n\n// Fetch user with ID 1\nfetchUserData(1);',
    notes: 'This example uses async/await for handling promises. Remember to handle errors in API calls.',
    output: '{\n  "id": 1,\n  "name": "Leanne Graham",\n  "username": "Bret",\n  "email": "Sincere@april.biz",\n  "address": {\n    "street": "Kulas Light",\n    "suite": "Apt. 556",\n    "city": "Gwenborough",\n    "zipcode": "92998-3874",\n    "geo": {\n      "lat": "-37.3159",\n      "lng": "81.1496"\n    }\n  },\n  "phone": "1-770-736-8031 x56442",\n  "website": "hildegard.org",\n  "company": {\n    "name": "Romaguera-Crona",\n    "catchPhrase": "Multi-layered client-server neural-net",\n    "bs": "harness real-time e-markets"\n  }\n}'
  }
];