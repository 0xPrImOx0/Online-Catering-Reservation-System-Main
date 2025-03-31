"use client";

import { Label } from "@/components/ui/label";
import { ArrayInputProps } from "@/types/component-types";
import { Tag, TagInput as TagInputComponent, TagInputProps } from "emblor";
import { useId, useState } from "react";

const TagInput = TagInputComponent as unknown as React.FC<TagInputProps>;

export default function ArrayInput({
  tags,
  title,
  autocomplete = false,
  suggestions = [],
}: ArrayInputProps) {
  const id = useId();
  const [dataTags, setDataTags] = useState<Tag[]>(tags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="">
        {title} <span className="text-destructive">*</span>{" "}
      </Label>
      <TagInput
        id={id}
        tags={dataTags}
        setTags={(newTags) => {
          setDataTags(newTags);
        }}
        placeholder={`Add ${title.toLowerCase()}`}
        styleClasses={{
          tagList: {
            container: "gap-2",
          },
          input: `rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 ${
            autocomplete && "!shadow-none"
          }`,
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
        autocompleteOptions={suggestions ? suggestions : undefined}
        enableAutocomplete={autocomplete}
        restrictTagsToAutocompleteOptions={autocomplete}
      />
      <span className="text-muted-foreground text-xs font-light">
        Press enter to confirm the {title.toLowerCase()}
      </span>
    </div>
  );
}
