"use client";

import { createDocument } from "@/config/firebaseStore";
import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/context/useUserStore";

import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

export default function Write() {
  const [content, setContent] = useState("**Hello world!!!**");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const [tags, setTags] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const DRAFT_KEY = "shortdocs:draft";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft.title) setTitle(draft.title);
        if (draft.description) setDescription(draft.description);
        if (draft.content) setContent(draft.content);
        if (Array.isArray(draft.tags)) setTags(draft.tags);
        if (typeof draft.isPrivate === "boolean") setIsPrivate(draft.isPrivate);
      }
    } catch (e) {
      console.warn("Could not load draft:", e);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        const draft = {
          title,
          description,
          content,
          tags,
          isPrivate,
        };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      } catch (e) {
        console.warn("Could not save draft:", e);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [title, description, content, tags, isPrivate]);

  const ClearAll = (e) => {
    e.preventDefault();
    setContent("");
    setTags([]);
    setTitle("");
    setDescription("");
    setIsPrivate(false);
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (e) {
      /* ignore */
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    try {
      await createDocument({
        title,
        description,
        content,
        name: user?.displayName,
        email: user?.email,
        tags: tags,
        private: isPrivate,
      });
      setTitle("");
      setDescription("");
      setContent("");
      setTags([]);
      setIsPrivate(false);
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch (e) {
        /* ignore */
      }
      router.push("/read");
    } catch (error) {
      console.error("Error saving document:", error);
    }
  };

  return (
    <div className="pt-8 bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8] w-full min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center my-4">
        Write Your Documentation
      </h1>
      <p className="text-center text-gray-600 mb-4 italic">
        Use Markdown to format your text
      </p>
      <form
        className="container mx-auto p-4 my-2 border border-emerald-300 rounded-lg shadow-lg bg-white w-6/7"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-end space-x-2 mb-4">
          <button
            className="bg-green-300 px-2 py-1 rounded-2xl cursor-pointer"
            type="submit"
          >
            Save
          </button>
          <button
            className="bg-red-300 px-2 py-1 rounded-2xl cursor-pointer"
            onClick={ClearAll}
          >
            Clear
          </button>
        </div>
        <label className="block mb-2 text-lg font-medium text-gray-700">
          Documentation Title:
        </label>
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="block mb-2 text-lg font-medium text-gray-700">
          Short Description:
        </label>
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Any Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="block mb-2 text-lg font-medium text-gray-700">
          Documentation Tags:
        </label>
        <ReactTagInput
          tags={tags}
          onChange={(newTags) =>
            setTags(newTags.map((tag) => tag.toUpperCase()))
          }
          placeholder="Enter tags"
        />
        <div className="flex items-center gap-3 m-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-orange-400 transition-all"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
          </label>

          <span className="text-sm font-medium text-gray-700">Private</span>

          {isPrivate && (
            <span className="text-xs text-orange-600 italic">
              Only you can see this document
            </span>
          )}
        </div>

        <label className="block mb-2 text-lg font-medium text-gray-700">
          Documentation Content:
        </label>
        <MDEditor value={content} onChange={setContent} />
        <MDEditor.Markdown
          source={content}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </form>
    </div>
  );
}
