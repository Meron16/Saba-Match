# AI Screening Module Setup

## Environment Configuration

Create a `.env.local` file in the root directory with your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

**Important**: Never commit `.env.local` to version control!

## Installation

The required packages have been added to `package.json`:
- `openai`: ^4.20.0
- `pdf-parse`: ^1.1.1

Install them with:
```bash
npm install
```

## Usage

### 1. Screen Applications via Dashboard

1. Navigate to Company Dashboard (`/dashboard/company`)
2. Click on the "AI Screening" tab
3. Select a job from the dropdown (if multiple jobs exist)
4. Click "Screen All Applications" to analyze candidates
5. View ranked candidates with match scores and justifications

### 2. Screen via API

```typescript
// Screen all applications for a job
const response = await fetch("/api/ai/screen", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "x-user-id": userId,
  },
  body: JSON.stringify({ jobId: "job_123" })
});

const data = await response.json();
console.log(data.rankings); // Ranked candidates
```

### 3. Screen Single Application

```typescript
const response = await fetch("/api/ai/screen", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-user-id": userId,
  },
  body: JSON.stringify({
    applicationId: "app_123",
    jobId: "job_456"
  })
});
```

## How It Works

1. **Resume Parsing**: Extracts structured data from PDF/text resumes
   - Skills, experience, education, certifications
   - Falls back to profile data if CV not available

2. **Skill Matching**: Uses OpenAI to match candidate skills against job requirements
   - Extracts keywords from job description
   - AI-powered analysis for intelligent matching
   - Provides match percentage and justification

3. **Ranking**: Scores candidates based on:
   - Skills (50% weight)
   - Experience (30% weight)
   - Education (20% weight)
   - Ranks from best to worst match

## Troubleshooting

### OpenAI API Errors
- Verify API key is correct in `.env.local`
- Check API key has sufficient credits
- Ensure environment variable is loaded (restart dev server)

### PDF Parsing Errors
- Ensure PDF files are valid and not corrupted
- Check file size limits (5MB max)
- Falls back to profile data if parsing fails

### No Results
- Ensure applications exist for the selected job
- Check that candidates have uploaded CVs or filled profiles
- Verify job requirements are properly set

## Cost Considerations

The module uses OpenAI GPT-4o-mini which is cost-efficient:
- ~$0.15 per 1M input tokens
- ~$0.60 per 1M output tokens

Typical screening costs:
- Single application: ~$0.001-0.002
- 10 applications: ~$0.01-0.02

Monitor usage in OpenAI dashboard to control costs.

