# Conquest Technology website

Static, dependency-free marketing site (HTML + CSS + vanilla JS) for Conquest Technology, an IT staffing and placement company.

## Run locally
Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Deploy (Render)
`render.yaml` defines a Render static site (`runtime: static`, publish path `.`, no build step).
Push this folder to a Git repo, then in Render choose **New → Blueprint** and select the repo.

## Placeholders to replace
These are dummy values until the client supplies the real details:

| Item | Placeholder | Where |
|---|---|---|
| Phone | +1 (469) 555-0142 | `index.html` (contact + footer) |
| Email | info@conquesttechnology.com | `index.html` (contact + footer), `script.js` (`CONTACT_EMAIL`) |
| Address | 1234 Commerce Street, Suite 500, Dallas, TX 75201 | `index.html` (contact + footer) |
| LinkedIn | linkedin.com/company/conquest-technology | `index.html` (contact + footer) |
| Testimonials | Daniel R., Priya S., Michael T. | `index.html` (`#stories`) |

Images are served from Unsplash (`images.unsplash.com`).

The contact form has no backend. It opens the visitor's email client with the message pre-filled. To collect submissions without email, swap in a form service such as Formspree.
