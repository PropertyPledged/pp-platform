"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useElementWidth from "@/hooks/useElementWidth";
import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import * as React from "react";
import ListWrapper from "../atoms/ListWrapper";

type Checked = DropdownMenuCheckboxItemProps["checked"];

type MultiSelectDropdownProps = {
  value: string[];
  options: {
    label: string;
    value: string;
  }[];
  onValueChange: (value: string[]) => void; // eslint-disable-line no-unused-vars
  renderTrigger: () => React.ReactNode | React.ReactNode[] | null;
};

function MultiSelectDropdown({
  value,
  options,
  onValueChange,
  renderTrigger,
}: MultiSelectDropdownProps) {
  const { ref, width } = useElementWidth<HTMLButtonElement>();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger ref={ref} asChild>
        {typeof renderTrigger === "function" ? renderTrigger() : renderTrigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        style={{ width: width ? `${width}px` : "auto" }}
      >
        <ListWrapper list={options} keyExtractor={(option) => option.label}>
          {(option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={value.includes(option.value) as Checked}
              onCheckedChange={(checked) => {
                if (checked) {
                  onValueChange([...value, option.value]);
                } else {
                  onValueChange(value.filter((v) => v !== option.value));
                }
              }}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          )}
        </ListWrapper>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MultiSelectDropdown;
