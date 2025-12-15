// Job Service - Handles job operations with PostgreSQL database
// This service manages all job-related operations using Prisma

import { prisma } from "@/lib/prisma";

export interface Job {
  id: string;
  title: string;
  description: string;
  companyId: string;
  companyName: string;
  location: string;
  city?: string;
  region?: string;
  country?: string;
  salary?: string;
  salaryType?: "Monthly" | "Annual" | "Hourly";
  type: "Full Time" | "Part Time" | "Contract" | "Internship";
  requirements?: string;
  education?: string;
  experience?: string;
  vacancies: number;
  category?: string;
  postedDate: string;
  deadline?: string;
  isActive: boolean;
  status: "active" | "closed" | "draft";
  createdAt: string;
  updatedAt: string;
}

// Default categories and regions (can be stored in database later)
const DEFAULT_CATEGORIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Engineering",
  "Marketing",
  "Sales",
  "Human Resources",
  "Operations",
  "Other",
];

const DEFAULT_REGIONS = [
  "Addis Ababa",
  "Dire Dawa",
  "Mekelle",
  "Gondar",
  "Awassa",
  "Bahir Dar",
  "Dessie",
  "Jimma",
  "Jijiga",
  "Shashamane",
  "Other",
];

// Helper function to convert Prisma Job to Job interface
function prismaJobToJob(prismaJob: any): Job {
  return {
    id: prismaJob.id,
    title: prismaJob.title,
    description: prismaJob.description,
    companyId: prismaJob.companyId,
    companyName: prismaJob.companyName || prismaJob.company?.fullName || "Company",
    location: prismaJob.location,
    city: prismaJob.city || undefined,
    region: prismaJob.region || undefined,
    country: prismaJob.country || undefined,
    salary: prismaJob.salary || undefined,
    salaryType: prismaJob.salaryType as "Monthly" | "Annual" | "Hourly" | undefined,
    type: prismaJob.type as "Full Time" | "Part Time" | "Contract" | "Internship",
    requirements: prismaJob.requirements || undefined,
    education: prismaJob.education || undefined,
    experience: prismaJob.experience || undefined,
    vacancies: prismaJob.vacancies,
    category: prismaJob.category || undefined,
    postedDate: prismaJob.postedDate.toISOString(),
    deadline: prismaJob.deadline?.toISOString() || undefined,
    isActive: prismaJob.isActive,
    status: prismaJob.isActive ? "active" : "closed" as "active" | "closed" | "draft",
    createdAt: prismaJob.createdAt.toISOString(),
    updatedAt: prismaJob.updatedAt.toISOString(),
  };
}

