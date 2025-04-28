"use client";

import { Input } from "@/components/ui/input";
import * as React from "react";
import { ControllerRenderProps } from "react-hook-form";

export type InputWrapperProps = {
  field: ControllerRenderProps<any, any>;
} & React.ComponentProps<"input">;

export default function InputWrapper({ field, ...props }: InputWrapperProps) {
  return <Input {...field} {...props} />;
}
