"use client";

import { useEffect,useState,use } from "react";
import { updateDocument,getDocumentById } from "@/config/firebaseStore";
import MDEditor from '@uiw/react-md-editor';
import { useRouter } from "next/navigation";
import { useUserStore } from "@/context/useUserStore";

import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

export default function Edit({params}) {
  
  const [content, setContent] = useState("**Hello world!!!**");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

   const [tags, setTags] = useState([]);

  const { id } = use(params);
  const router = useRouter();

    const user = useUserStore((state) => state.user);

    useEffect(() => {
        if (!id) return;
        const fetchDocument = async () => {
            try {
                const docData = await getDocumentById(id);
                setContent(docData.content);
                setDescription(docData.description);
                setTitle(docData.title);
                setEmail(docData.email);
                setTags(docData.tags || []);
            } finally {
                setLoading(false);
            }
        };
        fetchDocument();
    }, [id]);

  const ClearAll = (e) => {
    e.preventDefault();
    setContent("");
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    if(user?.email !== email){
        alert("You are not authorized to edit this document.");
        return;
    }
    try {
        await updateDocument(id,{
        title: title,
        description: description,
        content: content,
        tags:tags,
        name: user?.displayName,
        email: user?.email,
        });
        setTitle("");
        setDescription("");
        setContent("");
        setTags([]);
        router.push(`/read/${id}`);
    } catch (error) {
      console.error("Error saving document:", error);
    }
  }

   if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>

                    {/* Loading Text */}
                    <p className="mt-4 text-lg font-medium text-gray-700 animate-pulse">
                        Wait...
                    </p>
                </div>
            </div>
        );
    }

  return (
    <div className="pt-8 bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8] w-full min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center my-4">Write Your Documentation</h1>
      <p className="text-center text-gray-600 mb-4 italic">Use Markdown to format your text</p>
      <form className="container mx-auto p-4 my-2 border border-emerald-300 rounded-lg shadow-lg bg-white w-6/7" onSubmit={handleSubmit}>
        <div className="flex justify-end space-x-2 mb-4">
          <button className="bg-green-300 px-2 py-1 rounded-2xl cursor-pointer" type="submit">Save</button>
          <button className="bg-red-300 px-2 py-1 rounded-2xl cursor-pointer" onClick={ClearAll}>Clear</button>
        </div>
        <label className="block mb-2 text-lg font-medium text-gray-700">Documentation Title:</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="block mb-2 text-lg font-medium text-gray-700">Short Description:</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Any Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="block mb-2 text-lg font-medium text-gray-700">Documentation Tags:</label>
        <ReactTagInput
          tags={tags}
          onChange={(newTags) => setTags(newTags)}
          placeholder="Enter tags"
        />
        <label className="block mb-2 text-lg font-medium text-gray-700">Documentation Content:</label>
        <MDEditor
          value={content}
          onChange={setContent}
        />
        <MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap' }} />
      </form>
    </div>
  );
}