// Job Service Functions
export const jobService = {
  // Get all jobs
  async getAllJobs(): Promise<Job[]> {
    try {
      const jobs = await prisma.job.findMany({
        include: {
          company: {
            select: {
              fullName: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return jobs.map(prismaJobToJob);
    } catch (error) {
      console.error("Error reading jobs from database:", error);
      return [];
    }
  },

  // Get jobs by company ID
  async getJobsByCompany(companyId: string): Promise<Job[]> {
    try {
      const jobs = await prisma.job.findMany({
        where: { companyId },
        include: {
          company: {
            select: {
              fullName: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return jobs.map(prismaJobToJob);
    } catch (error) {
      console.error("Error reading jobs by company:", error);
      return [];
    }
  },

  // Get active jobs
  async getActiveJobs(): Promise<Job[]> {
    try {
      const jobs = await prisma.job.findMany({
        where: { isActive: true },
        include: {
          company: {
            select: {
              fullName: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return jobs.map(prismaJobToJob);
    } catch (error) {
      console.error("Error reading active jobs:", error);
      return [];
    }
  },

  // Get job by ID
  async getJobById(jobId: string): Promise<Job | null> {
    try {
      const job = await prisma.job.findUnique({
        where: { id: jobId },
        include: {
          company: {
            select: {
              fullName: true,
            },
          },
        },
      });
      return job ? prismaJobToJob(job) : null;
    } catch (error) {
      console.error("Error reading job by ID:", error);
      return null;
    }
  },

  // Create new job
  async createJob(jobData: Omit<Job, "id" | "postedDate" | "createdAt" | "updatedAt">): Promise<Job> {
    try {
      const newJob = await prisma.job.create({
        data: {
          title: jobData.title,
          description: jobData.description,
          companyId: jobData.companyId,
          companyName: jobData.companyName,
          location: jobData.location,
          city: jobData.city || null,
          region: jobData.region || null,
          country: jobData.country || null,
          salary: jobData.salary || null,
          salaryType: jobData.salaryType || null,
          type: jobData.type,
          requirements: jobData.requirements || null,
          education: jobData.education || null,
          experience: jobData.experience || null,
          vacancies: jobData.vacancies,
          category: jobData.category || null,
          deadline: jobData.deadline ? new Date(jobData.deadline) : null,
          isActive: jobData.status === "active",
          postedDate: new Date(),
        },
        include: {
          company: {
            select: {
              fullName: true,
            },
          },
        },
      });
      return prismaJobToJob(newJob);
    } catch (error) {
      console.error("Error creating job:", error);
      throw error;
    }
  },

  // Update job
  async updateJob(jobId: string, updates: Partial<Job>): Promise<Job | null> {
    try {
      const updateData: any = {};
      
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.companyName !== undefined) updateData.companyName = updates.companyName;
      if (updates.location !== undefined) updateData.location = updates.location;
      if (updates.city !== undefined) updateData.city = updates.city || null;
      if (updates.region !== undefined) updateData.region = updates.region || null;
      if (updates.country !== undefined) updateData.country = updates.country || null;
      if (updates.salary !== undefined) updateData.salary = updates.salary || null;
      if (updates.salaryType !== undefined) updateData.salaryType = updates.salaryType || null;
      if (updates.type !== undefined) updateData.type = updates.type;
      if (updates.requirements !== undefined) updateData.requirements = updates.requirements || null;
      if (updates.education !== undefined) updateData.education = updates.education || null;
      if (updates.experience !== undefined) updateData.experience = updates.experience || null;
      if (updates.vacancies !== undefined) updateData.vacancies = updates.vacancies;
      if (updates.category !== undefined) updateData.category = updates.category || null;
      if (updates.deadline !== undefined) updateData.deadline = updates.deadline ? new Date(updates.deadline) : null;
      if (updates.status !== undefined) updateData.isActive = updates.status === "active";

      const updatedJob = await prisma.job.update({
        where: { id: jobId },
        data: updateData,
        include: {
          company: {
            select: {
              fullName: true,
            },
          },
        },
      });
      return prismaJobToJob(updatedJob);
    } catch (error) {
      console.error("Error updating job:", error);
      return null;
    }
  },

  // Delete job
  async deleteJob(jobId: string): Promise<boolean> {
    try {
      await prisma.job.delete({
        where: { id: jobId },
      });
      return true;
    } catch (error) {
      console.error("Error deleting job:", error);
      return false;
    }
  },

  // Search jobs
  async searchJobs(query: string, filters?: {
    category?: string;
    location?: string;
    type?: string;
    status?: string;
  }): Promise<Job[]> {
    try {
      const where: any = {};

      // Apply filters
      if (filters?.category) {
        where.category = filters.category;
      }
      if (filters?.type) {
        where.type = filters.type;
      }
      if (filters?.status === "active") {
        where.isActive = true;
      } else if (filters?.status === "closed") {
        where.isActive = false;
      }

      // Apply location filter
      if (filters?.location) {
        const locationLower = filters.location.toLowerCase();
        where.OR = [
          { location: { contains: locationLower, mode: "insensitive" } },
          { city: { contains: locationLower, mode: "insensitive" } },
          { region: { contains: locationLower, mode: "insensitive" } },
          { country: { contains: locationLower, mode: "insensitive" } },
        ];
      }

      // Apply search query
      if (query) {
        where.OR = [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { companyName: { contains: query, mode: "insensitive" } },
          { location: { contains: query, mode: "insensitive" } },
        ];
      }

      const jobs = await prisma.job.findMany({
        where,
        include: {
          company: {
            select: {
              fullName: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return jobs.map(prismaJobToJob);
    } catch (error) {
      console.error("Error searching jobs:", error);
      return [];
    }
  },

  // Get categories (for now, return defaults - can be stored in DB later)
  getCategories(): string[] {
    return DEFAULT_CATEGORIES;
  },

  // Get regions (for now, return defaults - can be stored in DB later)
  getRegions(): string[] {
    return DEFAULT_REGIONS;
  },
};
