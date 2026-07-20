# PathWeaver

**PathWeaver** is a premium, SaaS‑style web application that helps developers and learners **track, plan, and showcase their skill‑building journey**. Built with **React**, **Vite**, **Tailwind‑free vanilla CSS**, and modern UI patterns (glassmorphism, gradients, micro‑animations), it feels like a polished product such as Linear or Notion.

---

## 🚀 What the app offers

| Section | What it does | Key UI features |
|---------|--------------|-----------------|
| **Dashboard** | Gives an at‑a‑glance view of your progress, streaks, and stats. | Circular progress ring, animated stats cards, quick‑access shortcuts. |
| **Skills** | Browse, search, filter and add new skills. | Emoji‑rich skill cards, level badges, progress bars, glass‑style cards, modal with back button and scroll. |
| **Projects** | Manage personal projects, track progress, and link to GitHub / live demos. | Gradient banners, status badges, progress circles, actions with icons. |
| **Goals** | Set personal goals (learning, project, certification, community). | Priority borders, countdown, edit/delete actions, modal with back button. |
| **Planner** | Weekly schedule planner with sessions, drag‑and‑drop style layout. | Arrow‑back button in modal, type‑colored task cards, week navigation. |
| **Analytics** | Visualize learning hours, skill growth, activity, and skill distribution. | Dark‑theme Recharts (Area, Line, Bar, Pie) with custom tooltips. |
| **CV Builder** | Build a resume from your profile data, copy link or download PDF. | Two‑panel live preview, premium button styling, glass‑effect download/copy link. |
| **Portfolio & Interview** | Show off projects, practice interview questions. | Elegant cards, modal interactions. |
| **Profile** | Personal details, edit profile, back navigation. | Back button at top, clean header card. |
| **Community & Help Center** | Discussions, FAQs, support. | Simple, responsive layouts. |

---

## 🎨 Design highlights
- **Premium aesthetics** – gradient primary colors, glass‑morphism cards, subtle micro‑animations on hover, smooth transitions.
- **Responsive** – works on desktop and mobile, using CSS Grid/Flex layouts.
- **Consistent UI** – every "Add New" modal now has a back arrow button, a clear X close button, and scrollable content.
- **Dark mode ready** – CSS variables make switching themes trivial.

---

## 🛠️ Tech stack
- **React 19** with **React Router v7**
- **Vite** for fast dev/build
- **Recharts** for charts
- **Framer Motion** for animations
- **lucide-react** for icons
- **Vanilla CSS** (no Tailwind) with CSS variables for theming

---

## 📦 Getting started locally
```bash
# Clone the repo
git clone https://github.com/Moncef37i/pathweaver.git
cd pathweaver

# Install dependencies
npm ci

# Run the dev server
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📦 Deploying to GitHub Pages
The repo is already configured with a **GitHub Actions** workflow (`.github/workflows/deploy.yml`) that:
1. Installs Node 20.
2. Builds the app (`npm run build`).
3. Publishes the `dist/` folder to the `gh-pages` branch using `peaceiris/actions-gh-pages@v4`.

The `vite.config.js` file contains:
```js
export default defineConfig({
  base: '/pathweaver/',
  plugins: [react()],
})
```
And `App.jsx` uses:
```jsx
<BrowserRouter basename="/pathweaver">
  {/* routes */}
</BrowserRouter>
```
This ensures the app works correctly when served from `https://Moncef37i.github.io/pathweaver/`.

---

## 🧭 Future roadmap
- **Authentication** (Google/OAuth)
- **Dark‑mode toggle**
- **Export/Import data**
- **Advanced analytics** (filter by date ranges)
- **Mobile app (React Native)**

---

## 📜 License
MIT – feel free to fork, adapt, and improve!

---

> **PathWeaver** – your personal roadmap to a better career.
