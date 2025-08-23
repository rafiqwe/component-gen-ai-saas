import React, { useMemo } from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";

// --- helpers -------------------------------------------------
export const stripESM = (src) => {
  let s = src;

  // remove single & multi-line ESM imports
  s = s.replace(/^\s*import[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, "");
  // remove "export {...}" statements
  s = s.replace(/^\s*export\s*{[\s\S]*?};?\s*$/gm, "");
  // remove "export default" keyword only (keep the identifier that follows)
  s = s.replace(/export\s+default\s+/g, "");

  return s.trim();
};

export const detectDefaultExportName = (src) => {
  let m;
  if ((m = src.match(/export\s+default\s+function\s+([A-Z]\w*)\s*\(/))) return m[1];
  if ((m = src.match(/export\s+default\s+class\s+([A-Z]\w*)\s+/))) return m[1];
  if ((m = src.match(/export\s+default\s+const\s+([A-Z]\w*)/))) return m[1];
  if ((m = src.match(/export\s+default\s+([A-Z]\w*)\s*;?/))) return m[1];
  return null;
};

export const detectComponents = (src) => {
  const names = new Set();
  for (const m of src.matchAll(/function\s+([A-Z]\w*)\s*\(/g)) names.add(m[1]);
  for (const m of src.matchAll(/const\s+([A-Z]\w*)\s*=\s*(?:\([^)]*\)|[A-Za-z0-9_]+)\s*=>/g)) names.add(m[1]);
  for (const m of src.matchAll(/class\s+([A-Z]\w*)\s+/g)) names.add(m[1]);
  return Array.from(names);
};
// -------------------------------------------------------------

const PreviewBox = ({ code }) => {
  const { finalCode, useNoInline } = useMemo(() => {
    // 1) pick default component to show
    const defaultName = detectDefaultExportName(code);
    const componentNames = detectComponents(code);
    const chosen = defaultName || componentNames[0] || null;

    // 2) sanitize for react-live
    let safe = stripESM(code);

    // 3) if user already wrote JSX usage like <Card /> or <Header />,
    //    don't auto-append anything
    const userAlreadyRenders = /<\s*[A-Z][\w]*/.test(safe);

    // 4) if nothing is rendered, auto-render the chosen component
    //    using render(...) and turn on noInline
    if (!userAlreadyRenders && chosen) {
      safe += `\n\nrender(<${chosen} />);`;
      return { finalCode: safe, useNoInline: true };
    }

    // 5) otherwise pass through as-is
    //    if it’s just raw JSX, noInline can be false
    return { finalCode: safe, useNoInline: userAlreadyRenders ? false : true };
  }, [code]);

  return (
    <div className="flex-1 bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-gray-800 bg-gray-800 mb-5">
        <span className="text-sm text-gray-300 font-medium flex items-center gap-2">
          👀 Live Preview
        </span>
      </div>

      <div className="p-4 md:p-6 h-[50vh] overflow-auto flex items-center justify-center ">
        <LiveProvider
          code={finalCode}
          // expose common hooks so users can write `useState()` etc. without imports
          scope={{
            React,
            useState: React.useState,
            useEffect: React.useEffect,
            useRef: React.useRef,
            useMemo: React.useMemo,
            useCallback: React.useCallback,
          }}
          noInline={useNoInline}
        >
          <div className="w-full  min-h-[200px] flex items-center justify-center p-6 rounded-2xl bg-gray-950 shadow-inner transition-all duration-300">
            <LivePreview />
          </div>
          <LiveError className="text-red-400 mt-4 font-mono text-sm text-center" />
        </LiveProvider>
      </div>
    </div>
  );
};

export default PreviewBox;
