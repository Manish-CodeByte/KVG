const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

/**
 * Generate a learning roadmap using Gemini AI
 * @param {string} topic - The learning topic (e.g., "Web Development", "Machine Learning")
 * @param {string} level - User's current level (beginner, intermediate, advanced)
 * @returns {Promise<Array>} Array of roadmap modules
 */
export const generateAIRoadmap = async (topic, level = 'beginner') => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return generateMockRoadmap(topic, level)
  }

  try {
    const prompt = `Generate a learning roadmap for "${topic}" at ${level} level. 
    Format as JSON array with exactly 7-9 modules. Each module must have:
    - title (string, concise name)
    - description (string, 1-2 sentences)
    - difficulty (string: "Beginner", "Intermediate", or "Advanced")
    - duration (string: "1 week", "2 weeks", etc.)
    
    Return ONLY valid JSON array, no markdown or extra text.
    Example format:
    [
      {
        "title": "Module Title",
        "description": "What you'll learn",
        "difficulty": "Beginner",
        "duration": "1 week"
      }
    ]`

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 2000,
          temperature: 0.7,
        },
      }),
    })

    if (!response.ok) {
      console.error('Gemini API error:', response.status)
      return generateMockRoadmap(topic, level)
    }

    const data = await response.json()
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!content) {
      return generateMockRoadmap(topic, level)
    }

    // Parse JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      return generateMockRoadmap(topic, level)
    }

    const modules = JSON.parse(jsonMatch[0])

    // Add IDs to modules
    return modules.map((mod, idx) => ({
      id: idx + 1,
      ...mod,
    }))
  } catch (error) {
    console.error('Error generating roadmap:', error)
    return generateMockRoadmap(topic, level)
  }
}

/**
 * Generate mock roadmap as fallback
 */
function generateMockRoadmap(topic, level) {
  const roadmaps = {
    'web development': [
      {
        id: 1,
        title: 'HTML & CSS Fundamentals',
        description: 'Learn semantic HTML5 and modern CSS3 for creating responsive web pages.',
        difficulty: 'Beginner',
        duration: '2 weeks',
      },
      {
        id: 2,
        title: 'JavaScript Basics',
        description: 'Master JavaScript fundamentals: variables, functions, DOM manipulation.',
        difficulty: 'Beginner',
        duration: '3 weeks',
      },
      {
        id: 3,
        title: 'ES6+ & Modern JavaScript',
        description: 'Learn arrow functions, promises, async/await, and modern syntax.',
        difficulty: 'Intermediate',
        duration: '2 weeks',
      },
      {
        id: 4,
        title: 'React Fundamentals',
        description: 'Build interactive UIs with React components, hooks, and state management.',
        difficulty: 'Intermediate',
        duration: '4 weeks',
      },
      {
        id: 5,
        title: 'Backend with Node.js',
        description: 'Create RESTful APIs and server-side applications using Express.js.',
        difficulty: 'Intermediate',
        duration: '3 weeks',
      },
      {
        id: 6,
        title: 'Database Design',
        description: 'Learn SQL, NoSQL, and database optimization techniques.',
        difficulty: 'Advanced',
        duration: '3 weeks',
      },
      {
        id: 7,
        title: 'Full Stack Project',
        description: 'Build a complete web application with frontend, backend, and database.',
        difficulty: 'Advanced',
        duration: '4 weeks',
      },
    ],
    'machine learning': [
      {
        id: 1,
        title: 'Python for Data Science',
        description: 'Learn Python basics and libraries like NumPy, Pandas, Matplotlib.',
        difficulty: 'Beginner',
        duration: '2 weeks',
      },
      {
        id: 2,
        title: 'Statistics & Probability',
        description: 'Understand statistical concepts essential for ML.',
        difficulty: 'Beginner',
        duration: '2 weeks',
      },
      {
        id: 3,
        title: 'Supervised Learning',
        description: 'Master regression and classification algorithms.',
        difficulty: 'Intermediate',
        duration: '3 weeks',
      },
      {
        id: 4,
        title: 'Unsupervised Learning',
        description: 'Learn clustering, dimensionality reduction, and anomaly detection.',
        difficulty: 'Intermediate',
        duration: '2 weeks',
      },
      {
        id: 5,
        title: 'Deep Learning Basics',
        description: 'Introduction to neural networks, CNNs, and RNNs.',
        difficulty: 'Intermediate',
        duration: '3 weeks',
      },
      {
        id: 6,
        title: 'TensorFlow & Keras',
        description: 'Build and train deep learning models with TensorFlow.',
        difficulty: 'Advanced',
        duration: '3 weeks',
      },
      {
        id: 7,
        title: 'ML Projects & Deployment',
        description: 'Deploy ML models and build real-world applications.',
        difficulty: 'Advanced',
        duration: '4 weeks',
      },
    ],
    default: [
      {
        id: 1,
        title: 'Fundamentals',
        description: 'Learn the core concepts and basics of the subject.',
        difficulty: 'Beginner',
        duration: '2 weeks',
      },
      {
        id: 2,
        title: 'Core Concepts',
        description: 'Dive deeper into essential topics and principles.',
        difficulty: 'Beginner',
        duration: '3 weeks',
      },
      {
        id: 3,
        title: 'Practical Skills',
        description: 'Apply knowledge to solve real-world problems.',
        difficulty: 'Intermediate',
        duration: '3 weeks',
      },
      {
        id: 4,
        title: 'Advanced Topics',
        description: 'Explore advanced concepts and specialized areas.',
        difficulty: 'Advanced',
        duration: '2 weeks',
      },
      {
        id: 5,
        title: 'Capstone Project',
        description: 'Build a comprehensive project showcasing all skills learned.',
        difficulty: 'Advanced',
        duration: '3 weeks',
      },
    ],
  }

  return (
    roadmaps[topic.toLowerCase()] || roadmaps.default
  )
}
