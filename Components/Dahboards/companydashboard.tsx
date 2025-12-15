"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { JobPostingForm, JobListing, Job } from "@/modules/jobs";
import { ScreeningResults } from "@/modules/ai-screening";
import type { CandidateScore } from "@/lib/ai/types";
import { useI18n } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/Components/ui/language-switcher";
import PaymentSubscription from "@/Components/Company/PaymentSubscription";
import VerificationSystem from "@/Components/Company/VerificationSystem";
import {
  BriefcaseIcon,
  Users,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  SearchIcon,
  LogOut,
  Building2,
  User,
  Settings,
  Shield,
  CreditCard,
  FileText,
  RefreshCw,
} from "lucide-react";

// ============================================================
// DATA TYPES & INTERFACES
// ============================================================
interface Application {
  id: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  appliedDate: string;
  status: "pending" | "reviewing" | "accepted" | "rejected";
}

// Applications will be loaded from database via API

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function CompanyDashboard() {
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"jobs" | "applications" | "screening" | "payment" | "verification">("jobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedJobForScreening, setSelectedJobForScreening] = useState<string>("");
  const [screeningResults, setScreeningResults] = useState<CandidateScore[]>([]);
  const [isScreening, setIsScreening] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<"FREE" | "BASIC" | "PREMIUM" | "ENTERPRISE">("FREE");
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);

  // Load jobs from database via API on mount
  useEffect(() => {
    loadJobs();
    loadApplications();
  }, [user]);

  const loadJobs = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/jobs?companyId=${user.id}`, {
        headers: {
          "x-user-id": user.id,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || []);
        // Auto-select first job for screening if available
        if (data.jobs && data.jobs.length > 0 && !selectedJobForScreening) {
          setSelectedJobForScreening(data.jobs[0].id);
        }
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadApplications = async () => {
    if (!user?.id || jobs.length === 0) {
      setIsLoadingApplications(false);
      return;
    }
    
    setIsLoadingApplications(true);
    try {
      // Fetch applications for all company jobs
      const allApplications: Application[] = [];
      
      for (const job of jobs) {
        const response = await fetch(`/api/applications?jobId=${job.id}`, {
          headers: {
            "x-user-id": user.id,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.applications) {
            const jobApplications = data.applications.map((app: any) => ({
              id: app.id,
              jobTitle: app.job?.title || job.title,
              applicantName: app.applicant?.fullName || "Unknown",
              applicantEmail: app.applicant?.email || "",
              appliedDate: app.appliedAt,
              status: app.status.toLowerCase() as "pending" | "reviewing" | "accepted" | "rejected",
            }));
            allApplications.push(...jobApplications);
          }
        }
      }
      
      setApplications(allApplications);
    } catch (error) {
      console.error("Error loading applications:", error);
    } finally {
      setIsLoadingApplications(false);
    }
  };

  // Reload applications when jobs change
  useEffect(() => {
    if (jobs.length > 0) {
      loadApplications();
    }
  }, [jobs.length]);

  // Auto-screen applications when screening tab is selected
  useEffect(() => {
    if (selectedTab === "screening" && selectedJobForScreening && !isScreening) {
      screenApplicationsForJob(selectedJobForScreening);
    }
  }, [selectedTab, selectedJobForScreening]);

  const screenApplicationsForJob = async (jobId: string) => {
    setIsScreening(true);
    try {
      const response = await fetch("/api/ai/screen", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user?.id || "",
        },
        body: JSON.stringify({ jobId }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.rankings && data.rankings.length > 0) {
          setScreeningResults(data.rankings);
        } else {
          // No applications found for this job
          setScreeningResults([]);
        }
      } else {
        // If request fails (no applications), use test mode for demonstration
        const testResponse = await fetch("/api/ai/screen?test=true");
        if (testResponse.ok) {
          const testData = await testResponse.json();
          setScreeningResults(testData.rankings || []);
        } else {
          console.error("Failed to screen applications");
        }
      }
    } catch (error) {
      console.error("Error screening applications:", error);
      // Fallback to test data for demonstration
      try {
        const testResponse = await fetch("/api/ai/screen?test=true");
        if (testResponse.ok) {
          const testData = await testResponse.json();
          setScreeningResults(testData.rankings || []);
        }
      } catch (testError) {
        console.error("Error loading test data:", testError);
      }
    } finally {
      setIsScreening(false);
    }
  };

  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewing":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <ClockIcon className="w-4 h-4" />;
      case "reviewing":
        return <ClockIcon className="w-4 h-4" />;
      case "accepted":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "rejected":
        return <XCircleIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      const response = await fetch(`/api/jobs?id=${jobId}`, {
        method: "DELETE",
        headers: {
          "x-user-id": user?.id || "",
        },
      });

      if (response.ok) {
        loadJobs();
        alert("Job deleted successfully!");
      } else {
        alert("Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    }
  };

  const handleToggleJobStatus = async (jobId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/jobs", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user?.id || "",
        },
        body: JSON.stringify({
          id: jobId,
          status: newStatus,
        }),
      });

      if (response.ok) {
        loadJobs();
      } else {
        alert("Failed to update job status");
      }
    } catch (error) {
      console.error("Error updating job status:", error);
      alert("Failed to update job status");
    }
  };

  const handleJobFormSuccess = (newJobId?: string) => {
    // Force refresh after a small delay to ensure localStorage is updated
    setTimeout(() => {
      loadJobs();
      // If a new job was created, select it for screening
      if (newJobId) {
        setSelectedJobForScreening(newJobId);
      }
    }, 100);
    setShowJobForm(false);
    setEditingJob(null);
  };

  const handleJobFormClose = () => {
    setShowJobForm(false);
    setEditingJob(null);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && job.status === "active" && job.isActive) ||
      (statusFilter === "draft" && job.status === "draft") ||
      (statusFilter === "closed" && (job.status === "closed" || !job.isActive));

    return matchesSearch && matchesStatus;
  });

  const filteredApplications = applications.filter(
    (app) =>
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userInitials =
    user?.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "CO";

  // Calculate stats
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((j) => j.status === "active" && j.isActive).length;
  const draftJobs = jobs.filter((j) => j.status === "draft").length;
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(
    (app) => app.status === "pending" || app.status === "reviewing"
  ).length;
  const acceptedApplications = applications.filter(
    (app) => app.status === "accepted"
  ).length;

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ======== DASHBOARD HEADER ======== */}
      <div className="bg-white border-b border-gray-200 px-6 md:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-black">{t.dashboard.welcome} - {t.roles.company} Dashboard</h1>
              <LanguageSwitcher />
            </div>
            <p className="text-gray-600 mt-1">
              {t.dashboard.postedJobs} and {t.dashboard.applications} management
            </p>
          </div>

          {/* PROFILE SECTION - TOP RIGHT */}
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5 py-2 font-medium">
                <User className="w-4 h-4 mr-2" />
                {t.nav.profile}
              </Button>
            </Link>
            <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 px-4 py-2">
              <div className="text-right">
                <p className="text-sm font-semibold text-black">
                  {user?.fullName || "Company"}
                </p>
                <p className="text-xs text-gray-600">Company Account</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                {userInitials}
              </div>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
                {t.nav.logout}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* ======== PROFILE QUICK ACCESS CARD ======== */}
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Building2 className="w-8 h-8 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Manage Your Company Profile
                  </h3>
                  <p className="text-sm text-gray-600">
                    Update company info, verification status, and subscription
                  </p>
                </div>
              </div>
              <Link href="/profile">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 font-semibold shadow-lg">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Profile
                </Button>
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-orange-200">
              <button
                onClick={() => setSelectedTab("verification")}
                className="text-center hover:bg-orange-50 p-2 rounded-lg transition"
              >
                <Shield className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">
                  Verification
                </p>
                <p className="text-xs text-gray-600">Get verified</p>
              </button>
              <button
                onClick={() => setSelectedTab("payment")}
                className="text-center hover:bg-orange-50 p-2 rounded-lg transition"
              >
                <CreditCard className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">
                  Subscription
                </p>
                <p className="text-xs text-gray-600">Manage plan</p>
              </button>
              <Link href="/profile" className="text-center hover:bg-orange-50 p-2 rounded-lg transition">
                <FileText className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Documents</p>
                <p className="text-xs text-gray-600">Upload docs</p>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* ======== STATS CARDS ======== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Jobs</p>
                  <p className="text-2xl font-bold text-black">{totalJobs}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activeJobs} active
                  </p>
                </div>
                <BriefcaseIcon className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {t.applications.title} {t.common.all}
                  </p>
                  <p className="text-2xl font-bold text-black">
                    {totalApplications}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t.applications.pending} applications</p>
                  <p className="text-2xl font-bold text-black">
                    {pendingApplications}
                  </p>
                </div>
                <ClockIcon className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{t.applications.accepted}</p>
                  <p className="text-2xl font-bold text-black">
                    {acceptedApplications}
                  </p>
                </div>
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ======== TABS ======== */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4 border-b border-gray-200 overflow-x-auto">
              <button
                onClick={() => setSelectedTab("jobs")}
                className={`pb-3 px-4 text-sm font-medium transition whitespace-nowrap ${
                  selectedTab === "jobs"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {t.dashboard.postedJobs}
              </button>
              <button
                onClick={() => setSelectedTab("applications")}
                className={`pb-3 px-4 text-sm font-medium transition whitespace-nowrap ${
                  selectedTab === "applications"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {t.dashboard.applications}
              </button>
              <button
                onClick={() => setSelectedTab("screening")}
                className={`pb-3 px-4 text-sm font-medium transition whitespace-nowrap ${
                  selectedTab === "screening"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {t.dashboard.aiScreening}
              </button>
              <button
                onClick={() => setSelectedTab("payment")}
                className={`pb-3 px-4 text-sm font-medium transition whitespace-nowrap ${
                  selectedTab === "payment"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <CreditCard className="w-4 h-4 inline mr-1" />
                Subscription
              </button>
              <button
                onClick={() => setSelectedTab("verification")}
                className={`pb-3 px-4 text-sm font-medium transition whitespace-nowrap ${
                  selectedTab === "verification"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <Shield className="w-4 h-4 inline mr-1" />
                Verification
              </button>
            </div>
            <Button
              onClick={() => {
                setEditingJob(null);
                setShowJobForm(true);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t.jobs.postNewJob}
            </Button>
          </div>

          {/* SEARCH BAR */}
          <div className="mb-6 relative">
            <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={
                selectedTab === "jobs"
                  ? "Search jobs..."
                  : "Search applications..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Status Filter for Jobs Tab */}
          {selectedTab === "jobs" && (
            <div className="mb-6 flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
                className={statusFilter === "all" ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                {t.common.all} ({totalJobs})
              </Button>
              <Button
                variant={statusFilter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("active")}
                className={statusFilter === "active" ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {t.jobs.active} ({activeJobs})
              </Button>
              <Button
                variant={statusFilter === "draft" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("draft")}
                className={statusFilter === "draft" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
              >
                {t.jobs.draft} ({draftJobs})
              </Button>
              <Button
                variant={statusFilter === "closed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("closed")}
                className={statusFilter === "closed" ? "bg-gray-500 hover:bg-gray-600" : ""}
              >
                {t.jobs.closed} ({totalJobs - activeJobs - draftJobs})
              </Button>
            </div>
          )}

          {/* JOBS TAB */}
          {selectedTab === "jobs" && (
            <div>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">{t.common.loading} {t.jobs.title.toLowerCase()}...</p>
                </div>
              ) : (
                <JobListing
                  jobs={filteredJobs}
                  onEdit={handleEditJob}
                  onDelete={handleDeleteJob}
                  onToggleStatus={handleToggleJobStatus}
                  showActions={true}
                />
              )}
            </div>
          )}

          {/* APPLICATIONS TAB */}
          {selectedTab === "applications" && (
            <div className="space-y-4">
              {isLoadingApplications ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading applications...</p>
                    </div>
                  </CardContent>
                </Card>
              ) : filteredApplications.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg mb-2">No applications found</p>
                      <p className="text-gray-500 text-sm">
                        Applications will appear here when candidates apply to your jobs
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filteredApplications.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-black mb-1">
                          {app.jobTitle}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-semibold">{app.applicantName}</span> •{" "}
                          {app.applicantEmail}
                        </p>
                        <p className="text-xs text-gray-500">
                          Applied{" "}
                          {new Date(app.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={`flex items-center gap-1 ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {getStatusIcon(app.status)}
                          <span className="capitalize">{app.status}</span>
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" className="text-sm" size="sm">
                            View CV
                          </Button>
                          <Button
                            className="bg-orange-500 hover:bg-orange-600 text-white text-sm"
                            size="sm"
                          >
                            Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                ))
              )}
            </div>
          )}

          {/* AI SCREENING TAB */}
          {selectedTab === "screening" && (
            <div>
              {filteredJobs.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <BriefcaseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg mb-2">No {t.jobs.title} available</p>
                      <p className="text-gray-500 text-sm">
                        {t.jobs.postNewJob} to view {t.screening.title} {t.dashboard.candidates}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {/* Job Selection Dropdown */}
                  {filteredJobs.length > 0 && (
                    <Card>
                      <CardContent className="pt-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t.screening.selectJob}
                        </label>
                        <select
                          value={selectedJobForScreening}
                          onChange={(e) => {
                            setSelectedJobForScreening(e.target.value);
                            screenApplicationsForJob(e.target.value);
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="">Select a job...</option>
                          {filteredJobs.map((job) => (
                            <option key={job.id} value={job.id}>
                              {job.title} - {job.location} ({job.status})
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-2">
                          Select a job to view AI-ranked candidates and match scores
                        </p>
                      </CardContent>
                    </Card>
                  )}
                  
                  {/* AI Screening Results */}
                  {selectedJobForScreening && (
                    <div>
                      {isScreening ? (
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center py-12">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                              <p className="text-gray-600">Screening candidates with AI...</p>
                              <p className="text-sm text-gray-500 mt-2">Analyzing skills, experience, and qualifications</p>
                            </div>
                          </CardContent>
                        </Card>
                      ) : screeningResults.length > 0 ? (
                        <div>
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-black">
                              {t.screening.title} {t.dashboard.candidates}
                            </h3>
                            <Button
                              onClick={() => screenApplicationsForJob(selectedJobForScreening)}
                              variant="outline"
                              size="sm"
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              {t.screening.refreshRankings}
                            </Button>
                          </div>
                          <ScreeningResults 
                            jobId={selectedJobForScreening} 
                            onRefresh={() => screenApplicationsForJob(selectedJobForScreening)}
                            preloadedRankings={screeningResults}
                            preloadedStats={screeningResults.length > 0 ? {
                              totalCandidates: screeningResults.length,
                              averageScore: Math.round(screeningResults.reduce((sum, r) => sum + r.overallScore, 0) / screeningResults.length),
                              topScore: Math.max(...screeningResults.map(r => r.overallScore)),
                              lowestScore: Math.min(...screeningResults.map(r => r.overallScore))
                            } : undefined}
                          />
                        </div>
                      ) : (
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center py-12">
                              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-600 text-lg mb-2">{t.screening.noCandidates}</p>
                              <p className="text-gray-500 text-sm mb-4">
                                {t.applications.title} and {t.screening.title}
                              </p>
                              <Button
                                onClick={() => screenApplicationsForJob(selectedJobForScreening)}
                                className="bg-orange-500 hover:bg-orange-600 text-white"
                              >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                {t.screening.screenAll}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}
                  
                  {/* Show test results if no job selected (for demo) */}
                  {!selectedJobForScreening && filteredJobs.length === 0 && (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center py-12">
                          <BriefcaseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 text-lg mb-2">No {t.jobs.title} available</p>
                          <p className="text-gray-500 text-sm mb-4">
                            {t.jobs.postNewJob} to view {t.screening.title} {t.dashboard.candidates}
                          </p>
                          <Button
                            onClick={() => {
                              setEditingJob(null);
                              setShowJobForm(true);
                            }}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            {t.jobs.postNewJob}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          )}

          {/* PAYMENT/SUBSCRIPTION TAB */}
          {selectedTab === "payment" && (
            <div>
              <PaymentSubscription
                currentPlan={currentSubscription}
                onPlanSelect={(planId) => {
                  // Frontend only - update local state
                  const planMap: Record<string, "FREE" | "BASIC" | "PREMIUM" | "ENTERPRISE"> = {
                    free: "FREE",
                    basic: "BASIC",
                    premium: "PREMIUM",
                    enterprise: "ENTERPRISE",
                  };
                  setCurrentSubscription(planMap[planId] || "FREE");
                }}
              />
            </div>
          )}

          {/* VERIFICATION TAB */}
          {selectedTab === "verification" && (
            <div>
              <VerificationSystem
                currentStatus={{
                  status: "NOT_STARTED",
                  documents: {},
                }}
                onStatusChange={(status) => {
                  // Frontend only - handle status change
                  console.log("Verification status changed:", status);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Job Posting Form Modal */}
      {showJobForm && (
        <JobPostingForm
          job={editingJob}
          onClose={handleJobFormClose}
          onSuccess={handleJobFormSuccess}
        />
      )}
    </div>
  );
}
