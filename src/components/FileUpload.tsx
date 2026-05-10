"use client";

import { useState } from "react";

interface FileUploadProps {
  onTextExtracted: (text: string) => void;
  fallbackText: string;
}

export default function FileUpload({ onTextExtracted, fallbackText }: FileUploadProps) {
  // To keep things simple and professional as requested (Option 2 choice -> text based extraction), 
  // we will just provide a clean text area for resume content.
  // Real PDF extraction requires complex backend processing or thick client libraries like PDF.js.

  return (
    <div style={{ width: '100%' }}>
      <textarea
        className="input textarea"
        placeholder="Paste your resume text here..."
        value={fallbackText}
        onChange={(e) => onTextExtracted(e.target.value)}
        required
        maxLength={25000000} // approx 25mb text limit
        style={{ minHeight: '200px' }}
      />
      <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
        For this prototype, please paste the text content of your resume above.
      </div>
    </div>
  );
}
