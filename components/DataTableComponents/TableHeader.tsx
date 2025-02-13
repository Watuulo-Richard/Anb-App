/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import {
  Options,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";
import Link from "next/link";
import { CirclePlus } from "lucide-react";

type TableHeaderProps = {
  title: string;
  href?: string;
  linkTitle?: string;
  data: any;
  model: string;
  showImport?: boolean;
};
export default function TableHeader({
  title,
  href,
  linkTitle,
  data,
  model,
  showImport = true,
}: TableHeaderProps) {
  const [status, setStatus] = useState<SelectValue>(null);
  const [date, setDate] = useState<SelectValue>(null);
  return (
    <div className=" mb-3">
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 py-3">
        <h2 className="scroll-m-20  text-2xl font-semibold tracking-tight first:mt-0">
          {title}({data.length})
        </h2>
        <div className="ml-auto flex items-center gap-2">
          <Button
            size="sm"
            asChild
            className="h-8 gap-1 bg-gray-950 hover:bg-gray-900"
          >
            {linkTitle && href ? (
              <Link href={href}>
                <CirclePlus className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {linkTitle}
                </span>
              </Link>
            ) : (
              ""
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
