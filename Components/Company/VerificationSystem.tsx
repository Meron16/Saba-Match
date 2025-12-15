"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
  Shield,
  CheckCircle,
  Clock,
  XCircle,
  Upload,
  FileText,
  AlertCircle,
  CheckCircle2,
  Eye,
  Download,
  Calendar,
  User,
  Building2,
} from "lucide-react";

interface VerificationStatus {
  status: "PENDING" | "VERIFIED" | "REJECTED" | "NOT_STARTED";
  submittedAt?: string;
  verifiedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  documents: {
    businessLicense?: string;
    registrationCertificate?: string;
    taxDocument?: string;
    additionalDocs?: string[];
  };
}

interface VerificationSystemProps {
  currentStatus?: VerificationStatus;
  onStatusChange?: (status: VerificationStatus) => void;
}

export default function VerificationSystem({
  currentStatus,
  onStatusChange,
}: VerificationSystemProps) {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(
    currentStatus || {
      status: "NOT_STARTED",
      documents: {},
    }
  );

  const [uploading, setUploading] = useState<string | null>(null);
  const [showRejectionDetails, setShowRejectionDetails] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(docType);
    
    // Simulate upload (frontend only)
    setTimeout(() => {
      const newStatus = {
        ...verificationStatus,
        documents: {
          ...verificationStatus.documents,
          [docType]: URL.createObjectURL(file),
        },
      };
      setVerificationStatus(newStatus);
      if (onStatusChange) {
        onStatusChange(newStatus);
      }
      setUploading(null);
      alert(`${docType} uploaded successfully (Frontend only - no backend)`);
    }, 1000);
  };

  const handleSubmitVerification = () => {
    // Check if required documents are uploaded
    if (!verificationStatus.documents.businessLicense) {
      alert("Please upload at least a Business License to submit for verification.");
      return;
    }

    const newStatus: VerificationStatus = {
      ...verificationStatus,
      status: "PENDING",
      submittedAt: new Date().toISOString(),
    };

    setVerificationStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
    alert("Verification request submitted! (Frontend only - no backend)");
  };

  const getStatusBadge = () => {
    switch (verificationStatus.status) {
      case "VERIFIED":
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1 px-3 py-1">
            <CheckCircle className="w-4 h-4" />
            Verified
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1 px-3 py-1">
            <Clock className="w-4 h-4" />
            Pending Review
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge className="bg-red-100 text-red-800 flex items-center gap-1 px-3 py-1">
            <XCircle className="w-4 h-4" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 flex items-center gap-1 px-3 py-1">
            <AlertCircle className="w-4 h-4" />
            Not Started
          </Badge>
        );
    }
  };

  const getStatusIcon = () => {
    switch (verificationStatus.status) {
      case "VERIFIED":
        return <CheckCircle2 className="w-16 h-16 text-green-500" />;
      case "PENDING":
        return <Clock className="w-16 h-16 text-yellow-500" />;
      case "REJECTED":
        return <XCircle className="w-16 h-16 text-red-500" />;
      default:
        return <Shield className="w-16 h-16 text-gray-400" />;
    }
  };

  const getStatusMessage = () => {
    switch (verificationStatus.status) {
      case "VERIFIED":
        return {
          title: "Your Company is Verified!",
          description: "Your verification has been approved. You can now access all verified company features.",
        };
      case "PENDING":
        return {
          title: "Verification Under Review",
          description: "Your documents are being reviewed by our team. This usually takes 1-3 business days.",
        };
      case "REJECTED":
        return {
          title: "Verification Rejected",
          description: "Your verification request was rejected. Please review the feedback and resubmit.",
        };
      default:
        return {
          title: "Get Your Company Verified",
          description: "Upload your business documents to get verified and unlock premium features.",
        };
    }
  };

  const statusMessage = getStatusMessage();
  const canSubmit = 
    verificationStatus.status === "NOT_STARTED" || 
    verificationStatus.status === "REJECTED";
  const hasRequiredDocs = !!verificationStatus.documents.businessLicense;

  return (
    <div className="space-y-6">
      {/* Status Overview Card */}
      <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                {getStatusIcon()}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {statusMessage.title}
                </h3>
                <p className="text-gray-600">{statusMessage.description}</p>
              </div>
            </div>
            <div className="text-right">
              {getStatusBadge()}
              {verificationStatus.submittedAt && (
                <p className="text-xs text-gray-500 mt-2">
                  Submitted: {new Date(verificationStatus.submittedAt).toLocaleDateString()}
                </p>
              )}
              {verificationStatus.verifiedAt && (
                <p className="text-xs text-gray-500 mt-2">
                  Verified: {new Date(verificationStatus.verifiedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rejection Details */}
      {verificationStatus.status === "REJECTED" && verificationStatus.rejectionReason && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <CardTitle className="text-red-900">Rejection Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-red-800 mb-4">{verificationStatus.rejectionReason}</p>
            <Button
              variant="outline"
              onClick={() => setShowRejectionDetails(!showRejectionDetails)}
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              {showRejectionDetails ? "Hide" : "Show"} Full Details
            </Button>
            {showRejectionDetails && (
              <div className="mt-4 p-4 bg-white rounded-lg border border-red-200">
                <p className="text-sm text-gray-700">
                  Common reasons for rejection include:
                </p>
                <ul className="list-disc list-inside mt-2 text-sm text-gray-600 space-y-1">
                  <li>Documents are unclear or illegible</li>
                  <li>Documents are expired or outdated</li>
                  <li>Information doesn't match company profile</li>
                  <li>Missing required documents</li>
                  <li>Documents are not in supported format</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Benefits of Verification */}
      {verificationStatus.status !== "VERIFIED" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Benefits of Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Trust & Credibility</p>
                  <p className="text-sm text-gray-600">
                    Build trust with job seekers and stand out from competitors
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Premium Features</p>
                  <p className="text-sm text-gray-600">
                    Access to advanced recruitment tools and analytics
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Priority Support</p>
                  <p className="text-sm text-gray-600">
                    Get faster response times and dedicated support
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Verified Badge</p>
                  <p className="text-sm text-gray-600">
                    Display a verified badge on your company profile
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Upload Section */}
      {canSubmit && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Required Documents
            </CardTitle>
            <CardDescription>
              Upload your business documents for verification. All documents must be clear and valid.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Business License */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business License <span className="text-red-500">*</span>
              </label>
              {verificationStatus.documents.businessLicense ? (
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="font-semibold text-gray-900">Business License</p>
                      <p className="text-xs text-gray-600">Uploaded successfully</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={verificationStatus.documents.businessLicense} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </a>
                    </Button>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e, "businessLicense")}
                        className="hidden"
                        disabled={uploading === "businessLicense"}
                      />
                      <Button variant="outline" size="sm" disabled={uploading === "businessLicense"} asChild>
                        <span>
                          {uploading === "businessLicense" ? "Uploading..." : "Replace"}
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-4">No business license uploaded</p>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e, "businessLicense")}
                      className="hidden"
                      disabled={uploading === "businessLicense"}
                    />
                    <Button
                      className="bg-orange-500 hover:bg-orange-600"
                      disabled={uploading === "businessLicense"}
                      asChild
                    >
                      <span>
                        <Upload className="w-4 h-4 mr-2 inline" />
                        {uploading === "businessLicense" ? "Uploading..." : "Upload Business License"}
                      </span>
                    </Button>
                  </label>
                </div>
              )}
            </div>

            {/* Registration Certificate */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Registration Certificate (Optional)
              </label>
              {verificationStatus.documents.registrationCertificate ? (
                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-gray-500" />
                    <div>
                      <p className="font-semibold text-gray-900">Registration Certificate</p>
                      <p className="text-xs text-gray-600">Uploaded successfully</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={verificationStatus.documents.registrationCertificate} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </a>
                    </Button>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e, "registrationCertificate")}
                        className="hidden"
                        disabled={uploading === "registrationCertificate"}
                      />
                      <Button variant="outline" size="sm" disabled={uploading === "registrationCertificate"} asChild>
                        <span>
                          {uploading === "registrationCertificate" ? "Uploading..." : "Replace"}
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <FileText className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e, "registrationCertificate")}
                      className="hidden"
                      disabled={uploading === "registrationCertificate"}
                    />
                    <Button
                      variant="outline"
                      disabled={uploading === "registrationCertificate"}
                      asChild
                    >
                      <span>
                        <Upload className="w-4 h-4 mr-2 inline" />
                        {uploading === "registrationCertificate" ? "Uploading..." : "Upload Registration Certificate"}
                      </span>
                    </Button>
                  </label>
                </div>
              )}
            </div>

            {/* Tax Document */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tax Document (Optional)
              </label>
              {verificationStatus.documents.taxDocument ? (
                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-gray-500" />
                    <div>
                      <p className="font-semibold text-gray-900">Tax Document</p>
                      <p className="text-xs text-gray-600">Uploaded successfully</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={verificationStatus.documents.taxDocument} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </a>
                    </Button>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(e, "taxDocument")}
                        className="hidden"
                        disabled={uploading === "taxDocument"}
                      />
                      <Button variant="outline" size="sm" disabled={uploading === "taxDocument"} asChild>
                        <span>
                          {uploading === "taxDocument" ? "Uploading..." : "Replace"}
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <FileText className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e, "taxDocument")}
                      className="hidden"
                      disabled={uploading === "taxDocument"}
                    />
                    <Button
                      variant="outline"
                      disabled={uploading === "taxDocument"}
                      asChild
                    >
                      <span>
                        <Upload className="w-4 h-4 mr-2 inline" />
                        {uploading === "taxDocument" ? "Uploading..." : "Upload Tax Document"}
                      </span>
                    </Button>
                  </label>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <Button
                onClick={handleSubmitVerification}
                disabled={!hasRequiredDocs || uploading !== null}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
              >
                <Shield className="w-5 h-5 mr-2" />
                {verificationStatus.status === "REJECTED" ? "Resubmit for Verification" : "Submit for Verification"}
              </Button>
              {!hasRequiredDocs && (
                <p className="text-sm text-red-600 mt-2 text-center">
                  Please upload at least a Business License to submit
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verification Guidelines */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <AlertCircle className="w-5 h-5" />
            Verification Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Documents must be clear, legible, and in PDF, JPG, or PNG format</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>All documents must be valid and not expired</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Company name and details must match your profile information</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Maximum file size: 5MB per document</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Verification typically takes 1-3 business days</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

