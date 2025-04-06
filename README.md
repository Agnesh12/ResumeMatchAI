# ResumeMatchAI
ResumeMatchAI is an AI-powered resume analyzer &amp; job recommendation platform. Upload your resume, get an ATS score, keyword match, improvement suggestions, and see matching job roles—all in one sleek dashboard built with React and Spring Boot.
# ResumeMatchAI 🎯

ResumeMatchAI is an AI-powered resume analyzer and job recommendation system that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS) and get matched with relevant job roles.

## 🔍 Features

- ✅ Upload resume (PDF, DOC, DOCX)
- ✅ ATS score analysis
- ✅ Matched keywords from your resume
- ✅ Suggestions for resume improvement
- ✅ Job recommendations based on skills
- ✅ Beautiful and responsive UI with TailwindCSS
- ✅ Backend powered by Spring Boot

## 🚀 Tech Stack

| Tech         | Usage               |
|--------------|---------------------|
| React + Vite | Frontend            |
| Tailwind CSS | Styling             |
| Spring Boot  | Backend             |
| Java         | Resume parser logic |
| REST API     | File handling & analysis |

## 📸 Screenshots

![ResumeMatchAI Screenshot](./public/screenshot.png)

## 🛠️ Setup Instructions

### Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
Ensure it's running on http://localhost:8082.

Frontend (React + Vite)
bash
Copy
Edit
cd frontend
npm install
npm run dev
Ensure it's running on http://localhost:5173 and is proxying to the backend via vite.config.js.
