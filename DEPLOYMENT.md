# Deployment Guide

Complete guide for deploying Outpro India to production.

## Pre-Deployment Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Change `ADMIN_SECRET` to a secure value
- [ ] Change default admin password
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS
- [ ] Setup monitoring and logging
- [ ] Backup database
- [ ] Test all functionality
- [ ] Set up error tracking (Sentry)
- [ ] Setup automated backups

## Backend Deployment

### Option 1: Render.com (Recommended)

#### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git push -u origin main
```

#### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository

#### Step 3: Configure Service
```
Name: outpro-india-api
Environment: Node
Region: Singapore (or closest to you)
Build Command: npm install
Start Command: npm start
```

#### Step 4: Set Environment Variables
In Render dashboard, add:
```
MONGODB_URI: your-atlas-connection-string
JWT_SECRET: your-strong-secret-key
ADMIN_SECRET: your-admin-secret
PORT: 5000
FRONTEND_URL: https://your-frontend-domain.com
NODE_ENV: production
```

#### Step 5: Deploy
- Click "Create Web Service"
- Render automatically deploys on git push
- Monitor logs in dashboard

**Your API URL:** `https://your-app-name.onrender.com/api`

### Option 2: Heroku

#### Step 1: Install Heroku CLI
```bash
npm install -g heroku
heroku login
```

#### Step 2: Create App
```bash
heroku create outpro-india-api
```

#### Step 3: Set Environment Variables
```bash
heroku config:set MONGODB_URI=your-connection-string
heroku config:set JWT_SECRET=your-secret
heroku config:set ADMIN_SECRET=your-admin-secret
heroku config:set NODE_ENV=production
```

#### Step 4: Deploy
```bash
git push heroku main
```

#### Step 5: Monitor
```bash
heroku logs --tail
heroku ps
```

### Option 3: AWS EC2

#### Step 1: Launch EC2 Instance
1. Go to AWS Console
2. Launch Ubuntu 20.04 LTS instance
3. Configure security groups (ports 22, 80, 443)

#### Step 2: Connect & Install
```bash
ssh -i key.pem ubuntu@your-instance-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB or use Atlas
# Install PM2 for process management
sudo npm install -g pm2
```

#### Step 3: Clone & Setup
```bash
git clone your-repo-url
cd BACKEND
npm install
```

#### Step 4: Create .env
```bash
nano .env
# Add all environment variables
```

#### Step 5: Start with PM2
```bash
pm2 start npm --name "outpro-api" -- start
pm2 startup
pm2 save
```

#### Step 6: Setup Nginx Reverse Proxy
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default

# Add:
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}

sudo nginx -t
sudo systemctl restart nginx
```

#### Step 7: Setup SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Frontend Deployment

### Option 1: Vercel (Recommended)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
cd frontend
vercel
```

#### Step 3: Configure
- Choose project name
- Set production domain
- Add environment variables

#### Step 4: Set Environment Variables
In Vercel dashboard:
```
REACT_APP_API_URL: https://your-api-domain.com/api
```

#### Step 5: GitHub Integration
- Link your GitHub repository
- Enable automatic deployments
- Redeploy on every push

**Your Frontend URL:** `https://your-app-name.vercel.app`

### Option 2: Netlify

