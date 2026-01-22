import React, { useMemo } from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import PreviewBoxIcon from "./PreviewPopUp";

/* -------------------------------------------------
   Helpers
--------------------------------------------------*/

// Remove imports / exports (react-live can’t run them)
export const stripESM = (src) => {
  let s = src;

  s = s.replace(/^\s*import[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, "");
  s = s.replace(/^\s*export\s*{[\s\S]*?};?\s*$/gm, "");
  s = s.replace(/export\s+default\s+/g, "");

  return s.trim();
};

// Detect default export component name
export const detectDefaultExportName = (src) => {
  let m;
  if ((m = src.match(/export\s+default\s+function\s+([A-Z]\w*)/))) return m[1];
  if ((m = src.match(/export\s+default\s+class\s+([A-Z]\w*)/))) return m[1];
  if ((m = src.match(/export\s+default\s+const\s+([A-Z]\w*)/))) return m[1];
  if ((m = src.match(/export\s+default\s+([A-Z]\w*)/))) return m[1];
  return null;
};

// Detect all React components
export const detectComponents = (src) => {
  const names = new Set();

  for (const m of src.matchAll(/function\s+([A-Z]\w*)\s*\(/g)) {
    names.add(m[1]);
  }

  for (const m of src.matchAll(
    /const\s+([A-Z]\w*)\s*=\s*(?:\([^)]*\)|[A-Za-z0-9_]+)\s*=>/g
  )) {
    names.add(m[1]);
  }

  for (const m of src.matchAll(/class\s+([A-Z]\w*)\s+/g)) {
    names.add(m[1]);
  }

  return Array.from(names);
};

/* -------------------------------------------------
   Preview Engine
--------------------------------------------------*/

const PreviewBox = ({ code }) => {
  const { finalCode } = useMemo(() => {
    // 1️⃣ Pick component to render
    const defaultName = detectDefaultExportName(code);
    const components = detectComponents(code);
    const chosen = defaultName || components[0] || null;

    // 2️⃣ Clean code
    let safe = stripESM(code);

    // 3️⃣ Check if render() already exists
    const hasRenderCall = /\brender\s*\(/.test(safe);

    // 4️⃣ ALWAYS force render if missing
    if (!hasRenderCall && chosen) {
      safe += `\n\nrender(<${chosen} />);`;
    }

    return { finalCode: safe };
  }, [code]);

  return (
    <div className="flex-1 bg-gray-900 w-full rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-gray-800 bg-gray-800">
        <span className="text-sm text-gray-300 font-medium flex items-center gap-2">
          👀 Live Preview
        </span>

        <PreviewBoxIcon finalCode={finalCode} />
      </div>

      {/* Preview */}
      <div className="p-4 md:p-6 h-[50vh] w-full overflow-auto flex items-center justify-center">
        <LiveProvider
          code={finalCode}
          noInline={true}
          scope={{
            React,
            useState: React.useState,
            useEffect: React.useEffect,
            useRef: React.useRef,
            useMemo: React.useMemo,
            useCallback: React.useCallback,
          }}
        >
          <div className="w-full min-h-[200px] flex items-center justify-center p-6 rounded-2xl bg-gray-950 shadow-inner">
            <LivePreview />
          </div>

          <LiveError className="text-red-400 mt-4 font-mono text-sm text-center" />
        </LiveProvider>
      </div>
    </div>
  );
};

export default PreviewBox;
