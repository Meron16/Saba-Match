"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import {
  X,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Building2,
  User,
  Mail,
  Phone,
  Send,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  companyName?: string;
  company?: string;
  location: string;
  salary?: string;
  type: string;
  description?: string;
  requirements?: string;
}

interface JobApplicationFormProps {
  job: Job;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function JobApplicationForm({
  job,
  onClose,
  onSuccess,
}: JobApplicationFormProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  
  const [formData, setFormData] = useState({
    coverLetter: "",
    cvUrl: "",
    email: user?.email || "",
    phone: "",
    fullName: user?.fullName || "",
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploadingCV, setUploadingCV] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/users/profile", {
        headers: {
          "x-user-id": user?.id || "",
        },
      });
      const data = await response.json();
      if (data.profile) {
        setProfile(data.profile);
        // Pre-fill form with profile data
        setFormData((prev) => ({
          ...prev,
          email: user?.email || data.profile.email || "",
          phone: data.profile.phone || "",
          fullName: user?.fullName || data.profile.fullName || "",
          cvUrl: data.profile.cvUrl || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCvFile(file);
    setUploadingCV(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("type", "cv");

      const response = await fetch("/api/users/upload", {
        method: "POST",
        headers: {
          "x-user-id": user?.id || "",
        },
        body: formDataUpload,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          cvUrl: data.url,
        }));
        alert("CV uploaded successfully!");
      } else {
        const error = await response.json();
        alert(`Error uploading CV: ${error.error || "Upload failed"}`);
      }
    } catch (error) {
      console.error("Error uploading CV:", error);
      alert("Failed to upload CV");
    } finally {
      setUploadingCV(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cvUrl && !cvFile) {
      alert("Please upload your CV or use your profile CV");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload CV if a new file was selected
      let cvUrl = formData.cvUrl;
      if (cvFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", cvFile);
        formDataUpload.append("type", "cv");
        
        const uploadResponse = await fetch("/api/users/upload", {
          method: "POST",
          headers: {
            "x-user-id": user?.id || "",
          },
          body: formDataUpload,
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          cvUrl = uploadData.url;
        }
      }

      // Submit application to database
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user?.id || "",
        },
        body: JSON.stringify({
          jobId: job.id,
          coverLetter: formData.coverLetter,
          cvUrl: cvUrl,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Application submitted successfully for ${job.title}!`);
        if (onSuccess) {
          onSuccess();
        }
        onClose();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || "Failed to submit application"}`);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-2 border-orange-500">
        <CardHeader className="sticky top-0 bg-white z-10 border-b-2 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2 text-black">
                <Briefcase className="w-6 h-6 text-orange-500" />
                Apply for Position
              </CardTitle>
              <CardDescription className="mt-2 text-black">
                Complete your application for this position
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Job Details Summary */}
          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {job.companyName && (
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {job.companyName}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    {job.salary && (
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.type}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {isLoadingProfile ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your profile...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-black flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-500" />
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border-2 border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border-2 border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white text-black"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-black mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border-2 border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white text-black"
                    />
                  </div>
                </div>
              </div>

              {/* CV Upload Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-black flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-500" />
                  Resume / CV *
                </h4>
                
                {formData.cvUrl ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-green-500" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {profile?.cvUrl ? "Profile CV" : "Uploaded CV"}
                          </p>
                          <p className="text-xs text-gray-600">
                            {profile?.cvUrl 
                              ? "Using your profile CV. You can upload a different one if needed."
                              : "CV ready for submission"}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {formData.cvUrl.startsWith("blob:") || formData.cvUrl.startsWith("http") ? (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <a href={formData.cvUrl} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          </Button>
                        ) : null}
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleCVUpload}
                            className="hidden"
                            disabled={uploadingCV}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={uploadingCV}
                            asChild
                          >
                            <span>
                              {uploadingCV ? "Uploading..." : "Change CV"}
                            </span>
                          </Button>
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-4">
                      {profile?.cvUrl 
                        ? "No CV selected. Upload a new one or use your profile CV."
                        : "Upload your CV to apply"}
                    </p>
                    {profile?.cvUrl && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            cvUrl: profile.cvUrl,
                          }));
                        }}
                        className="mb-4"
                      >
                        Use Profile CV
                      </Button>
                    )}
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleCVUpload}
                        className="hidden"
                        disabled={uploadingCV}
                      />
                      <Button
                        type="button"
                        className="bg-orange-500 hover:bg-orange-600"
                        disabled={uploadingCV}
                        asChild
                      >
                        <span>
                          <Upload className="w-4 h-4 mr-2 inline" />
                          {uploadingCV ? "Uploading..." : "Upload CV"}
                        </span>
                      </Button>
                    </label>
                  </div>
                )}
              </div>

              {/* Cover Letter */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-black flex items-center gap-2">
                  <Mail className="w-5 h-5 text-orange-500" />
                  Cover Letter
                </h4>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Why are you interested in this position? (Optional)
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Tell us why you're a great fit for this position..."
                    className="w-full px-4 py-2 border-2 border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white text-black"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    A well-written cover letter can increase your chances of being selected
                  </p>
                </div>
              </div>

              {/* Application Summary */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        Application Summary
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Personal information will be sent to the employer
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Your CV will be attached to this application
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          You can track your application status in your dashboard
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  disabled={isSubmitting || !formData.cvUrl}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

