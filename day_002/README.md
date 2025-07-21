# ⚠️ Precautions

- **Add `node_modules` to your `.gitignore` file right away!** This prevents you from accidentally pushing it to GitHub and keeps your repository clean.
- **Do NOT push the `node_modules` folder to GitHub or keep it in your repository.** It is very bulky and will make your project heavy, especially as you add more projects to this repo. Always delete `node_modules` before pushing or if you are not using it.
- **If you are a beginner or new to this project:** If you see that `node_modules` is missing, run `npm install` first to install dependencies, then start the project with `npm run dev`.

---

---

# ⚡ How to Create a React App with Vite

Follow these steps to quickly set up a new React project using Vite:

## 🖥️ 1. Open your terminal and navigate to your desired folder

```sh
cd path/to/your/folder
```

## 🏗️ 2. Create a new Vite project

```sh
npm create vite@latest my-app
```

- When prompted, select:
  - **Framework:** React
  - **Variant:** JavaScript

## 📂 3. Go into your new project folder

```sh
cd my-app
```

## 📦 4. Install dependencies

```sh
npm install
```

## 🚀 5. Start the development server

```sh
npm run dev
```

- Open the local URL (e.g., http://localhost:5173/) in your browser to view your app.

---

# 🌈 Add Tailwind CSS to Your Vite + React Project

Follow these steps to set up Tailwind CSS with your Vite React app:

## 1️⃣ Install Tailwind CSS and the Vite plugin

```sh
npm install tailwindcss @tailwindcss/vite
```

## 2️⃣ Configure the Vite plugin

Edit your `vite.config.js` file:

```js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

## 3️⃣ Import Tailwind CSS in your CSS file

At the very top of your `src/index.css` file, add:

```css
@import "tailwindcss";
```

## 4️⃣ Start your development server

```sh
npm run dev
```

Now you can use Tailwind CSS utility classes in your React components!




# 👤 Make Your First React App Yours!

Personalize your app by adding your name:

1. Open `src/App.jsx` in your project.
2. Replace the contents with the following (put your name in the `<h1>` tag):

```jsx
import React from "react";

function App() {
  return (
    <div>
      <h1>Hello, Your Name</h1>
    </div>
  );
}

export default App;
```

