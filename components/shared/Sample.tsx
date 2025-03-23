"use client";

import React, { useState } from "react";
import { TagInput as TagInputComponent } from "emblor";

// Define the Tag type (matches emblor's Tag type)
interface Tag {
  id: string;
  text: string; // Note: emblor uses "text", not "name"
}

// Define the props for TagInput
interface TagInputProps {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  placeholder?: string;
  styleClasses?: {
    input?: string;
  };
  activeTagIndex?: number | null;
  setActiveTagIndex?: React.Dispatch<React.SetStateAction<number | null>>;
  enableAutocomplete?: boolean;
  restrictTagsToAutocompleteOptions?: boolean;
  autocompleteOptions?: Tag[];
}

// Cast TagInput to a JSX-compatible type to fix TypeScript error
const TagInput = TagInputComponent as unknown as React.FC<TagInputProps>;

// Initial tags (adjusted to use "text" instead of "name")
const tags: Tag[] = [
  {
    id: "3187971345",
    text: "Sports",
  },
  {
    id: "1176551600",
    text: "Programming",
  },
  {
    id: "536967591",
    text: "Travel",
  },
];

// Autocomplete options (can be the same as initial tags or expanded)
const autocompleteOptions: Tag[] = [
  { id: "3187971345", text: "Sports" },
  { id: "1176551600", text: "Programming" },
  { id: "536967591", text: "Travel" },
  { id: "987654321", text: "Cooking" },
  { id: "123456789", text: "Reading" },
];

export default function Sample() {
  const [exampleTags, setExampleTags] = useState<Tag[]>(tags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <div className="p-4">
      <TagInput
        tags={exampleTags}
        setTags={(newTags) => {
          setExampleTags(newTags);
        }}
        placeholder="Add a tag"
        styleClasses={{
          input: "w-full sm:max-w-[350px]",
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        enableAutocomplete={true}
        restrictTagsToAutocompleteOptions={true}
        autocompleteOptions={autocompleteOptions}
      />
    </div>
  );
}
