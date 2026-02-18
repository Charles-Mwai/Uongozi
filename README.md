# Uongozi - Civic Education Platform 🇰🇪

Uongozi is a modern civic education platform designed to empower Kenyan citizens by making the **Constitution of Kenya 2010** accessible, understandable, and engaging.

## 🚀 Features

- **Katiba AI**: An AI-powered assistant trained on the Kenyan Constitution to provide plain-language explanations of legal articles and rights.
- **Interactive Quiz**: Test your knowledge of Kenyan history, government, and constitutional rights.
- **Civic Tools**: Quick access to essential information like your rights upon arrest, government structure, and more.
- **Bilingual Support**: Accessible in both English and Kiswahili.

## 🛠️ Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Backend (Serverless)**: Vercel Functions (Node.js)
- **AI Engine**: OpenAI (GPT-4o-mini)
- **Styling**: Vanilla CSS with a premium dark green and gold aesthetic.

## 📦 Deployment on Vercel

This project is optimized for deployment on Vercel using Serverless Functions.

### Prerequisites

- A [Vercel](https://vercel.com) account.
- An [OpenAI API Key](https://platform.openai.com/).

### Deployment Steps

1.  **Clone the repository**.
2.  **Set up Environment Variables**:
    In the Vercel Dashboard, go to your project settings and add the following environment variable:
    - `OPENAI_API_KEY`: Your OpenAI API Key.
3.  **Deploy**:
    Run `vercel` or push to a connected GitHub/GitLab repository.

## 💻 Local Development

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Set up your `.env` file with `OPENAI_API_KEY`.
3.  Run the development server:
    ```bash
    npm run dev
    ```
    *Note: For local testing of the AI chat, the backend logic is in `api/chat.js`.*

## 📖 License

This project is for educational purposes and aims to promote constitutional literacy in Kenya.
