"use client";

import LabelGroup from "../LabelGroup";
import { FormData } from "@/types/package-types";

export default function CustomerInformation({
  formData,
  setFormData,
}: {
  formData: { name: string; email: string; phone: string };
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) {
  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <LabelGroup
          title="Full Name"
          placeholder="Enter your full name"
          required
          value={formData.name}
          onChange={(value) => handleFormChange("name", value as string)}
        />
        <LabelGroup
          title="Email"
          placeholder="Enter your email address"
          required
          value={formData.email}
          onChange={(value) => handleFormChange("email", value as string)}
        />
        <LabelGroup
          title="Phone Number"
          placeholder="Enter your phone number"
          required
          number
          value={formData.phone}
          onChange={(value) => handleFormChange("phone", value as string)}
        />
      </div>
    </div>
  );
}
