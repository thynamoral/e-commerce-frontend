"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export type CheckboxWrapperProps = {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: React.ReactNode;
};

export default function CheckboxWrapper({
  id,
  checked,
  onCheckedChange,
  children,
}: CheckboxWrapperProps) {
  return (
    <>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="cursor-pointer"
      />
      <Label htmlFor={id} className="cursor-pointer">
        {children}
      </Label>
    </>
  );
}
