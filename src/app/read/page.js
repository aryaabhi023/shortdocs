"use client";

import { readDocuments } from "@/config/firebaseStore";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Read() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      const docs = await readDocuments();
      setDocuments(docs);
      setLoading(false);
    };
    fetchDocuments();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8] min-h-screen p-6 py-14 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 drop-shadow-lg">
        📄 Documents List
      </h1>

      {loading ? (
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      ) : documents.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No documents available.
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
        >
          {documents.map((doc, index) => (
            <Link key={doc.id} href={`/read/${doc.id}`}>
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl shadow-lg bg-white/90 backdrop-blur-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 cursor-pointer h-48 flex flex-col"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {doc.title}
                </h2>
                <p className="text-gray-600 italic line-clamp-3">{doc.description}</p>
              </motion.div>

            </Link>
          ))}
        </motion.div>
      )}

      {!loading && documents.length > 0 && (
        <p className="mt-8 text-gray-500 text-sm">
          Total Documents: <span className="font-semibold">{documents.length}</span>
        </p>
      )}
    </div>
  );
}
