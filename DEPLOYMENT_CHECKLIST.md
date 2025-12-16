# 🚀 Quick Deployment Checklist

Use this checklist to ensure you complete all deployment steps correctly.

## Pre-Deployment

- [ ] Code is committed and pushed to Git repository
- [ ] All environment variables are documented
- [ ] Database schema is finalized in `prisma/schema.prisma`
- [ ] OpenAI API key is ready
- [ ] Accounts created: Vercel, Render

## Step 1: Render Database Setup

- [ ] Created PostgreSQL database on Render
- [ ] Copied DATABASE_URL connection string
- [ ] Database is running and accessible
- [ ] (Optional) Enabled connection pooling

## Step 2: Initialize Database

- [ ] Set DATABASE_URL locally (temporarily)
- [ ] Ran `npx prisma generate`
- [ ] Ran `npx prisma db push` or `npx prisma migrate deploy`
- [ ] Verified tables are created in Render database

## Step 3: Vercel Deployment

- [ ] Connected Git repository to Vercel
- [ ] Verified framework detection (Next.js)
- [ ] Added environment variables in Vercel:
  - [ ] `DATABASE_URL` (from Render)
  - [ ] `OPENAI_API_KEY`
  - [ ] `NODE_ENV=production`
  - [ ] (Optional) `GOVERNMENT_EMAIL`
  - [ ] (Optional) `GOVERNMENT_PASSWORD`
- [ ] Triggered deployment
- [ ] Build completed successfully

## Step 4: Post-Deployment

- [ ] Verified deployment is live
- [ ] Tested frontend loads correctly
- [ ] Tested API endpoints (e.g., `/api/jobs`)
- [ ] Tested user signup/login
- [ ] Verified database connection (data is saved)
- [ ] Checked Vercel logs for errors
- [ ] Checked Render database logs

## Step 5: Final Verification

- [ ] Application is accessible via Vercel URL
- [ ] All features work as expected
- [ ] Database queries are working
- [ ] AI screening features work (if using)
- [ ] No errors in browser console
- [ ] No errors in Vercel function logs

## Optional Enhancements

- [ ] Set up custom domain
- [ ] Enabled Vercel Analytics
- [ ] Set up database backups
- [ ] Configured connection pooling
- [ ] Set up monitoring/alerts
- [ ] Updated documentation with production URLs

---

## Quick Commands Reference

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Deploy migrations
npm run prisma:migrate

# Local build test
npm run build

# Check environment variables
vercel env ls
```

---

**Status**: ⬜ Not Started | 🟡 In Progress | ✅ Complete

