import { NextRequest, NextResponse } from "next/server";
import { jobService } from "@/lib/services/jobService";
import { jobPostingSchema, jobUpdateSchema, jobSearchSchema } from "@/lib/validators/job-validators";
import { prisma } from "@/lib/prisma";

// GET - Get jobs (with optional filtering)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Check if it's a company-specific request
    const companyId = searchParams.get("companyId");
    const jobId = searchParams.get("id");
    
    if (jobId) {
      // Get single job by ID
      const job = await jobService.getJobById(jobId);
      if (!job) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 });
      }
      return NextResponse.json({ job }, { status: 200 });
    }
    
    if (companyId) {
      // Get all jobs for a specific company
      const jobs = await jobService.getJobsByCompany(companyId);
      return NextResponse.json({ jobs }, { status: 200 });
    }
    
    // Get jobs with filters
    const filters = {
      query: searchParams.get("query") || undefined,
      category: searchParams.get("category") || undefined,
      location: searchParams.get("location") || undefined,
      type: searchParams.get("type") || undefined,
      status: searchParams.get("status") || undefined,
    };
    
    const validatedFilters = jobSearchSchema.parse(filters);
    const jobs = await jobService.searchJobs(
      validatedFilters.query || "",
      {
        category: validatedFilters.category,
        location: validatedFilters.location,
        type: validatedFilters.type,
        status: validatedFilters.status,
      }
    );
    
    // Return only active jobs for public listing (unless status filter is specified)
    const activeJobs = validatedFilters.status 
      ? jobs 
      : jobs.filter((job) => job.status === "active" && job.isActive);
    
    return NextResponse.json({ jobs: activeJobs, total: activeJobs.length }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching jobs:", error);
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// POST - Create new job
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await request.json();
    const validatedData = jobPostingSchema.parse(body);
    
    // Get company name from user profile
    let companyName = body.companyName || "Company";
    try {
      const companyProfile = await prisma.companyProfile.findUnique({
        where: { userId },
        select: { companyName: true },
      });
      if (companyProfile) {
        companyName = companyProfile.companyName;
      }
    } catch (error) {
      console.error("Error fetching company profile:", error);
    }
    
    // Create job using jobService (saves to database)
    const newJob = await jobService.createJob({
      ...validatedData,
      companyId: userId,
      companyName,
      isActive: validatedData.status === "active",
      status: validatedData.status || "active",
    });
    
    return NextResponse.json({ job: newJob }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating job:", error);
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

// PATCH - Update job
export async function PATCH(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }
    
    // Verify job belongs to user
    const existingJob = await jobService.getJobById(id);
    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    
    if (existingJob.companyId !== userId) {
      return NextResponse.json({ error: "Unauthorized to update this job" }, { status: 403 });
    }
    
    const validatedData = jobUpdateSchema.parse(updates);
    const updatedJob = await jobService.updateJob(id, validatedData);
    
    if (!updatedJob) {
      return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
    }
    
    return NextResponse.json({ job: updatedJob }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating job:", error);
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

// DELETE - Delete job
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("id");
    
    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }
    
    // Verify job belongs to user
    const existingJob = await jobService.getJobById(jobId);
    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    
    if (existingJob.companyId !== userId) {
      return NextResponse.json({ error: "Unauthorized to delete this job" }, { status: 403 });
    }
    
    const deleted = await jobService.deleteJob(jobId);
    
    if (!deleted) {
      return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
    }
    
    return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}

