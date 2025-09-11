import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  ClipboardCheckIcon,
  ClipboardCopy,
  Download,
  Info,
  LoaderIcon,
} from "lucide-react";
import API from "../../services/api";
import PreviewBox from "./PreviewBox";
import { SuccessNotification } from "../SuccessNotification";
import { toast, ToastContainer } from "react-toastify";
import CodeEditor from "./CodeEditor";
import Seo from "../Seo";

// const initialCode = `
// const Card = () => (
//   <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto my-8">
//     <h2 className="text-xl font-semibold text-gray-800 mb-2">Card Title</h2>
//     <p className="text-gray-700 text-base mb-4">
//       This is a demo card with some placeholder text. It showcases how a simple React component can be styled using Tailwind CSS for a clean and modern look.
//     </p>
//     <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
//       Learn More
//     </button>
//   </div>
// );

// <Card />
// `;

const GenerateComponent = () => {
  const [code, setCode] = useState("");
  const [generated, setGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [usage, setUsage] = useState({ percent: 0 });

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const { data } = await API.get("/api/usage/stats");
        setUsage(data);
      } catch (err) {
        console.error("Failed to load usage:", err);
      }
    };
    fetchUsage();
  }, []);

  const handleGenerate = async () => {
    if (usage.percent >= 100) return;
    if (!prompt.trim()) return alert("Please enter a prompt!");
    setIsLoading(true); // 👈 move here
    try {
      const res = await API.post("/api/generate", { prompt: prompt });
      if (res.status === 200) {
        const data = res.data;
        await API.post("/api/usage/increment");
        setCode(data.code);
        setGenerated(true);
      }
    } catch (error) {
      console.log("Generate component error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveComponent = async () => {
    try {
      const componentDetails = {
        prompt: prompt,
        title: "Generated Component",
        code: code,
      };
      const res = await API.post("/api/components", componentDetails);
      const data = res.data;
      if (res.status === 201) {
        toast.success(` ✅ ${data.title} Saved`);
        setIsDisabled(true);
      }
    } catch (error) {
      toast.error(
        `❌ Failed to save: ${
          error.response?.data?.message || error.message || "Network error"
        }`
      );
      console.log("Save Component error:", error);
    }
  };

  return (
    <>
      <Seo
        title="Generate Components – GenAi"
        description="Use GenAi to instantly generate React components with AI. Customize and copy your code in seconds."
        url="https://yourdomain.com/generate"
        noindex={true}
      />
      <div className="flex flex-col w-full h-full p-4  md:p-8  text-gray-200 min-h-screen">
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            ⚡ GenAi Playground
          </h1>
          <p className="text-gray-400 max-w-3xl w-full mx-auto text-base md:text-lg px-4">
            Generate, edit, and preview React components in real-time. Enter
            your idea below and hit{" "}
            <span className="font-semibold text-indigo-400">Generate</span> to
            get started.
          </p>
        </div>
        {generated && (
          <div className="w-3/4 mx-auto mb-4 flex items-start gap-3 rounded-xl border border-yellow-400 bg-yellow-100/90 px-4 py-3 shadow-sm">
            <span className="text-yellow-600 mt-0.5">
              <Info className="w-5 h-5" />
            </span>
            <p className="text-sm font-medium text-yellow-900">
              Preview might not be visible, but don’t worry — your code is still
              working correctly.
            </p>
          </div>
        )}

        {/* Prompt Input */}
        {!generated && (
          <div className="flex flex-col items-center justify-center p-6 md:p-10 bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-3xl shadow-xl space-y-4">
            <input
              type="text"
              disabled={usage.percent >= 100}
              placeholder="e.g., A modern card component with hover effects"
              className="w-full md:w-2/3 px-4 py-3 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-200 font-medium placeholder-gray-500 text-sm md:text-base"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              className={`px-6 md:px-8 py-2.5 md:py-3 ${
                usage.percent >= 100
                  ? "bg-indigo-950 text-gray-400"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              } cursor-pointer font-semibold rounded-2xl shadow-lg transition w-full md:w-auto`}
              disabled={usage.percent >= 100}
            >
              {usage.percent >= 100 ? (
                "Limit Reached"
              ) : isLoading ? (
                <span className="flex items-center gap-2">
                  <LoaderIcon className="animate-spin w-4 h-4" />
                  Generating...
                </span>
              ) : (
                "Generate Component"
              )}
            </button>

            <p
              className={`${
                usage.percent >= 100
                  ? "text-red-500 font-bold"
                  : "text-gray-500"
              }  text-center max-w-lg text-sm md:text-base`}
            >
              {usage.percent >= 100
                ? "You’ve reached your monthly limit. Please upgrade or wait for reset."
                : "Once generated, you'll be able to live-edit and preview your component instantly."}
            </p>
          </div>
        )}
        {/* Success Message */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {/* Editor + Preview */}
        {generated && (
          <>
            <div className="mt-5 flex items-center justify-center w-full">
              <button
                onClick={handleSaveComponent}
                className="flex items-center gap-3 px-4 py-2 rounded-xl transition-all font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md cursor-pointer"
                disabled={isDisabled}
              >
                Save Component
              </button>
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-6 mt-6">
              {/* Code Editor */}
              {/* <div className="flex-1 bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-gray-800 bg-gray-800">
                <span className="text-sm font-semibold text-indigo-400 flex items-center gap-2">
                  💻 <span className="hidden sm:inline">Editor</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center cursor-pointer gap-1 px-3 py-1.5 text-xs font-medium text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors shadow-sm"
                  >
                    {iscopy ? (
                      <ClipboardCheckIcon className="w-4 h-4 text-green-400" />
                    ) : (
                      <ClipboardCopy className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">
                      {iscopy ? "Copied" : "Copy"}
                    </span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-200 bg-gray-700 cursor-pointer rounded-lg hover:bg-gray-600 transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4 text-indigo-400" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              </div>
              <Editor
                height="50vh"
                defaultLanguage="javascript"
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
              />
            </div> */}
              <CodeEditor code={code} setCode={setCode} />
              {/* Live Preview */}
              <PreviewBox code={code} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GenerateComponent;
