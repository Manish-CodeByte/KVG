# 🤖 AI Roadmap Generator - Setup Guide

## ✅ Feature Overview

The **AI-Powered Roadmap Generator** creates personalized learning roadmaps using Google's Gemini API.

### Key Features:
- ✨ Generate custom learning roadmaps based on any subject
- 🎯 Choose difficulty level (Beginner, Intermediate, Advanced)
- 📚 Beautiful timeline visualization
- 🏷️ Color-coded difficulty badges
- 📋 Detailed module descriptions with topics
- 🚀 Start button for each module

---

## 🔧 Installation & Setup

### 1. Already Configured ✅
The following are **already added**:
- Gemini API key in `.env.local`
- Route `/ai-roadmap` in `App.jsx`
- Navigation link in Navbar
- All components created

### 2. Using the Feature

**Access the AI Roadmap Generator:**
```
http://localhost:3002/ai-roadmap
```

**Steps:**
1. Enter a learning subject (e.g., "Web Development", "Machine Learning")
2. Select your skill level
3. Click "Generate Roadmap"
4. View the beautiful timeline with all modules
5. Click "Start Learning" to begin

---

## 📁 File Structure

```
src/
├── services/
│   └── AIRoadmapService.js       # Gemini API integration
├── pages/
│   └── AIRoadmapGeneratorPage.jsx # Main page
├── components/
│   ├── AIRoadmapGenerator.jsx     # Input form
│   ├── RoadmapTimeline.jsx        # Timeline display
│   └── TimelineDisplay.jsx        # (Alternative display)
└── App.jsx                         # Route: /ai-roadmap
```

---

## 🚀 How It Works

### Request Flow:
```
User Input (Subject + Level)
    ↓
generateAIRoadmap() function
    ↓
Send to Gemini API
    ↓
Parse JSON response
    ↓
Display in Timeline
```

### Response Format:
```json
[
  {
    "id": 1,
    "title": "Module Title",
    "description": "What you'll learn",
    "difficulty": "Beginner|Intermediate|Advanced",
    "duration": "2 weeks",
    "topics": ["topic1", "topic2", "topic3"]
  }
]
```

---

## 🎨 UI Components

### AIRoadmapGeneratorPage
- Input form for subject and level selection
- Quick suggestion buttons
- Loading state with spinner

### RoadmapTimeline
- Vertical timeline with numbered dots
- Color-coded by difficulty:
  - 🟢 Beginner: Green
  - 🟡 Intermediate: Yellow
  - 🔴 Advanced: Red
- Expandable module cards
- Topics badges
- "Start Learning" buttons

---

## 🔑 Environment Variables

Required in `.env.local`:
```
VITE_GEMINI_API_KEY=AIzaSyCzWzhP5OIlHcljuwBUunHRe5Ua_ft2cFo
```

**Important**: Keep this key private! Don't commit to GitHub in production.

---

## ⚠️ Error Handling

If Gemini API fails, the app automatically falls back to **mock data**:
- Pre-built roadmaps for Web Development and Machine Learning
- Always shows valid roadmap (no blank screens)
- Toast notification indicates fallback mode

---

## 📊 Customization

### Change Difficulty Colors:
Edit `RoadmapTimeline.jsx`:
```javascript
const getDifficultyColor = (difficulty) => {
  // Modify color mappings here
}
```

### Add New Mock Roadmaps:
Edit `AIRoadmapService.js`:
```javascript
const mockRoadmaps = {
  'Your Subject': {
    'Beginner': [ /* modules */ ]
  }
}
```

### Adjust Prompt:
Edit `AIRoadmapService.js` - modify the `prompt` variable to change AI behavior.

---

## 🧪 Testing

### Test locally:
```bash
npm run dev
# Navigate to http://localhost:3002/ai-roadmap
```

### Test with mocked API:
Remove/comment out Gemini API key to force fallback

### Test specific subjects:
- "Web Development"
- "Machine Learning"
- "Data Science"
- "Cloud Computing"
- Any custom subject

---

## 🚀 Deployment

### For Vercel:
1. Add env var in Vercel dashboard:
   ```
   VITE_GEMINI_API_KEY = AIzaSyCzWzhP5OIlHcljuwBUunHRe5Ua_ft2cFo
   ```

2. Deploy as usual
3. Access at: `https://your-app.vercel.app/ai-roadmap`

---

## 📝 API Limits

**Google Gemini API Free Tier:**
- ✅ 60 requests per minute
- ✅ 1500 requests per day
- Should be more than enough for demos

**Monitor usage:**
- Go to Google AI Studio
- Check API call statistics

---

## 💡 Pro Tips

1. **Be Specific**: "React.js for beginners" → Better results than just "React"
2. **Multi-language**: Works in any language (Gemini supports 100+ languages)
3. **Custom Topics**: Generates topics list for each module automatically
4. **Mobile Responsive**: Works perfectly on phones and tablets
5. **Accessibility**: All components are keyboard accessible

---

## 🎯 Next Steps

### Potential Enhancements:
1. Save generated roadmaps to database
2. Track progress through modules
3. Quiz generation for each module
4. Peer comparison (see what others learned)
5. Export roadmap as PDF

### Integration Ideas:
- Connect with Supabase to save roadmaps
- Add user roadmap history
- Create community roadmap sharing
- Generate certificates on completion

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "API Key Error" | Check `.env.local` has correct key |
| No modules displayed | Check browser console for errors |
| Slow generation | Gemini API taking time, wait 5-10s |
| Fallback data showing | API key might be invalid or missing |

---

## 📞 Support

For issues or feature requests:
1. Check the console (F12) for errors
2. Verify API key is set correctly
3. Test with a simple subject first
4. Check Gemini API quota limits

---

**Built with ❤️ using Google Gemini AI**
