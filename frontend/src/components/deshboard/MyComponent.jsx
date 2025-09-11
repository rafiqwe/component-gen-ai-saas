import { useEffect, useMemo, useState } from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";
import { ClipboardCopy, ClipboardCheck, Code2 } from "lucide-react";
import API from "../../services/api";
import {
  detectComponents,
  detectDefaultExportName,
  stripESM,
} from "./PreviewBox";
import PreviewBoxIcon from "./PreviewPopUp";
import Seo from "../Seo";

const MyComponents = ({ userToken }) => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCodeIndex, setShowCodeIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // ✅ Prepare preview code safely
  const processedComponents = useMemo(() => {
    return components.map((comp) => {
      const defaultName = detectDefaultExportName(comp.code);
      const componentNames = detectComponents(comp.code);
      const chosen = defaultName || componentNames[0] || null;

      let safe = stripESM(comp.code);

      const userAlreadyRenders = /<\s*[A-Z][\w]*/.test(safe);

      if (!userAlreadyRenders && chosen) {
        safe += `\n\nrender(<${chosen} />);`;
        return { ...comp, finalCode: safe, useNoInline: true };
      }

      return {
        ...comp,
        finalCode: safe,
        useNoInline: userAlreadyRenders ? false : true,
      };
    });
  }, [components]);

  // ✅ Fetch user components
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const res = await API.get("/api/components");
        if (res.status === 200) {
          setComponents(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComponents();
  }, [userToken]);

  // ✅ Copy code function
  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // ✅ Loading state
  if (loading)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-gray-400 animate-pulse text-lg">
          Loading your components...
        </p>
      </div>
    );

  // ✅ Empty state
  if (!components.length)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-3">
        <p className="text-gray-300 text-lg font-medium">
          No components generated yet 🚀
        </p>
        <p className="text-gray-500 text-sm">
          Try creating something in the Playground!
        </p>
      </div>
    );

  return (
    <>
      <Seo
        title="Components – GenAi"
        description="Browse and manage your generated components inside GenAi. Easily copy and organize your AI-powered code snippets."
        url={`${import.meta.env.WEBSITE_URL}/genAi/my-component`}
        noindex={true}
      />

      <div className="flex flex-col w-full gap-6 p-6 bg-gray-950 text-gray-200">
        <h1 className="text-3xl font-bold text-white">⚡ My Components</h1>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processedComponents.map((comp, i) => (
            <div
              key={i}
              className="bg-gray-900 hover:bg-gray-850 transition rounded-2xl shadow-xl overflow-hidden flex flex-col border border-gray-700"
            >
              {/* Card Header */}
              <div className="px-5 py-3 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-base font-semibold line-clamp-1 text-gray-100">
                  {comp.prompt || "Untitled Component"}
                </h2>
                <div className="flex items-center gap-2">
                  {/* Toggle code button */}
                  <button
                    onClick={() =>
                      setShowCodeIndex(showCodeIndex === i ? null : i)
                    }
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
                  >
                    <Code2 className="w-4 h-4 text-indigo-400" />
                  </button>

                  {/* Fullscreen preview button */}
                  <PreviewBoxIcon
                    finalCode={comp.finalCode}
                    useNoInline={comp.useNoInline}
                  />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1">
                {showCodeIndex === i ? (
                  <div className="flex flex-col gap-3">
                    {/* Copy button */}
                    <button
                      onClick={() => handleCopy(comp.code, i)}
                      className="self-end flex items-center gap-2 px-3 py-1.5 text-xs font-medium 
                      text-gray-200 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                    >
                      {copiedIndex === i ? (
                        <>
                          <ClipboardCheck className="w-4 h-4 text-green-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <ClipboardCopy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>

                    {/* Syntax highlighted code */}
                    <SyntaxHighlighter
                      language="jsx"
                      style={oneDark}
                      className="w-full h-65 rounded-lg overflow-auto text-sm"
                    >
                      {comp.code}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  // Live preview mode
                  <LiveProvider
                    code={comp.finalCode}
                    scope={{ React }}
                    noInline={comp.useNoInline}
                  >
                    {/* 🔑 FIX: equal height card preview */}
                    <div className="w-full h-[280px] flex items-center justify-center p-4 rounded-lg bg-gray-800 shadow-inner overflow-y-auto">
                      <LivePreview />
                    </div>
                    <LiveError className="text-red-400 mt-2 text-xs font-mono" />
                  </LiveProvider>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyComponents;
