"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
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
} from "lucide-react";

// ============================================================
// DATA TYPES & INTERFACES
// ============================================================
interface Job {
  id: string;
  title: string;
  location: string;
  salary: string;
  posted: string;
  type: "Full Time" | "Part Time" | "Contract";
  applications: number;
  status: "active" | "closed";
}

interface Application {
  id: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  appliedDate: string;
  status: "pending" | "reviewing" | "accepted" | "rejected";
}

// ============================================================
// SAMPLE DATA
// ============================================================
const COMPANY_JOBS: Job[] = [
  {
    id: "1",
    title: "Operation manager for furniture company",
    location: "Addis Ababa, Ethiopia",
    salary: "Amount Not Specified",
    posted: "2 days ago",
    type: "Full Time",
    applications: 12,
    status: "active",
  },
  {
    id: "2",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    posted: "1 week ago",
    type: "Full Time",
    applications: 8,
    status: "active",
  },
  {
    id: "3",
    title: "Product Manager",
    location: "Remote",
    salary: "$100k - $140k",
    posted: "3 days ago",
    type: "Full Time",
    applications: 15,
    status: "active",
  },
];

const APPLICATIONS: Application[] = [
  {
    id: "1",
    jobTitle: "Operation manager for furniture company",
    applicantName: "John Doe",
    applicantEmail: "john@example.com",
    appliedDate: "2025-01-15",
    status: "reviewing",
  },
  {
    id: "2",
    jobTitle: "Senior Frontend Developer",
    applicantName: "Jane Smith",
    applicantEmail: "jane@example.com",
    appliedDate: "2025-01-14",
    status: "pending",
  },
  {
    id: "3",
    jobTitle: "Product Manager",
    applicantName: "Bob Johnson",
    applicantEmail: "bob@example.com",
    appliedDate: "2025-01-13",
    status: "accepted",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function CompanyDashboard() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"jobs" | "applications">(
    "jobs"
  );

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

  const filteredJobs = COMPANY_JOBS.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApplications = APPLICATIONS.filter(
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

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ======== DASHBOARD HEADER ======== */}
      <div className="bg-white border-b border-gray-200 px-6 md:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">Company Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage your job postings and applications
            </p>
          </div>

          {/* PROFILE SECTION - TOP RIGHT */}
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5 py-2 font-medium">
                <User className="w-4 h-4 mr-2" />
                My Profile
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
              Logout
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
              <div className="text-center">
                <Shield className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">
                  Verification
                </p>
                <p className="text-xs text-gray-600">Get verified</p>
              </div>
              <div className="text-center">
                <CreditCard className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">
                  Subscription
                </p>
                <p className="text-xs text-gray-600">Manage plan</p>
              </div>
              <div className="text-center">
                <FileText className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Documents</p>
                <p className="text-xs text-gray-600">Upload docs</p>
              </div>
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
                  <p className="text-2xl font-bold text-black">
                    {COMPANY_JOBS.length}
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
                    Total Applications
                  </p>
                  <p className="text-2xl font-bold text-black">
                    {APPLICATIONS.length}
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
                  <p className="text-sm text-gray-600 mb-1">Pending Review</p>
                  <p className="text-2xl font-bold text-black">
                    {
                      APPLICATIONS.filter(
                        (app) =>
                          app.status === "pending" || app.status === "reviewing"
                      ).length
                    }
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
                  <p className="text-sm text-gray-600 mb-1">Accepted</p>
                  <p className="text-2xl font-bold text-black">
                    {
                      APPLICATIONS.filter((app) => app.status === "accepted")
                        .length
                    }
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
            <div className="flex gap-4 border-b border-gray-200">
              <button
                onClick={() => setSelectedTab("jobs")}
                className={`pb-3 px-4 text-sm font-medium transition ${
                  selectedTab === "jobs"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Posted Jobs
              </button>
              <button
                onClick={() => setSelectedTab("applications")}
                className={`pb-3 px-4 text-sm font-medium transition ${
                  selectedTab === "applications"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Applications
              </button>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
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

          {/* JOBS TAB */}
          {selectedTab === "jobs" && (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-black">
                            {job.title}
                          </h3>
                          <Badge
                            className={
                              job.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }
                          >
                            {job.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <BriefcaseIcon className="w-4 h-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {job.applications} applications
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Posted {job.posted}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="text-sm">
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          className="text-sm border-red-300 text-red-600 hover:bg-red-50"
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* APPLICATIONS TAB */}
          {selectedTab === "applications" && (
            <div className="space-y-4">
              {filteredApplications.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-black mb-1">
                          {app.jobTitle}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-semibold">
                            {app.applicantName}
                          </span>{" "}
                          • {app.applicantEmail}
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
                          <Button
                            variant="outline"
                            className="text-sm"
                            size="sm"
                          >
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
