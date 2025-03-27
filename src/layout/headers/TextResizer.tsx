"use client";

import { useState, useEffect } from "react";

const TextResizer = () => {
  // Get saved font modifier from localStorage or default to 1
  const [fontModifier, setFontModifier] = useState<number>(1);

  useEffect(() => {
    const savedModifier = localStorage.getItem("fontSizeModifier");
    if (savedModifier) {
      setFontModifier(parseFloat(savedModifier));
      document.documentElement.style.setProperty("--font-size-modifier", savedModifier);
    }
  }, []);

  const changeFontSize = (modifier: number) => {
    setFontModifier(modifier);
    document.documentElement.style.setProperty("--font-size-modifier", modifier.toString());
    localStorage.setItem("fontSizeModifier", modifier.toString());
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeFontSize(Math.min(1.5, fontModifier + 0.1))} // Maximum 1.5
        disabled={fontModifier >= 1.3}
        title="Increase Text Size"
        role="button"
        className="text-resizer-btn disabled:opacity-50"
      >
        A+
      </button>
      <button
        onClick={() => changeFontSize(1)} // Reset to default 1
        title="ResetMe Text Size"
        role="button"
        className="text-resizer-btn cursor-default"
      >
        A
      </button>
      <button
        onClick={() => changeFontSize(Math.max(0.8, fontModifier - 0.1))} // Minimum 0.8
        disabled={fontModifier <= 0.8}
        title="Decrease Text Size"
        role="button"
        className="text-resizer-btn disabled:opacity-50"
      >
        A-
      </button>
      
    </div>
  );
};

export default TextResizer;