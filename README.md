# Conquest Technologies website

Static, dependency-free marketing site (HTML + CSS + vanilla JS) for Conquest Technologies, an IT staffing and placement company.

## Run locally
Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Deploy (GoDaddy cPanel)
Upload `index.html`, `styles.css` and `script.js` to `public_html` in cPanel File Manager (or upload `conquest-technologies-upload.zip` and extract it there). No build step or server-side code is needed.

`render.yaml` is left over from an earlier Render deployment and is not used by GoDaddy.

## Contact details
| Item | Value |
|---|---|
| Phone | +1 (201) 203-4333 |
| Email | pritamsingh@conquesttechnologies.in (also `CONTACT_EMAIL` in `script.js`) |
| Address | 27, Unton Ka karkhana, Bhattiyani Chohatta, Udaipur, Rajasthan 313001 |
| LinkedIn | https://www.linkedin.com/company/conquest-technologies |

Still placeholder: the three testimonials in `#stories` (Daniel R., Priya S., Michael T.).

Images are served from Unsplash (`images.unsplash.com`).

The contact form has no backend. It opens the visitor's email client with the message pre-filled.
