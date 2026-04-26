import React from "react";

export default function Footer() {
  return (
    <footer
      className="relative bottom-0 left-0 w-full z-[-1] bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8]"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto py-3 px-4 flex justify-center items-center">
        <p className="text-sm text-gray-600">Made with ❤️ by Abhishek Arya</p>
      </div>
    </footer>
  );
}
