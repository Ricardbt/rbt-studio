# RBT Studio

Developer & Creative Technologist portfolio website.

## Tech Stack

- React 18 + Vite ✓
- TailwindCSS
- JavaScript

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment to Hostinger

### 1. Connect GitHub Repository in Hostinger

1. Log in to [hPanel](https://hpanel.hostinger.com)
2. Go to **Websites** → Manage your domain
3. **Advanced** → **Git**
4. **Create New Repository**:
   - Repository URL: `https://github.com/Ricardbt/rbt-studio.git`
   - Branch: `master`
   - Install Path: (leave empty = public_html)

### 2. Enable Auto-Deployment

1. Click on the created repository → **Manage**
2. **Auto Deployment** → Enable
3. Copy the **Webhook URL**

### 3. Add GitHub Secret

1. Go to GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. New secret:
   - Name: `HOSTINGER_WEBHOOK_URL`
   - Value: paste the webhook URL from Hostinger

### 4. Deploy

```bash
git push origin master
```

Every push will automatically deploy to Hostinger.

---

**Contact**: ricardboixeda@gmail.com
**Location**: Barcelona, Spain