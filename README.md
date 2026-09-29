# Yasser Saidani — Portfolio

Personal portfolio / online CV, hosted on GitHub Pages: **https://yesser147.github.io/CV/**

No framework and no build step: plain HTML, CSS and JavaScript. Push to `main` and the site updates.

## Project structure

```
index.html              Page skeleton (sections, navigation) — rarely needs editing
data/
  content.js            ALL the text: profile, experience, projects, skills, certifications…
assets/
  css/style.css         Design (colors, fonts and spacing are variables at the top)
  js/main.js            Turns content.js into HTML (theme toggle, filters, animations)
  img/                  Profile photo
  cv/                   Downloadable CV PDFs (EN / FR)
  certificates/         Certificate PDFs + preview images
```

## How to update the portfolio

Almost everything is done in **`data/content.js`**.

| I want to…                  | Do this in `data/content.js`                                              |
| --------------------------- | ------------------------------------------------------------------------- |
| Add a project               | Copy one `{ ... }` block in `projects`, paste it, change the values       |
| Add an experience           | Add a block at the top of `experience` (newest first)                     |
| Add a skill                 | Add `{ name: "Docker", level: 70 }` to a `bars` group, or text to a `tags` group |
| Add a LinkedIn link         | Uncomment the LinkedIn line in `profile.links` and put your URL           |
| Add a certificate           | Put the PDF in `assets/certificates/`, add a block in `certifications`    |
| Update the CV PDF           | Replace `assets/cv/CV_EN.pdf` / `CV_FR.pdf` (keep the same names)         |
| Change the photo            | Replace `assets/img/profile.webp` and `profile.jpg` (square, ~640×640px)  |

Tips:
- Write `**text**` in any description to make it **bold**.
- Every item needs a comma after its closing `}` or `"`.
- If the page is empty after an edit, open the browser console (F12): it usually points to a missing comma or quote in `content.js`.

### Certificate preview images
A certificate works with only the PDF (a file icon is shown). For a picture preview, take a screenshot of the
certificate, save it as `.webp`, `.png` or `.jpg` in `assets/certificates/` and set `image:` to its path.

### Change colors / fonts
Edit the variables at the top of `assets/css/style.css` (`--accent`, `--accent-2`, `--font`, …).
Light and dark themes each have their own block.

## Run it locally

Any static server works, for example:

```bash
python -m http.server 5500
```

Then open http://localhost:5500.
