"use client";

import { readDocuments } from "@/config/firebaseStore";
import { useUserStore } from "@/context/useUserStore";
import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Read() {
  const [documents, setDocuments] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [tag, setTag] = useState('');
  const [selected, setSelected] = useState("all");
  const user = useUserStore((state) => state.user);

  const PAGE_SIZE = 9;

  const fetchPage = async (isNext = false) => {
  if (isNext) setLoadingMore(true);
  else setLoading(true);

  const { docs, lastVisible: newLast } = await readDocuments({
    pageSize: PAGE_SIZE,
    lastDoc: isNext ? lastVisible : null,
    tag: tag,
    email: selected === "mine" && user ? user.email : null
  });

  setDocuments(prev => isNext ? [...prev, ...docs] : docs);
  setLastVisible(newLast);

  if (isNext) setLoadingMore(false);
  else setLoading(false);
};


  const handleClick = () => {
    fetchPage(false);
  }

  useEffect(() => {
    fetchPage();
  }, [selected]);

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

      {/* Radio Button */}
      <div className="mb-8">
        <div className="relative flex w-fit rounded-xl bg-white/10 backdrop-blur-md shadow-[inset_1px_1px_4px_rgba(255,255,255,0.2),inset_-1px_-1px_6px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden">
          {/* ALL */}
          <input
            type="radio"
            id="all"
            name="filter"
            value="all"
            checked={selected === "all"}
            onChange={(e) => setSelected(e.target.value)}
            className="hidden"
          />
          <label
            htmlFor="all"
            className={`flex items-center justify-center min-w-[100px] px-6 py-2 cursor-pointer font-semibold text-sm transition-colors relative z-10 ${selected === "all" ? "text-white" : "text-gray-400 hover:text-gray-500"
              }`}
          >
            ALL
          </label>

          {/* ONLY MINE */}
          <input
            type="radio"
            id="only-mine"
            name="filter"
            value="mine"
            checked={selected === "mine"}
            onChange={(e) => setSelected(e.target.value)}
            className="hidden"
          />
          <label
            htmlFor="only-mine"
            className={`flex items-center justify-center min-w-[100px] px-6 py-2 cursor-pointer font-semibold text-sm transition-colors relative z-10 ${selected === "mine" ? "text-white" : "text-gray-400 hover:text-gray-500"
              }`}
          >
            ONLY MINE
          </label>

          {/* Glider */}
          <div
            className={`absolute top-0 bottom-0 w-1/2 rounded-xl transition-transform duration-500 ease-in-out ${selected === "all"
                ? "translate-x-0 bg-gradient-to-r from-purple-400/60 to-indigo-500 shadow-[0_0_18px_rgba(168,85,247,0.5),0_0_10px_rgba(255,255,255,0.4)_inset]"
                : "translate-x-full bg-gradient-to-r from-pink-400/60 to-rose-500 shadow-[0_0_18px_rgba(244,114,182,0.5),0_0_10px_rgba(255,255,255,0.4)_inset]"
              }`}
          />
        </div>
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
