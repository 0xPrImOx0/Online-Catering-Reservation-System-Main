"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Save,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Page() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Sample initial account data
  const [accountData, setAccountData] = useState({
    fullName: "Maria Santos",
    email: "maria@tasteofmanila.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profilePicture: "/placeholder.svg?height=200&width=200",
  });

  // Function to update form fields
  const updateField = (field: string, value: string) => {
    setAccountData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateField("profilePicture", event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: null, message: "" });

    // Validate required fields
    if (!accountData.fullName || !accountData.email) {
      setStatusMessage({
        type: "error",
        message: "Please fill in all required fields (Full Name and Email).",
      });
      setIsSubmitting(false);
      return;
    }

    // Validate password if changing
    if (
      accountData.newPassword ||
      accountData.confirmPassword ||
      accountData.currentPassword
    ) {
      if (!accountData.currentPassword) {
        setStatusMessage({
          type: "error",
          message: "Current password is required to change your password.",
        });
        setIsSubmitting(false);
        return;
      }

      if (accountData.newPassword !== accountData.confirmPassword) {
        setStatusMessage({
          type: "error",
          message: "New password and confirmation do not match.",
        });
        setIsSubmitting(false);
        return;
      }

      if (accountData.newPassword.length < 8) {
        setStatusMessage({
          type: "error",
          message: "New password must be at least 8 characters long.",
        });
        setIsSubmitting(false);
        return;
      }
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Saving account settings:", accountData);
      setIsSubmitting(false);
      setStatusMessage({
        type: "success",
        message: "Account settings updated successfully!",
      });

      // Reset password fields after successful update
      setAccountData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      // Auto-dismiss success message after 5 seconds
      setTimeout(() => {
        if (statusMessage.type === "success") {
          setStatusMessage({ type: null, message: "" });
        }
      }, 5000);
    }, 1500);
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Deleting account");
      setIsSubmitting(false);
      setDeleteDialogOpen(false);

      // Redirect to login page after account deletion
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your personal account information and security
        </p>
      </div>

      {statusMessage.type && (
        <Alert
          variant={statusMessage.type === "error" ? "destructive" : "default"}
          className={
            statusMessage.type === "success"
              ? "bg-[#E6F4EA] text-[#1E7E34] border-[#28A745] mb-6"
              : "mb-6"
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information and profile picture
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-2/3 space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="full-name"
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4 text-muted-foreground" />
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="full-name"
                    placeholder="Enter your full name"
                    value={accountData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={accountData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    This email will be used for account notifications and
                    communications
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/3">
                <div className="space-y-2">
                  <Label>Profile Picture</Label>
                  <div className="flex flex-col items-center">
                    <div className="relative group">
                      <img
                        src={accountData.profilePicture || "/placeholder.svg"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-2 border-muted"
                      />
                      <div
                        className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={triggerFileInput}
                      >
                        <Upload className="h-6 w-6 text-background" />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={triggerFileInput}
                    >
                      Change Picture
                    </Button>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePictureUpload}
                    />
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      JPG, PNG or GIF
                      <br />
                      Max 2MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your password to maintain account security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label
                htmlFor="current-password"
                className="flex items-center gap-2"
              >
                <Lock className="h-4 w-4 text-muted-foreground" />
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  value={accountData.currentPassword}
                  onChange={(e) =>
                    updateField("currentPassword", e.target.value)
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="new-password" className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={accountData.newPassword}
                  onChange={(e) => updateField("newPassword", e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Password must be at least 8 characters long
              </p>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <Label
                htmlFor="confirm-password"
                className="flex items-center gap-2"
              >
                <Lock className="h-4 w-4 text-muted-foreground" />
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={accountData.confirmPassword}
                  onChange={(e) =>
                    updateField("confirmPassword", e.target.value)
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
            <CardDescription>
              Manage your account status and data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert
              variant="destructive"
              className="bg-amber-50 border-amber-200 text-amber-800"
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Danger Zone</AlertTitle>
              <AlertDescription>
                Deleting your account will permanently remove all your data from
                our system. This action cannot be undone.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <p className="text-sm text-muted-foreground">
              Account created on:{" "}
              <span className="font-medium">January 15, 2023</span>
            </p>
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove all your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      All your catering listings, reservations, and customer
                      data will be permanently deleted.
                    </AlertDescription>
                  </Alert>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-delete">
                      Type "DELETE" to confirm
                    </Label>
                    <Input id="confirm-delete" placeholder="DELETE" />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Deleting..." : "Delete Account"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
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
            className="bg-sidebar-accent-foreground text-background"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
            {!isSubmitting && <Save className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
