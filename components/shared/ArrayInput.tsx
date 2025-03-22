"use client";

import { Label } from "@/components/ui/label";
import { TagInput as TagInputComponent } from "emblor";
import { useId, useState } from "react";

// Define the Tag type (already provided by emblor, but redeclared for clarity)
interface Tag {
  id: string;
  text: string;
}

// Define the props for TagInput (based on emblor's documentation)
interface TagInputProps {
  id?: string;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  placeholder?: string;
  styleClasses?: {
    tagList?: { container?: string };
    input?: string;
    tag?: { body?: string; closeButton?: string };
  };
  activeTagIndex?: number | null;
  setActiveTagIndex?: React.Dispatch<React.SetStateAction<number | null>>;
  inlineTags?: boolean;
  inputFieldPosition?: "top" | "bottom";
}

// Cast TagInput to a JSX-compatible type
const TagInput = TagInputComponent as unknown as React.FC<TagInputProps>;

export default function ArrayInput({ tags, title }: { tags: Tag[], title:string }) {
  const id = useId();
  const [exampleTags, setExampleTags] = useState<Tag[]>(tags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="">{title}</Label>
      <TagInput
        id={id}
        tags={exampleTags}
        setTags={(newTags) => {
          setExampleTags(newTags);
        }}
        placeholder="Add a tag"
        styleClasses={{
          tagList: {
            container: "gap-2",
          },
          input:
            "rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 ",
          tag: {
            body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
            closeButton:
              "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
          },
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        inlineTags={false}
        inputFieldPosition="top"
      />
    </div>
  );
}
