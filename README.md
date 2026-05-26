# Husin's World — 3D Portfolio

A 3D interactive portfolio built with Three.js, React (in-browser via Babel), and Tone.js.

## Files

- `index.html` — page shell, CSS, library loaders
- `world.jsx` — Three.js floating island scene + hotspot definitions
- `app.jsx` — React UI: nav, tooltip, side panels, music, tweaks
- `tweaks-panel.jsx` — Tweaks panel component
- `profile.svg` — profile photo placeholder (replace with your own)

No build step. All dependencies load from CDN.

## Run locally

You can't just double-click `index.html` — browsers block CDN scripts on `file://`. Use a server:

```bash
# Python 3
python -m http.server 8000
# → http://localhost:8000

# Or with Node
npx serve .

# Or in VS Code: install "Live Server" extension, right-click index.html → Open with Live Server
```

## Deploy to GitHub → Vercel

### 1. Push to GitHub

```bash
# in this folder
git init
git add .
git commit -m "Initial commit: 3D portfolio"
git branch -M main

# create an empty repo on github.com first (no README, no .gitignore)
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Or use **GitHub Desktop** — drag the folder, write commit message, "Publish repository".

### 2. Connect to Vercel

1. Go to **https://vercel.com/new**
2. Click **Import Git Repository** and pick the repo you just pushed
3. Vercel auto-detects this as a static site — leave all defaults:
   - Framework Preset: **Other**
   - Build Command: *(empty)*
   - Output Directory: *(empty — defaults to root)*
4. Click **Deploy**

Done. You get a `*.vercel.app` URL in ~30 seconds. Every push to `main` re-deploys automatically.

## Customise

### Profile photo
Replace `profile.svg` with your own image:
- Save your photo as `profile.svg` OR `profile.jpg` / `profile.png`
- If using a different extension, update the two references in `app.jsx` (search `profile.svg`)
- Recommended: square crop, at least 400×400 px

### Content
All text lives in **`world.jsx`** at the top — the `WORLD_HOTSPOTS` array:
- `[0]` About — bio, connect links, experience, education
- `[1]` Projects — array of projects
- `[2]` Skills — groups of skill items
- `[3]` Contact — contact rows

### Brand
Edit `app.jsx` — search for `Husin's World`.

### Theme / colors
In `world.jsx`, `WORLD_PALETTES` defines three time-of-day moods (`sunset`, `morning`, `dusk`). Tweak the hex values to taste — users can switch live via the **Tweaks** panel.

## Tech notes

- Three.js builds the scene procedurally — no .glb / texture files to ship
- React + Babel transpile JSX in the browser. Fine for a portfolio. For higher traffic, port into Vite (`npm create vite@latest`) — the HTML, CSS, and Three.js code carry over unchanged.
- Tone.js generates the warm-pad loop at runtime (no audio files)
- Drag-to-rotate uses pointer capture; clicks under 5px movement open the panel
- Hover detection uses a raycaster against each hotspot group
