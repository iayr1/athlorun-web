# Athlorun — website

The public website for the [Athlorun](https://github.com/iayr1/athlorun) Android app. It contains every public URL the Google Play Console asks for. It's a plain static site (HTML/CSS/JS, no build step), so you can host it free on GitHub Pages.

| Page | File | Use it in Play Console for |
|---|---|---|
| Home / landing | `index.html` | **Store settings → Website** |
| Privacy Policy (includes the Health Connect / health data policy) | `privacy-policy.html` | **App content → Privacy policy**, and the **Health apps / Health Connect** declaration |
| Terms & Conditions | `terms.html` | Linked from the app and the store listing |
| Account & data deletion | `delete-account.html` | **App content → Data safety → Delete account URL** |
| Contact & support | `contact.html` | **Store settings → Contact details** |

Once it's on GitHub Pages, the URLs will be:

```
https://iayr1.github.io/athlorun-web/
https://iayr1.github.io/athlorun-web/privacy-policy.html
https://iayr1.github.io/athlorun-web/terms.html
https://iayr1.github.io/athlorun-web/delete-account.html
https://iayr1.github.io/athlorun-web/contact.html
```

## Publish on GitHub Pages

1. Merge this branch into `main`.
2. In the repo, go to **Settings → Pages → Build and deployment**. Set **Source: Deploy from a branch** and pick **Branch: `main` / root**.
3. After a minute or so, the site is live at `https://iayr1.github.io/athlorun-web/`.

## ⚠️ Replace these placeholders before submitting

Search and replace across all files (for example with `grep -rl OLD . | xargs sed -i 's/OLD/NEW/g'`):

| Placeholder | Replace with |
|---|---|
| `support@athlorun.com` | An email inbox you actually monitor. Google may email it, and users send deletion requests to it. |
| `com.athlorun.app` (in the Google Play links) | Your real package name. The app currently uses `com.example.athlorun` in `android/app/build.gradle`, and **Google Play rejects `com.example.*` package names**, so change the `applicationId` first. |
| `https://iayr1.github.io/athlorun-web` (in `robots.txt`, `sitemap.xml` and the canonical/OG tags) | Your custom domain, if you use one. |
| "Athlorun" as the developer/legal entity, governing law "India" in `terms.html` | Your registered developer name and jurisdiction. Have a lawyer review the legal text. |

## Google Play graphics included

- `assets/img/play-store/app-icon-512.png`: 512×512 app icon, for **Main store listing → App icon**.
- `assets/img/play-store/feature-graphic-1024x500.png`: 1024×500, for **Main store listing → Feature graphic**.
- You still need **2–8 phone screenshots** taken from the real app (min. 320px, 16:9 or 9:16).

## Play Console checklist (App content)

- [ ] **Privacy policy**: paste the `privacy-policy.html` URL.
- [ ] **App access**: if features need a login, give reviewers a test email/password.
- [ ] **Ads**: "No, my app does not contain ads".
- [ ] **Content rating**: complete the IARC questionnaire (fitness/health, user interaction for leaderboards/friends).
- [ ] **Target audience**: 13+ (do not select under-13 age groups).
- [ ] **Data safety**: see the answers below.
- [ ] **Delete account URL**: paste the `delete-account.html` URL.
- [ ] **Health apps declaration**: declare Health Connect access (read/write Steps, Distance) and link the privacy policy (`#health-data`).
- [ ] **Location permissions**: the app requests `ACCESS_BACKGROUND_LOCATION`. You must fill in the background location declaration and upload a short video showing the in-app prominent disclosure. If you don't strictly need it, removing the permission makes review much easier.
- [ ] **Health Connect / activity recognition**: describe the use as step counting and workout tracking.
- [ ] Make sure the in-app **Delete Your Account** button really deletes data. In the app repo, `setting_page.dart` currently has a `TODO: call delete API`, and Play reviewers check this.
- [ ] Remove the unused SMS receiver (`com.shounakmulay.telephony...`) from `AndroidManifest.xml`. An SMS broadcast receiver can trigger an SMS/Call Log policy review.

### Suggested Data safety answers (based on the current app code)

| Data type | Collected | Shared | Purpose | Optional? |
|---|---|---|---|---|
| Name, Email address, User IDs | Yes | No | App functionality, Account management | Required |
| Photos (profile/gear) | Yes | No | App functionality | Optional |
| Precise location / Approximate location | Yes | No | App functionality (workout routes) | Optional |
| Health info (assessment: weight, age, blood type, sleep, mood…) | Yes | No | App functionality, Personalisation | Optional |
| Fitness info (steps, distance, calories, workouts) | Yes | No | App functionality, Personalisation | Required |
| App interactions (missions, coins, challenges) | Yes | No | App functionality | Required |
| Crash logs / Diagnostics | Yes | No | Analytics (app stability) | Required |

- Data is encrypted in transit: **Yes**
- Users can request that data be deleted: **Yes** (link `delete-account.html`)

## Editing

Each page is plain HTML. The shared styles are in `assets/css/style.css` and the small amount of JavaScript (theme toggle, mobile menu, mailto forms) is in `assets/js/main.js`. The contact and deletion forms open the visitor's email app with a pre-filled message, so no backend is needed. If you later want submissions stored, point the forms at a service such as Formspree or a Firebase Function.
