# AI Quiz Generator

A modern, AI-powered specialized quiz generator application. This app allows users to generate multiple-choice questions on any subject using advanced Large Language Models (LLMs) including OpenAI's GPT-4, Anthropic's Claude, Google's Gemini, and xAI's Grok.

## Features

-   **AI-Powered Generation**: Generate quizzes on any topic instantly.
-   **Multiple LLM Support**: Choose between OpenAI, Claude, Gemini, and xAI providers.
-   **"Cosmic Glass" UI**: A premium, modern interface with glassmorphism effects and animated backgrounds.
-   **Code formatting**: Automatically formats code snippets in questions with syntax highlighting.
-   **Smart Difficulty**: Auto-detects difficulty from the subject description (e.g., "Advanced Python" vs "Basic Math").
-   **Interactive Experience**: Real-time progress tracking, instant feedback, and detailed results view.

## Tech Stack

### Frontend
-   **Framework**: React (v19) with TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS v4, Custom CSS Animations
-   **Markdown Rendering**: `react-markdown` with `react-syntax-highlighter`

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Language**: TypeScript
-   **AI Integration**: OpenAI SDK, Anthropic SDK, Google Generative AI SDK

## Prerequisites

-   Node.js (v18 or higher)
-   npm (v9 or higher)

## Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/danielngan/mcq.git
    cd mcq
    ```

2.  **Install Backend Dependencies**
    ```bash
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```bash
    cd ../client
    npm install
    ```

## Configuration

1.  Navigate to the `server` directory.
2.  Create a `.env` file in the `server` directory.
3.  Add your API keys to the `.env` file:

    ```env
    PORT=3000
    
    # Add keys for the providers you want to use
    OPENAI_API_KEY=your_openai_key
    ANTHROPIC_API_KEY=your_anthropic_key
    GEMINI_API_KEY=your_gemini_key
    XAI_API_KEY=your_xai_key
    ```

## Running the Application

You can run both the client and server concurrently using the provided script from the root directory:

```bash
./start-dev.sh
```

Alternatively, you can run them separately:

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`.

## Usage

1.  Open the application in your browser.
2.  Enter a **Subject** (e.g., "History of the Internet", "Javascript Async/Await").
3.  Select the number of **Questions**.
4.  Choose your preferred **AI Provider**.
5.  Click **Start Quiz**.
6.  Answer the questions and view your results!

## License

ISC
