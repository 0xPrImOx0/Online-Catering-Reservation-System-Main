"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LabelGroup from "../LabelGroup";
import { eventTypes, FormData } from "@/types/package-types";

export default function EventDetails({
  formData,
  setFormData,
}: {
  formData: {
    eventType: string;
    eventDate: string;
    guestCount: string;
    venue: string;
    serviceType: string;
    serviceHours: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) {
  const hoursArray = ["4 hours", "5 hours", "6 hours", "8 hours", "10 hours"];
  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabelGroup
          title="Event Type"
          type="select"
          placeholder="Select event type"
          selectData={eventTypes}
          value={formData.eventType}
          onChange={(value) => handleFormChange("eventType", value as string)}
        />
        <LabelGroup
          title="Event Date"
          date={true}
          value={formData.eventDate}
          onChange={(value) => handleFormChange("eventDate", value as string)}
        />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabelGroup
          title="Number of Guests"
          number
          placeholder="Enter expected number of guests"
          value={formData.guestCount}
          onChange={(value) => handleFormChange("guestCount", value as string)}
        />
        <LabelGroup
          title="Venue"
          placeholder="Enter event venue"
          value={formData.venue}
          onChange={(value) => handleFormChange("venue", value as string)}
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Service Type</Label>
          <RadioGroup
            defaultValue={formData.serviceType}
            onValueChange={(value) => handleFormChange("serviceType", value)}
            className="grid grid-cols-2 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Buffet" id="buffet" />
              <Label htmlFor="buffet">Buffet</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Plated" id="plated" />
              <Label htmlFor="plated">Plated Service</Label>
            </div>
          </RadioGroup>
        </div>
        <LabelGroup
          title="Service Hours"
          placeholder="Select service hours"
          type="select"
          selectData={hoursArray}
          value={formData.serviceHours}
          onChange={(value) =>
            handleFormChange("serviceHours", value as string)
          }
        />
      </div>
    </div>
  );
}
