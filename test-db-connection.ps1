# Test Database Connection Script
# This script helps verify your database connection string

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Database Connection Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Load environment variables
if (Test-Path .env) {
    Write-Host "✓ Found .env file" -ForegroundColor Green
    Get-Content .env | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
        }
    }
} else {
    Write-Host "✗ .env file not found" -ForegroundColor Red
    exit 1
}

$dbUrl = $env:DATABASE_URL
if (-not $dbUrl) {
    Write-Host "✗ DATABASE_URL not found in .env" -ForegroundColor Red
    exit 1
}

Write-Host "DATABASE_URL found:" -ForegroundColor Yellow
Write-Host $dbUrl -ForegroundColor Gray
Write-Host ""

# Check connection string format
Write-Host "Checking connection string format..." -ForegroundColor Yellow

$issues = @()

if (-not ($dbUrl -match 'postgresql://')) {
    $issues += "Missing 'postgresql://' protocol"
}

if (-not ($dbUrl -match ':\d+/')) {
    $issues += "Missing port number (should be :5432)"
}

if (-not ($dbUrl -match '\.render\.com')) {
    $issues += "Hostname might be incomplete (should include .render.com domain)"
}

if (-not ($dbUrl -match '\?sslmode=')) {
    $issues += "Missing SSL mode parameter (should end with ?sslmode=require)"
}

if ($issues.Count -eq 0) {
    Write-Host "✓ Connection string format looks correct" -ForegroundColor Green
} else {
    Write-Host "✗ Connection string issues found:" -ForegroundColor Red
    foreach ($issue in $issues) {
        Write-Host "  - $issue" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Please update your DATABASE_URL in .env file" -ForegroundColor Yellow
    Write-Host "Get the correct URL from Render Dashboard → Your Database → Connections" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Testing Prisma connection..." -ForegroundColor Yellow
Write-Host ""

# Test with Prisma
try {
    npm run prisma:generate
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Prisma Client generated successfully" -ForegroundColor Green
        Write-Host ""
        Write-Host "Attempting to connect to database..." -ForegroundColor Yellow
        npx prisma db pull --force
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✓✓✓ Database connection successful! ✓✓✓" -ForegroundColor Green
            Write-Host ""
            Write-Host "You can now run: npm run prisma:push" -ForegroundColor Cyan
        } else {
            Write-Host ""
            Write-Host "✗ Database connection failed" -ForegroundColor Red
            Write-Host ""
            Write-Host "Troubleshooting steps:" -ForegroundColor Yellow
            Write-Host "1. Check if database is running in Render Dashboard" -ForegroundColor White
            Write-Host "2. If paused, click 'Resume' in Render Dashboard" -ForegroundColor White
            Write-Host "3. Verify DATABASE_URL is correct (get from Render Dashboard)" -ForegroundColor White
            Write-Host "4. Check Render database logs for errors" -ForegroundColor White
        }
    } else {
        Write-Host "✗ Failed to generate Prisma Client" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Error: $_" -ForegroundColor Red
}

