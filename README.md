
# ShortDocs

> Your favorite short documentations in one place!

ShortDocs is a modern web application for writing, sharing, and reading concise documentation. Built with Next.js, Firebase, and a beautiful UI, it allows users to create, edit, and browse markdown-based docs with tags, authentication, and a social touch.

## Features

- **Write Docs:** Create and edit documentation using a markdown editor with live preview.
- **Read Docs:** Browse a list of all docs, view details, and filter by tags.
- **Authentication:** Sign up and log in with email/password or Google. Email verification is required.
- **Profile:** View your profile and log out securely.
- **Tagging:** Add tags to docs for easy organization and discovery.
- **Responsive UI:** Clean, modern, and mobile-friendly design.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Firebase](https://firebase.google.com/) (Auth & Firestore)
- [Zustand](https://zustand-demo.pmnd.rs/) (State management)
- [Tailwind CSS](https://tailwindcss.com/) (Styling)
- [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor) (Markdown editor)
- [Framer Motion](https://www.framer.com/motion/) (Animations)

## Getting Started

1. **Clone the repository:**
	```bash
	git clone <your-repo-url>
	cd shortdocs
	```

2. **Install dependencies:**
	```bash
	npm install
	# or
	yarn install
	```

3. **Configure Firebase:**
	- Create a Firebase project and enable Email/Password and Google authentication.
	- Create a Firestore database.
	- Copy your Firebase config to `src/config/firebase.js` (see the file for structure).

4. **Run the development server:**
	```bash
	npm run dev
	```
	Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Write Docs:** Go to `/write` to create a new doc. Use markdown, add a title, description, and tags.
- **Read Docs:** Visit `/read` to browse all docs. Click a doc to view details, edit, or delete (if you are the author).
- **Auth:** Use `/signup` or `/login` to create an account or sign in. Google sign-in is supported.
- **Profile:** Access your profile at `/profile`.

## Folder Structure

- `src/app/` — Main app pages (write, read, login, signup, profile, etc.)
- `src/component/` — UI components (navbar, popup, etc.)
- `src/config/` — Firebase and auth logic
- `src/context/` — Zustand store for user state

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
