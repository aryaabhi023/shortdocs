"use client";

import { readDocuments } from "@/config/firebaseStore";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Read() {
  const [documents, setDocuments] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [tag, setTag] = useState('');
  const PAGE_SIZE = 9;

  const fetchPage = async (isNext = false) => {
  if (isNext) setLoadingMore(true);
  else setLoading(true);

  const { docs, lastVisible: newLast } = await readDocuments({
    pageSize: PAGE_SIZE,
    lastDoc: isNext ? lastVisible : null,
    tag: tag
  });

  setDocuments(prev => isNext ? [...prev, ...docs] : docs);
  setLastVisible(newLast);

  if (isNext) setLoadingMore(false);
  else setLoading(false);
};


  const handleClick = () => {
    fetchPage(false);
    setTag('');
  }

  useEffect(() => {
    fetchPage();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8] min-h-screen p-6 py-14 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 drop-shadow-lg">
        📄 Documents List
      </h1>

      <div className="flex mb-6 space-x-4 w-full max-w-6xl justify-center">
        <input
          type="text"
          placeholder="Search documents..."
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="mb-6 p-2 w-full max-w-md border border-gray-300 bg-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="mb-6 p-2 bg-blue-400 rounded-lg" onClick={handleClick}>Search</button>
      </div>

      {loading ? (
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      ) : documents.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No documents available.
        </div>
      ) : (
        <>
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
                  transition={{ delay: index * 0.05 }}
                  className="p-6 rounded-2xl shadow-lg bg-white/90 backdrop-blur-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 cursor-pointer h-48 flex flex-col"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {doc.title}
                  </h2>
                  <p className="text-gray-600 italic line-clamp-3">{doc.description}</p>
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="mt-auto pt-1">
                      {doc.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                        >
                          #{tag}
                        </span>

                      ))}
                    </div>
                  )}
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {lastVisible && (
            <button
              onClick={() => fetchPage(true)}
              disabled={loadingMore}
              className="mt-8 px-6 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 disabled:opacity-50"
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
