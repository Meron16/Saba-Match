"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { useI18n } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/Components/ui/language-switcher";
import JobApplicationForm from "@/Components/Jobs/JobApplicationForm";
import {
  SearchIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  MapPin,
  Calendar,
  Users,
  BookOpen,
  DollarSign,
  Briefcase,
  Share2,
  Bookmark,
  ArrowLeft,
  LogOut,
  User,
  FileText,
  Award,
  Settings,
} from "lucide-react";

// ============================================================
// DATA TYPES & INTERFACES
// ============================================================
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  posted: string;
  type: "Full Time" | "Part Time" | "Contract";
  badge?: string;
}

interface JobDetails {
  id: string;
  title: string;
  company: string;
  companyVerified: boolean;
  jobsPosted: number;
  location: string;
  postedDate: string;
  badge?: string;
  type: string;
  deadline: string;
  vacancies: number;
  education: string;
  salary: string;
  salaryType: "Monthly" | "Annual";
  experience: string;
  description: string;
}

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: "pending" | "reviewing" | "accepted" | "rejected";
}

// Jobs and applications will be loaded from database via API

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function Dashboard() {
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJobForApplication, setSelectedJobForApplication] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [isLoadingApplications, setIsLoadingApplications] = useState(true);
  const [selectedJobDetails, setSelectedJobDetails] = useState<JobDetails | null>(null);

  const userInitials =
    user?.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "US";

  // Load jobs from database on mount
  useEffect(() => {
    loadJobs();
    loadApplications();
  }, [user]);

  const loadJobs = async () => {
    setIsLoadingJobs(true);
    try {
      // Fetch all active jobs
      const response = await fetch("/api/jobs?status=active");
      
      if (response.ok) {
        const data = await response.json();
        const jobsData = (data.jobs || []).map((job: any) => ({
          id: job.id,
          title: job.title,
          company: job.companyName || "Company",
          location: job.location,
          salary: job.salary || "Not Specified",
          posted: formatDate(job.postedDate),
          type: job.type,
          badge: job.category || undefined,
        }));
        setJobs(jobsData);
        // Auto-select first job if available
        if (jobsData.length > 0 && !selectedJobId) {
          setSelectedJobId(jobsData[0].id);
          loadJobDetails(jobsData[0].id);
        }
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  const loadJobDetails = async (jobId: string) => {
    try {
      const response = await fetch(`/api/jobs?id=${jobId}`);
      
      if (response.ok) {
        const data = await response.json();
        const job = data.job;
        if (job) {
          setSelectedJobDetails({
            id: job.id,
            title: job.title,
            company: job.companyName || "Company",
            companyVerified: true,
            jobsPosted: 0,
            location: job.location,
            postedDate: formatDate(job.postedDate),
            badge: job.category || undefined,
            type: job.type,
            deadline: job.deadline ? formatDate(job.deadline) : "Not specified",
            vacancies: job.vacancies || 1,
            education: job.education || "Not specified",
            salary: job.salary || "Not Specified",
            salaryType: (job.salaryType as "Monthly" | "Annual") || "Monthly",
            experience: job.experience || "Not specified",
            description: job.description || "No description available.",
          });
        }
      }
    } catch (error) {
      console.error("Error loading job details:", error);
    }
  };

  const loadApplications = async () => {
    if (!user?.id) {
      setIsLoadingApplications(false);
      return;
    }
    
    setIsLoadingApplications(true);
    try {
      const response = await fetch(`/api/applications?applicantId=${user.id}`, {
        headers: {
          "x-user-id": user.id,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        const appsData = (data.applications || []).map((app: any) => ({
          id: app.id,
          jobTitle: app.job?.title || "Unknown Job",
          company: app.job?.companyName || "Unknown Company",
          appliedDate: app.appliedAt,
          status: app.status.toLowerCase() as "pending" | "reviewing" | "accepted" | "rejected",
        }));
        setApplications(appsData);
      }
    } catch (error) {
      console.error("Error loading applications:", error);
    } finally {
      setIsLoadingApplications(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
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

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update job details when selection changes
  useEffect(() => {
    if (selectedJobId) {
      loadJobDetails(selectedJobId);
    }
  }, [selectedJobId]);

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
              <h1 className="text-3xl font-bold text-black">{t.dashboard.welcome} - {t.roles.jobSeeker} Dashboard</h1>
              <LanguageSwitcher />
            </div>
            <p className="text-gray-600 mt-1">
              {t.dashboardStrings.welcomeBack} {t.dashboardStrings.recruitmentJourney}
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
            <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="text-right">
                <p className="text-sm font-semibold text-black">
                  {user?.fullName || t.roles.user}
                </p>
                <p className="text-xs text-gray-600">{t.roles.jobSeeker}</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ======== LEFT SIDEBAR - JOBS & APPLICATIONS ======== */}
          <div className="lg:col-span-2 space-y-8">
            {/* ======== PROFILE QUICK ACCESS CARD ======== */}
            <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                      <User className="w-8 h-8 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {t.dashboardStrings.completeProfile}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {t.dashboardStrings.completeProfileDesc}
                      </p>
                    </div>
                  </div>
                  <Link href="/profile">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 font-semibold shadow-lg">
                      <Settings className="w-4 h-4 mr-2" />
                      {t.profile.editProfile}
                    </Button>
                  </Link>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-orange-200">
                  <div className="text-center">
                    <FileText className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-900">CV</p>
                    <p className="text-xs text-gray-600">Upload your CV</p>
                  </div>
                  <div className="text-center">
                    <Award className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-900">
                      Certificates
                    </p>
                    <p className="text-xs text-gray-600">Add credentials</p>
                  </div>
                  <div className="text-center">
                    <Briefcase className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-900">
                      Skills
                    </p>
                    <p className="text-xs text-gray-600">Showcase talents</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* ======== JOBS SECTION ======== */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-black flex items-center gap-2">
                  <BriefcaseIcon className="w-6 h-6 text-orange-500" />
                  Jobs you might like
                </h2>
              </div>

              {/* SEARCH BAR */}
              <div className="mb-6 relative">
                <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.dashboardStrings.searchForJob}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* TABS - All Jobs / Saved Jobs */}
              <div className="flex gap-6 mb-6 border-b border-gray-200 pb-4">
                <button className="text-sm font-medium text-gray-600 border-b-2 border-orange-500 pb-2 text-orange-500">
                  {t.dashboardStrings.allJobs}
                </button>
                <button className="text-sm font-medium text-gray-600 hover:text-black">
                  {t.dashboardStrings.savedJobs}
                </button>
              </div>

              {/* JOB CARDS LIST */}
              <div className="space-y-4">
                {isLoadingJobs ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading jobs...</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : filteredJobs.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-12">
                        <BriefcaseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg mb-2">No jobs available</p>
                        <p className="text-gray-500 text-sm">
                          Check back later for new job opportunities
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  filteredJobs.map((job) => (
                  <Card
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`hover:shadow-lg transition-all cursor-pointer border-l-4 ${
                      selectedJobId === job.id
                        ? "border-l-orange-500 bg-orange-50"
                        : "border-l-gray-200 hover:border-l-orange-400"
                    }`}
                  >
                    <CardContent className="pt-6">
                      {/* JOB TITLE & APPLY BUTTON */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-base font-bold text-black">
                              {job.title}
                            </h3>
                            {job.badge && (
                              <Badge className="bg-blue-100 text-blue-700 text-xs font-semibold">
                                {job.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{job.company}</p>
                        </div>
                        <Button 
                          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 text-sm font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedJobForApplication(job);
                            setShowApplicationForm(true);
                          }}
                        >
                          Apply
                        </Button>
                      </div>

                      {/* JOB META INFO */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          📍 {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          💼 {job.type}
                        </span>
                      </div>

                      {/* POSTED TIME */}
                      <p className="text-xs text-gray-500">
                        Posted {job.posted}
                      </p>
                    </CardContent>
                  </Card>
                  ))
                )}
              </div>
            </div>

            {/* ======== APPLICATION STATUS SECTION (MOBILE) ======== */}
            <div className="lg:hidden">
              <h2 className="text-xl font-bold text-black mb-4">
                Your Applications
              </h2>
              <div className="space-y-3">
                {isLoadingApplications ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm">Loading applications...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-8 border border-gray-200 rounded-lg">
                    <p className="text-gray-600 text-sm">No applications yet</p>
                    <p className="text-gray-500 text-xs mt-1">Apply to jobs to see your applications here</p>
                  </div>
                ) : (
                  applications.map((app) => (
                  <div
                    key={app.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="mb-2">
                      <h3 className="text-sm font-bold text-black">
                        {app.jobTitle}
                      </h3>
                      <p className="text-xs text-gray-600">{app.company}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Applied {new Date(app.appliedDate).toLocaleDateString()}
                      </span>
                      <Badge
                        className={`flex items-center gap-1 ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {getStatusIcon(app.status)}
                        <span className="capitalize">{app.status}</span>
                      </Badge>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ======== RIGHT SIDEBAR - JOB DETAILS & APPLICATIONS ======== */}
          <div className="space-y-6">
            {/* ======== JOB DETAILS PANEL ======== */}
            {selectedJobDetails && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
                {/* BACK BUTTON */}
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  {t.common.back}
                </button>

                {/* JOB HEADER */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h1 className="text-2xl font-bold text-black">
                        {selectedJobDetails.title}
                      </h1>
                      <p className="text-gray-600 text-sm mt-1">
                        {selectedJobDetails.type}
                      </p>
                    </div>
                    {selectedJobDetails.badge && (
                      <Badge className="bg-blue-100 text-blue-700 font-semibold px-3 py-1">
                        {selectedJobDetails.badge}
                      </Badge>
                    )}
                  </div>

                  {/* COMPANY INFO */}
                  <div className="flex items-center gap-1 text-sm">
                    <span className="font-semibold text-black">
                      {selectedJobDetails.company}
                    </span>
                    {selectedJobDetails.companyVerified && (
                      <CheckCircleIcon className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Verified company</p>
                </div>

                {/* JOB QUICK INFO */}
                <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600">Posted Date</p>
                    <p className="text-sm font-semibold text-black">
                      {selectedJobDetails.postedDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Location</p>
                    <p className="text-sm font-semibold text-black flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedJobDetails.location}
                    </p>
                  </div>
                </div>

                {/* JOB DETAILS GRID */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* JOB TYPE */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Job Type</p>
                    <p className="text-sm font-semibold text-black">
                      {selectedJobDetails.type}
                    </p>
                  </div>

                  {/* DEADLINE */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Deadline
                    </p>
                    <p className="text-sm font-semibold text-black">
                      {selectedJobDetails.deadline}
                    </p>
                  </div>

                  {/* VACANCIES */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Vacancies
                    </p>
                    <p className="text-sm font-semibold text-black">
                      {selectedJobDetails.vacancies}
                    </p>
                  </div>

                  {/* EDUCATION */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      Education
                    </p>
                    <p className="text-sm font-semibold text-black">
                      {selectedJobDetails.education}
                    </p>
                  </div>
                </div>

                {/* SALARY & EXPERIENCE */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      Salary
                    </p>
                    <p className="text-sm font-bold text-black">
                      {selectedJobDetails.salary}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedJobDetails.salaryType}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      Experience
                    </p>
                    <p className="text-sm font-bold text-black">
                      {selectedJobDetails.experience}
                    </p>
                    <p className="text-xs text-gray-500">Experience Level</p>
                  </div>
                </div>
                {/* ACTION BUTTONS */}
                <div className="space-y-3 mb-6">
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-semibold"
                    onClick={() => {
                      const job = jobs.find(j => j.id === selectedJobId);
                      if (job) {
                        setSelectedJobForApplication(job);
                        setShowApplicationForm(true);
                      }
                    }}
                  >
                    {t.dashboardStrings.applyNow}
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="border-red-400 text-red-500 hover:bg-red-50 rounded-full bg-transparent"
                    >
                      <Bookmark className="w-4 h-4 mr-2" />
                      {t.common.save} {t.jobs.title}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-400 text-red-500 hover:bg-red-50 rounded-full bg-transparent"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Job
                    </Button>
                  </div>
                </div>

                {/* JOB DESCRIPTION */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-black mb-3">
                    Job Description
                  </h3>
                  <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                    {selectedJobDetails.description.split("\n").map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>

                {/* COMPANY PROFILE SECTION */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-black">
                        {selectedJobDetails.company}
                      </p>
                      <p className="text-xs text-gray-600">
                        Verified Company
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-red-400 text-red-500 hover:bg-red-50 rounded-full text-sm bg-transparent"
                    >
                      See Company profile
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* ======== APPLICATION STATUS SECTION (DESKTOP) ======== */}
            <div className="hidden lg:block bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-orange-500" />
                Your Applications
              </h2>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {isLoadingApplications ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm">Loading applications...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-8 border border-gray-200 rounded-lg">
                    <p className="text-gray-600 text-sm">No applications yet</p>
                    <p className="text-gray-500 text-xs mt-1">Apply to jobs to see your applications here</p>
                  </div>
                ) : (
                  applications.map((app) => (
                  <div
                    key={app.id}
                    className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                  >
                    <div className="mb-2">
                      <h3 className="text-sm font-bold text-black">
                        {app.jobTitle}
                      </h3>
                      <p className="text-xs text-gray-600">{app.company}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Applied {new Date(app.appliedDate).toLocaleDateString()}
                      </span>
                      <Badge
                        className={`flex items-center gap-1 ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {getStatusIcon(app.status)}
                        <span className="capitalize text-xs">{app.status}</span>
                      </Badge>
                    </div>
                  </div>
                  ))
                )}
              </div>

              {/* STATS */}
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-500">{applications.length}</p>
                  <p className="text-xs text-gray-600">Total Apps</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">
                    {applications.filter(a => a.status === "accepted").length}
                  </p>
                  <p className="text-xs text-gray-600">Accepted</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-500">
                    {applications.filter(a => a.status === "reviewing" || a.status === "pending").length}
                  </p>
                  <p className="text-xs text-gray-600">Reviewing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Application Form Modal */}
      {showApplicationForm && selectedJobForApplication && (
        <JobApplicationForm
          job={{
            id: selectedJobForApplication.id,
            title: selectedJobForApplication.title,
            company: selectedJobForApplication.company,
            companyName: selectedJobForApplication.company,
            location: selectedJobForApplication.location,
            salary: selectedJobForApplication.salary,
            type: selectedJobForApplication.type,
          }}
          onClose={() => {
            setShowApplicationForm(false);
            setSelectedJobForApplication(null);
          }}
          onSuccess={() => {
            // Handle successful application
            setShowApplicationForm(false);
            setSelectedJobForApplication(null);
            loadApplications(); // Reload applications after successful submission
          }}
        />
      )}
    </div>
  );
}
