import React from "react";

const DeshboardContent = ({ children }) => {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      {children || (
        <div className="text-center text-gray-500 mt-20">
          <h2 className="text-2xl font-bold">Welcome to your Dashboard 🎉</h2>
          <p className="mt-2">
            Select an option from the sidebar to get started.a
          </p>
        </div>
      )}
    </main>
  );
};

export default DeshboardContent;
