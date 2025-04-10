"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Instagram,
  Facebook,
  Twitter,
  Plus,
  Trash2,
  Save,
  Upload,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Page() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Sample initial business data
  const [businessData, setBusinessData] = useState({
    name: "Food Sentinel",
    email: "contact@tasteofmanila.com",
    phone: "+63 (2) 8123 4567",
    address: "123 Makati Avenue, Makati City, Metro Manila, Philippines",
    description:
      "Authentic Filipino cuisine for all occasions. We specialize in traditional dishes prepared with modern techniques, offering a unique culinary experience for corporate events, weddings, and private parties.",
    logo: "",
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com/tasteofmanila" },
      { platform: "facebook", url: "https://facebook.com/tasteofmanila" },
    ],
  });

  // Function to update form fields
  const updateField = (field: string, value: string) => {
    setBusinessData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to add a new social link
  const addSocialLink = () => {
    setBusinessData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "instagram", url: "" }],
    }));
  };

  // Function to remove a social link
  const removeSocialLink = (index: number) => {
    setBusinessData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  // Function to update a social link
  const updateSocialLink = (index: number, field: string, value: string) => {
    setBusinessData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateField("logo", event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: null, message: "" });

    // Validate required fields
    if (!businessData.name || !businessData.email || !businessData.phone) {
      setStatusMessage({
        type: "error",
        message:
          "Please fill in all required fields (Business Name, Email, and Phone).",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Saving business settings:", businessData);
      setIsSubmitting(false);
      setStatusMessage({
        type: "success",
        message: "Business settings updated successfully!",
      });

      // Auto-dismiss success message after 5 seconds
      setTimeout(() => {
        if (statusMessage.type === "success") {
          setStatusMessage({ type: null, message: "" });
        }
      }, 5000);
    }, 1500);
  };

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Business Settings</h1>
        <p className="text-muted-foreground">
          Manage your catering business information and appearance
        </p>
      </div>

      {statusMessage.type && (
        <Alert
          variant={statusMessage.type === "error" ? "destructive" : "default"}
          className={
            statusMessage.type === "success"
              ? "bg-[#E6F4EA] text-[#1E7E34] border-sidebabg-sidebar-accent-foreground"
              : undefined
          }
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {statusMessage.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{statusMessage.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
            <CardDescription>
              Update your business information visible to customers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="business-name"
                  className="flex items-center gap-2"
                >
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  Business Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="business-name"
                  placeholder="Enter your business name"
                  value={businessData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Contact Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your contact email"
                  value={businessData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={businessData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  required
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Business Address
                </Label>
                <Input
                  id="address"
                  placeholder="Enter your business address"
                  value={businessData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Business Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your catering business"
                className="min-h-[120px]"
                value={businessData.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                This description will appear on your public profile and in
                search results
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Logo</CardTitle>
            <CardDescription>
              Upload your business logo to display on your profile and invoices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/2 space-y-4">
                <Label htmlFor="logo-upload">Upload Logo</Label>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label
                    htmlFor="logo-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or SVG (MAX. 2MB)
                      </p>
                    </div>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                  </Label>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <Label>Logo Preview</Label>
                <div className="mt-2 border rounded-md flex items-center justify-center bg-muted/20 h-40 w-full">
                  {businessData.logo ? (
                    <img
                      src={businessData.logo || "/placeholder.svg"}
                      alt="Business Logo"
                      className="max-h-full max-w-full object-contain p-4"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Building2 className="mx-auto h-10 w-10 mb-2" />
                      <p>No logo uploaded</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>
                  Connect your social media accounts to your business profile
                </CardDescription>
              </div>
              <Button
                type="button"
                onClick={addSocialLink}
                className="bg-sidebar-accent-foreground hover:bg-[#218838] text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Link
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {businessData.socialLinks.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No social media links added. Click "Add Link" to connect your
                  social accounts.
                </div>
              ) : (
                businessData.socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-end gap-4 p-4 border rounded-md bg-muted/10"
                  >
                    <div className="w-1/3">
                      <Label htmlFor={`platform-${index}`}>Platform</Label>
                      <Select
                        id={`platform-${index}`}
                        value={link.platform}
                        onChange={(value) =>
                          updateSocialLink(index, "platform", value)
                        }
                      >
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                        <option value="twitter">Twitter</option>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`url-${index}`}>URL</Label>
                      <div className="flex">
                        <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                          {link.platform === "instagram" && (
                            <Instagram className="h-4 w-4" />
                          )}
                          {link.platform === "facebook" && (
                            <Facebook className="h-4 w-4" />
                          )}
                          {link.platform === "twitter" && (
                            <Twitter className="h-4 w-4" />
                          )}
                        </div>
                        <Input
                          id={`url-${index}`}
                          placeholder={`Enter your ${link.platform} URL`}
                          value={link.url}
                          onChange={(e) =>
                            updateSocialLink(index, "url", e.target.value)
                          }
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeSocialLink(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-sidebar-accent-foreground hover:bg-[#218838] text-white"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
            {!isSubmitting && <Save className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
}

// Simple Select component
function Select({
  id,
  value,
  onChange,
  children,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </select>
  );
}
