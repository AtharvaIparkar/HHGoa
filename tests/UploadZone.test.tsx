import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import { UploadZone } from "@/components/upload/UploadZone";

describe("UploadZone", () => {
  it("renders an accessible upload target", () => {
    render(<UploadZone />);
    expect(screen.getByRole("button", { name: /upload your photo/i })).toBeInTheDocument();
  });
});
