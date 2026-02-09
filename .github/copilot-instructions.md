# Copilot Custom Instructions

## Project Setup Checklist

- [x] Verify that the copilot-instructions.md file in the .github directory is created.

- [x] Clarify Project Requirements
	- Next.js with App Router (TypeScript)
	- React Hook Form
	- Tailwind CSS
	- Axios
	- Zustand
	- html2pdf for PDF/DOCX conversion

- [x] Scaffold the Project
	- Created Next.js project with app router, TypeScript, and Tailwind CSS
	- Installed with `npx create-next-app@latest . --ts --tailwind --eslint --app --use-npm`

- [x] Customize the Project
	- Installed dependencies: react-hook-form, axios, zustand, html2pdf.js

- [x] Install Required Extensions
	- No additional extensions required beyond VS Code defaults

- [x] Compile the Project
	- Verified build succeeds with `npm run build`

- [x] Create and Run Task
	- Setup development and build tasks in .vscode/tasks.json

- [ ] Launch the Project
	- Start development server

- [x] Ensure Documentation is Complete
	- Updated README with project information

## Project Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form
- **HTTP Client**: Axios
- **State Management**: Zustand
- **Document Export**: html2pdf.js
- **Build Tool**: npm

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
