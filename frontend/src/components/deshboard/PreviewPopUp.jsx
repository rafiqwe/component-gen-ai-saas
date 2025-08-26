import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize, X } from "lucide-react";
import React from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";

const PreviewPopup = ({ children, open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute z-99 inset-0 backdrop-blur-sm flex items-center justify-center "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Popup Box */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-[90%] h-[80vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Preview
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-6 overflow-auto">
              <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 w-full h-full flex items-center justify-center">
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PreviewBoxIcon = ({ finalCode, useNoInline }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setShowPreview(true)}
        className=" text-white rounded-lg shadow"
      >
        <Maximize size={20} />
      </button>

      <PreviewPopup open={showPreview} onClose={() => setShowPreview(false)}>
        {/* Render your component here */}
        {/* Render your component here */}
        <LiveProvider code={finalCode} scope={{ React }} noInline={useNoInline}>
          <div className="w-full min-h-full flex items-center justify-center p-4 rounded-2xl shadow-inner">
            <LivePreview />
          </div>
          <LiveError className="text-red-500 mt-2 text-sm font-mono" />
        </LiveProvider>
      </PreviewPopup>
    </div>
  );
};

export default PreviewBoxIcon;
