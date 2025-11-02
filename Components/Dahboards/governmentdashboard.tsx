"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import {
  Building2,
  Users,
  CheckCircleIcon,
  ClockIcon,
  Shield,
  FileText,
  Settings,
  LogOut,
  User,
  ArrowLeft,
  FileCheck,
  ClipboardList,
} from "lucide-react";

export default function GovernmentDashboard() {
  const { user, logout } = useAuth();

  const userInitials =
    user?.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "GV";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ======== DASHBOARD HEADER ======== */}
      <div className="bg-white border-b border-gray-200 px-6 md:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">
              Government Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage verifications and system oversight
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
                  {user?.fullName || "Government User"}
                </p>
                <p className="text-xs text-gray-600">Government Account</p>
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
                    Manage Your Government Profile
                  </h3>
                  <p className="text-sm text-gray-600">
                    Update department info and verification status
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
                <FileCheck className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Documents</p>
                <p className="text-xs text-gray-600">Upload docs</p>
              </div>
              <div className="text-center">
                <ClipboardList className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Oversight</p>
                <p className="text-xs text-gray-600">System access</p>
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
                  <p className="text-sm text-gray-600 mb-1">Total Users</p>
                  <p className="text-2xl font-bold text-black">0</p>
                </div>
                <Users className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Pending Verifications
                  </p>
                  <p className="text-2xl font-bold text-black">0</p>
                </div>
                <ClockIcon className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Verified Users</p>
                  <p className="text-2xl font-bold text-black">0</p>
                </div>
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">KYC Reviews</p>
                  <p className="text-2xl font-bold text-black">0</p>
                </div>
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ======== QUICK ACTIONS ======== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-500" />
                Verification Management
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Review and verify user KYC documents, company verifications, and
                system access requests.
              </p>
              <Button variant="outline" className="w-full">
                View Verifications
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" />
                Document Oversight
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Monitor uploaded documents, verify authenticity, and manage
                system compliance.
              </p>
              <Button variant="outline" className="w-full">
                Review Documents
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
