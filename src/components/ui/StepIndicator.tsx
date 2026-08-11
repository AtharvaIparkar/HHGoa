"use client";

import React from "react";

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
  onSelectStep: (step: 1 | 2 | 3) => void;
}

export function StepIndicator({ currentStep, onSelectStep }: StepIndicatorProps) {
  const steps = [
    { num: 1 as const, label: "1. WELCOME" },
    { num: 2 as const, label: "2. CUSTOMIZE GRAPHIC" },
    { num: 3 as const, label: "3. YOUR PASS" }
  ];

  return (
    <div className="step-indicator-bar">
      {steps.map((s, idx) => {
        const isActive = currentStep === s.num;
        const isCompleted = currentStep > s.num;
        return (
          <React.Fragment key={s.num}>
            <button
              type="button"
              onClick={() => onSelectStep(s.num)}
              className={`step-node ${isActive ? "active" : isCompleted ? "completed" : ""}`}
              style={{ background: "transparent", border: "none", cursor: "pointer", font: "inherit" }}
            >
              {s.label}
            </button>

            {idx < steps.length - 1 && (
              <span style={{ color: "rgba(255, 255, 255, 0.4)", margin: "0 4px" }}>›</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
