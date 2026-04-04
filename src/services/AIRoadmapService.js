import axios from 'axios'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL =AIzaSyCzWzhP5OIlHcljuwBUunHRe5Ua_ft2cFo
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

export const generateAIRoadmap = async (subject, level = 'Beginner') => {
  try {
    const prompt = `Generate a detailed learning roadmap for "${subject}" at ${level} level.

Format the response as a JSON array with exactly this structure (no markdown, pure JSON):
[
  {
    "title": "Module Title",
    "description": "Brief description of what you'll learn",
    "difficulty": "Beginner|Intermediate|Advanced",
    "duration": "2 weeks",
    "topics": ["topic1", "topic2", "topic3"]
  }
]

Create 6-8 modules that progressively build skills. Each module should have specific, achievable learning outcomes.`

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    // Extract text from response
    const responseText =
      response.data.candidates[0].content.parts[0].text

    // Parse JSON from response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI')
    }

    const modules = JSON.parse(jsonMatch[0])

    // Add IDs and ensure all fields exist
    return modules.map((module, index) => ({
      id: index + 1,
      title: module.title || `Module ${index + 1}`,
      description: module.description || '',
      difficulty: module.difficulty || 'Beginner',
      duration: module.duration || '2 weeks',
      topics: module.topics || [],
    }))
  } catch (error) {
    console.error('Error generating roadmap:', error)

    // Fallback mock roadmap
    return getMockRoadmap(subject, level)
  }
}

// Fallback mock data
const getMockRoadmap = (subject, level) => {
  const mockRoadmaps = {
    'Web Development': {
      Beginner: [
        {
          id: 1,
          title: 'HTML Basics',
          description: 'Learn HTML fundamentals and semantic markup',
          difficulty: 'Beginner',
          duration: '1 week',
          topics: ['Tags', 'Elements', 'Forms', 'Accessibility'],
        },
        {
          id: 2,
          title: 'CSS Styling',
          description: 'Master CSS for beautiful web pages',
          difficulty: 'Beginner',
          duration: '2 weeks',
          topics: ['Selectors', 'Box Model', 'Flexbox', 'Grid'],
        },
        {
          id: 3,
          title: 'JavaScript Basics',
          description: 'Learn JavaScript fundamentals',
          difficulty: 'Intermediate',
          duration: '3 weeks',
          topics: ['Variables', 'Functions', 'DOM', 'Events'],
        },
        {
          id: 4,
          title: 'Responsive Design',
          description: 'Build mobile-friendly websites',
          difficulty: 'Intermediate',
          duration: '2 weeks',
          topics: ['Media Queries', 'Mobile First', 'Testing'],
        },
        {
          id: 5,
          title: 'React Basics',
          description: 'Introduction to React framework',
          difficulty: 'Intermediate',
          duration: '3 weeks',
          topics: ['Components', 'Props', 'State', 'Hooks'],
        },
        {
          id: 6,
          title: 'Backend Integration',
          description: 'Connect frontend to APIs',
          difficulty: 'Intermediate',
          duration: '2 weeks',
          topics: ['Fetch API', 'Async/Await', 'Error Handling'],
        },
      ],
    },
    'Machine Learning': {
      Beginner: [
        {
          id: 1,
          title: 'Python Fundamentals',
          description: 'Learn Python basics for ML',
          difficulty: 'Beginner',
          duration: '2 weeks',
          topics: ['Syntax', 'Data Types', 'Libraries', 'NumPy'],
        },
        {
          id: 2,
          title: 'Data Analysis',
          description: 'Explore and analyze datasets with Pandas',
          difficulty: 'Beginner',
          duration: '2 weeks',
          topics: ['Data Frames', 'Cleaning', 'Visualization'],
        },
        {
          id: 3,
          title: 'Statistics for ML',
          description: 'Essential statistics for machine learning',
          difficulty: 'Intermediate',
          duration: '2 weeks',
          topics: ['Probability', 'Distributions', 'Hypothesis Testing'],
        },
        {
          id: 4,
          title: 'Supervised Learning',
          description: 'Classification and regression algorithms',
          difficulty: 'Intermediate',
          duration: '3 weeks',
          topics: ['Linear Regression', 'Logistic Regression', 'SVM'],
        },
        {
          id: 5,
          title: 'Neural Networks',
          description: 'Introduction to deep learning',
          difficulty: 'Advanced',
          duration: '3 weeks',
          topics: ['Perceptron', 'Backpropagation', 'TensorFlow'],
        },
        {
          id: 6,
          title: 'Model Evaluation',
          description: 'Evaluate and optimize ML models',
          difficulty: 'Intermediate',
          duration: '2 weeks',
          topics: ['Metrics', 'Cross Validation', 'Hyperparameter Tuning'],
        },
      ],
    },
  }

  return (
    mockRoadmaps[subject]?.[level] ||
    mockRoadmaps['Web Development']['Beginner']
  )
}
