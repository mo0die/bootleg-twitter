"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      className="w-full dark:bg-black dark:text-white"
      onClick={toggleTheme}
    >
      {theme === "light" ? "Dark" : "Light"}
    </Button>
  );
}