#### Step 1: Connect Repository
1. Go to [netlify.com](https://netlify.com)
2. Click "Connect Git Repository"
3. Select your GitHub repo

#### Step 2: Configure
```
Build command: npm run build
Publish directory: build
```

#### Step 3: Set Environment Variables
In Netlify settings:
```
REACT_APP_API_URL: https://your-api-domain.com/api
```

#### Step 4: Deploy
- Netlify automatically builds and deploys
- Custom domain in settings
- Automatic SSL

### Option 3: GitHub Pages

#### Step 1: Update package.json
```json
{
  "homepage": "https://yourusername.github.io/repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

#### Step 2: Install gh-pages
```bash
npm install --save-dev gh-pages
```

#### Step 3: Deploy
```bash
npm run deploy
```

#### Step 4: GitHub Settings
- Go to repository settings
- Under Pages, select `gh-pages` branch
- Your site: `https://yourusername.github.io/repo-name`

### Option 4: Traditional Hosting

#### Step 1: Build
```bash
cd frontend
npm run build
```

#### Step 2: Upload
- FTP the `build/` folder to your hosting
- Configure SPA routing (all requests → index.html)

#### Step 3: .htaccess for Apache
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Database Deployment

### MongoDB Atlas Setup

#### Step 1: Create Account
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Sign up with email or Google
3. Create organization and project

#### Step 2: Create Cluster
1. Click "Create" under Databases
2. Choose Free Tier
3. Select region (choose closest to your users)
4. Create cluster (takes 1-3 minutes)

#### Step 3: Security
1. Go to "Security" → "Network Access"
2. Add IP Address
   - For development: Add your IP
   - For production: Add 0.0.0.0/0 (then add specific IPs later)

#### Step 4: Get Connection String
1. Click "Connect"
2. Choose "Drivers" (Node.js)
3. Copy connection string
4. Replace `<password>` with database password

#### Step 5: Use Connection String
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/outpro?retryWrites=true&w=majority
```

## Post-Deployment

### Monitoring Setup

#### 1. Error Tracking (Sentry)
```bash
npm install @sentry/node
```

In server.js:
```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.errorHandler());
```

#### 2. Application Monitoring
- Setup PM2 Plus for monitoring
- Use New Relic for APM
- CloudWatch for AWS

#### 3. Logging
- Use Winston for structured logging
- Send logs to ELK stack or LogRocket
- Setup alerts for errors

### Automated Backups

#### MongoDB Atlas
1. Go to Backup settings
2. Enable automatic daily backups
3. Set backup retention period

#### Application Backups
```bash
# Automated backup script
0 2 * * * /backup/backup.sh
```

### Security Hardening

#### 1. Update Dependencies
```bash
npm audit
npm audit fix
npm update
```

#### 2. Configure Firewalls
- Database: Allow only from API server
- API: Allow only from frontend
- SSH: Restrict to specific IPs

#### 3. Enable Rate Limiting
Already configured in server.js

#### 4. Setup WAF
- AWS WAF
- Cloudflare
- F5

#### 5. SSL/TLS
- Enable HTTPS everywhere
- Use TLS 1.2+
- Implement HSTS

## Performance Optimization

### Backend
```javascript
// Enable compression
const compression = require('compression');
app.use(compression());

// Cache headers
app.set('etag', false);
app.use((req, res, next) => {
  res.header('Cache-Control', 'public, max-age=300');
  next();
});
```

### Frontend
- Minify CSS/JS (automatic with build)
- Optimize images
- Use CDN for static files
- Enable gzip compression

### Database
- Create indexes on frequently queried fields
- Use pagination
- Archive old data

## Rollback Plan

If something goes wrong:

**Render/Vercel:**
1. Go to deployment history
2. Click "Redeploy" on previous version
3. Automatic rollback in seconds

**Manual Rollback:**
```bash
git revert <commit-hash>
git push
# Redeployment triggers automatically
```

## Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Review logs weekly
- [ ] Monitor performance daily
- [ ] Backup database daily
- [ ] Review security alerts
- [ ] Update SSL certificates

### Downtime Prevention
- Setup redundancy
- Use load balancers
- Configure auto-scaling
- Setup health checks
- Implement circuit breakers

## Cost Optimization

| Service | Free Tier | Paid Plans |
|---------|-----------|-----------|
| **Render** | Limited | $7+/month |
| **Vercel** | 100GB/month | $20+/month |
| **MongoDB Atlas** | 512MB database | Pay-as-you-go |
| **AWS EC2** | 12 months free | $20+/month |

## Support & Troubleshooting

**Application not starting:**
```bash
# Check logs
pm2 logs

# Verify environment variables
echo $NODE_ENV
```

**Database connection failing:**
```bash
# Test connection
mongosh "your-connection-string"
```

**High CPU/Memory:**
- Check for memory leaks
- Monitor database queries
- Enable caching
- Scale horizontally

## Next Steps

1. ✅ Deploy backend
2. ✅ Deploy frontend
3. ✅ Test all functionality
4. ✅ Setup monitoring
5. ✅ Configure backups
6. ✅ Setup DNS records
7. ✅ Enable analytics
8. ✅ Launch marketing

---

**Deployment Checklist Complete! 🎉**
