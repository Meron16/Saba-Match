# Fix Database Connection Error

## Error: P1001: Can't reach database server

This error occurs when Prisma cannot connect to your Render PostgreSQL database.

## Quick Fix Steps

### Step 1: Check if Database is Running on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Find your PostgreSQL database (`airecruiter-db` or similar)
3. Check the status:
   - ✅ **Green/Running**: Database is active
   - ⏸️ **Paused**: Database is sleeping (free tier)
   - ❌ **Stopped**: Database is down

### Step 2: Wake Up Database (if paused)

If your database is paused:
1. Click on your database in Render Dashboard
2. Click **"Resume"** or **"Wake"** button
3. Wait 30-60 seconds for it to start
4. Status should change to "Running"

### Step 3: Verify Connection String

1. In Render Dashboard → Your Database
2. Go to **"Info"** or **"Connections"** tab
3. Find **"Internal Database URL"** or **"Connection String"**
4. It should look like:
   ```
   postgresql://user:password@dpg-xxxxx-a.oregon-postgres.render.com:5432/database_name?sslmode=require
   ```
5. **Important**: Make sure it includes the full hostname (`.oregon-postgres.render.com` or similar)

### Step 4: Update Your .env File

1. Copy the **complete** connection string from Render
2. Update your `.env` file (or `.env.local`):
   ```env
   DATABASE_URL="postgresql://user:password@dpg-xxxxx-a.oregon-postgres.render.com:5432/database_name?sslmode=require"
   ```
3. **Make sure**:
   - The URL is in quotes
   - It includes `?sslmode=require` at the end
   - No extra spaces or line breaks

### Step 5: Test Connection

Run these commands in order:

```powershell
# 1. Generate Prisma Client
npm run prisma:generate

# 2. Test connection (this will show if connection works)
npx prisma db pull

# 3. If connection works, push schema
npm run prisma:push
```

## Alternative: Use Connection Pooling URL

Render provides a connection pooling URL that's more reliable:

1. In Render Dashboard → Your Database
2. Go to **"Connection Pooling"** section
3. Copy the **"Pool Mode"** connection string
4. Use this URL instead of the direct connection string
5. Update your `.env` file with the pooled URL

## Common Issues & Solutions

### Issue 1: Database is Paused
**Solution**: Resume the database in Render Dashboard

### Issue 2: Wrong Connection String Format
**Solution**: Make sure you're using the **Internal Database URL** from Render, not the external one

### Issue 3: Missing SSL Mode
**Solution**: Add `?sslmode=require` to the end of your DATABASE_URL

### Issue 4: Firewall/Network Issues
**Solution**: 
- Try using the connection pooling URL
- Check if your network allows PostgreSQL connections (port 5432)
- Try from a different network

### Issue 5: Database Name Mismatch
**Solution**: Verify the database name in the connection string matches the actual database name in Render

## Verify Connection String Format

Your DATABASE_URL should follow this format:
```
postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?sslmode=require
```

Example:
```
postgresql://airecruiter_user:abc123@dpg-d50fq3u3jp1c73a3rgjg-a.oregon-postgres.render.com:5432/airecruiter_2nrq?sslmode=require
```

## Next Steps After Fixing

Once the connection works:

1. ✅ Run `npm run prisma:push` to create tables
2. ✅ Verify tables are created in Render database
3. ✅ Proceed with Vercel deployment
4. ✅ Add DATABASE_URL to Vercel environment variables

