# Deployment Guide: Vercel (Frontend) + Render (Database)

This guide will walk you through deploying your Airecruiter application:
- **Frontend + API Routes**: Vercel (Next.js native platform)
- **Database**: Render PostgreSQL

## 📋 Prerequisites

1. **GitHub Account** (for connecting repositories)
2. **Vercel Account** (sign up at [vercel.com](https://vercel.com))
3. **Render Account** (sign up at [render.com](https://render.com))
4. **OpenAI API Key** (for AI screening features)
5. **Git Repository** (your code should be on GitHub, GitLab, or Bitbucket)

---

## 🗄️ Step 1: Set Up PostgreSQL Database on Render

### 1.1 Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure your database:
   - **Name**: `airecruiter-db` (or your preferred name)
   - **Database**: `airecruiter`
   - **User**: `airecruiter_user` (or auto-generated)
   - **Region**: Choose closest to your users
   - **Plan**: 
     - **Free** (for testing) - 90 days free trial
     - **Starter** ($7/month) - Recommended for production
     - **Standard** ($20/month) - For higher traffic

4. Click **"Create Database"**
5. Wait for the database to be provisioned (2-3 minutes)

### 1.2 Get Database Connection String

1. Once created, click on your database
2. Find the **"Internal Database URL"** or **"Connection Pooling"** section
3. Copy the **DATABASE_URL** - it looks like:
   ```
   postgresql://user:password@hostname:5432/database?sslmode=require
   ```
4. **Save this URL** - you'll need it for Vercel environment variables

### 1.3 Initialize Database Schema

You have two options:

#### Option A: Using Prisma Migrate (Recommended)

1. Create a migration file locally:
   ```bash
   npx prisma migrate dev --name init
   ```

2. Then deploy the migration:
   ```bash
   npx prisma migrate deploy
   ```

#### Option B: Using Prisma Push (Quick Setup)

1. Set your DATABASE_URL temporarily:
   ```bash
   # Windows PowerShell
   $env:DATABASE_URL="your_render_database_url_here"
   
   # Or create .env.local with:
   DATABASE_URL="your_render_database_url_here"
   ```

2. Push the schema:
   ```bash
   npm run prisma:push
   ```

3. Generate Prisma Client:
   ```bash
   npm run prisma:generate
   ```

---

## 🚀 Step 2: Deploy Frontend to Vercel

### 2.1 Prepare Your Repository

1. **Commit all changes** to your Git repository:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Verify these files exist**:
   - ✅ `vercel.json` (created for you)
   - ✅ `package.json` (with build scripts)
   - ✅ `next.config.ts`
   - ✅ `prisma/schema.prisma`

### 2.2 Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. **Import your Git repository**:
   - Select your Git provider (GitHub/GitLab/Bitbucket)
   - Authorize Vercel if needed
   - Select your repository (`Airecruiter`)
   - Click **"Import"**

### 2.3 Configure Project Settings

Vercel should auto-detect Next.js. Verify:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (root)
- **Build Command**: `npm run build` (or `prisma generate && next build`)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

### 2.4 Set Environment Variables

**Before deploying**, add these environment variables in Vercel:

1. In the project settings, go to **"Environment Variables"**
2. Add each variable:

   | Variable Name | Value | Environment |
   |--------------|-------|-------------|
   | `DATABASE_URL` | Your Render PostgreSQL URL | Production, Preview, Development |
   | `OPENAI_API_KEY` | Your OpenAI API key | Production, Preview, Development |
   | `GOVERNMENT_EMAIL` | Admin email (optional) | Production |
   | `GOVERNMENT_PASSWORD` | Admin password (optional) | Production |
   | `NODE_ENV` | `production` | Production |

   **Example DATABASE_URL:**
   ```
   postgresql://airecruiter_user:password@dpg-xxxxx-a.oregon-postgres.render.com:5432/airecruiter?sslmode=require
   ```

3. Click **"Save"** after adding each variable

### 2.5 Deploy

1. Click **"Deploy"** button
2. Vercel will:
   - Install dependencies
   - Run `prisma generate` (via postinstall script)
   - Build your Next.js app
   - Deploy to production

3. **Wait for build to complete** (usually 2-5 minutes)

### 2.6 Run Database Migrations

After first deployment, you need to run migrations:

**Option 1: Using Vercel CLI (Recommended)**

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login:
   ```bash
   vercel login
   ```

3. Link your project:
   ```bash
   vercel link
   ```

4. Run migration:
   ```bash
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

**Option 2: Using Render Shell**

1. Go to Render Dashboard → Your Database
2. Click **"Connect"** → **"Shell"**
3. Or use a local connection with your DATABASE_URL:
   ```bash
   DATABASE_URL="your_url" npx prisma migrate deploy
   ```

---

## ✅ Step 3: Verify Deployment

### 3.1 Check Vercel Deployment

1. Go to your Vercel project dashboard
2. Check the **"Deployments"** tab
3. Click on the latest deployment
4. Open the **"Visit"** link to see your live site

### 3.2 Test Your Application

1. **Test Frontend**: Visit your Vercel URL
2. **Test API Routes**: 
   - Try `/api/jobs` (should return jobs or empty array)
   - Try `/api/auth/signup` (test user creation)
3. **Test Database Connection**:
   - Sign up a new user
   - Check if data is saved in Render database

### 3.3 Check Logs

- **Vercel Logs**: Project → Deployments → Click deployment → "Functions" tab
- **Render Logs**: Database → "Logs" tab

---

## 🔧 Step 4: Post-Deployment Configuration

### 4.1 Update API Endpoints (if needed)

If your frontend makes API calls, ensure they use the production URL:

- **Vercel automatically provides**: `https://your-project.vercel.app`
- API routes are available at: `https://your-project.vercel.app/api/*`

### 4.2 Set Up Custom Domain (Optional)

1. In Vercel project → **"Settings"** → **"Domains"**
2. Add your custom domain
3. Follow DNS configuration instructions

### 4.3 Enable Connection Pooling (Recommended for Production)

1. In Render Dashboard → Your Database
2. Go to **"Connection Pooling"**
3. Enable **"Pool Mode"**
4. Use the **pooled connection URL** instead of the direct URL
5. Update `DATABASE_URL` in Vercel with the pooled URL

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**Error: Prisma Client not generated**
- ✅ Solution: The `postinstall` script in `package.json` should handle this
- Verify: Check build logs for "Running postinstall script"

**Error: Database connection failed**
- ✅ Check: DATABASE_URL is correctly set in Vercel
- ✅ Check: Database is running on Render
- ✅ Check: SSL mode is set (`?sslmode=require`)

**Error: OPENAI_API_KEY not found**
- ✅ Solution: Add `OPENAI_API_KEY` to Vercel environment variables

### Database Issues

**Error: Schema not found / Tables don't exist**
- ✅ Solution: Run `npx prisma migrate deploy` or `npx prisma db push`
- ✅ Verify: Check Render database logs

**Error: Connection timeout**
- ✅ Solution: Use connection pooling URL from Render
- ✅ Check: Database is not paused (free tier pauses after inactivity)

### API Routes Not Working

**Error: 500 Internal Server Error**
- ✅ Check: Vercel function logs
- ✅ Verify: Environment variables are set correctly
- ✅ Check: Database connection is working

---

## 📝 Environment Variables Summary

### Required for Production:

```env
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
OPENAI_API_KEY=sk-...
NODE_ENV=production
```

### Optional:

```env
GOVERNMENT_EMAIL=admin@government.gov
GOVERNMENT_PASSWORD=secure_password
```

---

## 🔄 Updating Your Deployment

### To Update Frontend:

1. Make changes to your code
2. Commit and push to Git:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```
3. Vercel will automatically redeploy

### To Update Database Schema:

1. Update `prisma/schema.prisma`
2. Create migration:
   ```bash
   npx prisma migrate dev --name update_schema
   ```
3. Deploy migration:
   ```bash
   DATABASE_URL="your_url" npx prisma migrate deploy
   ```
4. Or push directly:
   ```bash
   DATABASE_URL="your_url" npx prisma db push
   ```

---

## 📊 Monitoring & Maintenance

### Vercel Analytics

- Enable in Project → Settings → Analytics
- Monitor performance, errors, and usage

### Render Database

- Monitor in Render Dashboard → Database → Metrics
- Set up alerts for connection issues
- Regular backups (automatic on paid plans)

---

## 🎉 You're Done!

Your application should now be live at:
- **Frontend**: `https://your-project.vercel.app`
- **API**: `https://your-project.vercel.app/api/*`
- **Database**: Managed on Render

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render PostgreSQL Docs](https://render.com/docs/databases)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## ⚠️ Important Notes

1. **Free Tier Limitations**:
   - Render free database: 90 days trial, then pauses after inactivity
   - Vercel: Generous free tier, but check limits for your usage

2. **Security**:
   - Never commit `.env` files
   - Use strong passwords for database
   - Rotate API keys regularly

3. **Backups**:
   - Set up regular database backups (Render paid plans include this)
   - Export data periodically for safety

4. **Scaling**:
   - Monitor usage and upgrade plans as needed
   - Consider connection pooling for high traffic

---

**Need Help?** Check the troubleshooting section or review the logs in Vercel/Render dashboards.

