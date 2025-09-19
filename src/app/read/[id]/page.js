'use client';
import { useState, useEffect, use } from "react";
import { deleteDocument, getDocumentById } from "@/config/firebaseStore";
import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/context/useUserStore";

export default function File({ params }) {
    const { id } = use(params);
    const user = useUserStore((state) => state.user);
    const router = useRouter();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        if (!id) return;
        const fetchDocument = async () => {
            try {
                const docData = await getDocumentById(id);
                setDocument(docData);
            } finally {
                setLoading(false);
            }
        };
        fetchDocument();
    }, [id]);

    const handleClick = () => {
        deleteDocument(id);
        router.push("/read");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>

                    {/* Loading Text */}
                    <p className="mt-4 text-lg font-medium text-gray-700 animate-pulse">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8] min-h-screen px-4 py-16">
                {display && 
                    <div className="fixed inset-0 bg-white/70 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-zinc-100 p-6 rounded-lg shadow-lg max-w-sm text-center">
                            Are You Sure You Want To Delete This Document?
                            <div className="mt-4 flex justify-center gap-4">
                                <button>
                                    <span
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={handleClick}
                                    > Yes </span>
                                </button>
                                <button>
                                    <span
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                        onClick={() => setDisplay(false)}
                                    > No 
                                    </span>
                                </button>
                            </div>  
                        </div>
                    </div>
                }
            <div className="relative max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-orange-200">

                {user && user.email === document?.email && (
                    <>
                        <button
                            className="cursor-pointer absolute md:top-4 md:right-4 top-2 right-2"
                            onClick={() => setDisplay(true)}
                        >
                            ❌
                        </button>
                        <Link
                            href={`/write/${id}`}
                            className="cursor-pointer absolute md:top-3.5 md:right-12 top-1.5 right-9"
                        >
                            ✏️
                        </Link>
                    </>
                )}

                <h1 className="text-3xl font-bold text-orange-600 pt-4">{document?.title}</h1>
                <p className="text-gray-700 italic">{document?.description}</p>
                <p className="text-sm text-gray-500">Author: {document?.name}</p>

                <div className="border-t pt-4" data-color-mode="light">
                    <MDEditor.Markdown
                        source={document?.content}
                        style={{ backgroundColor: "transparent" }}
                    />
                </div>
            </div>
        </div>
    );

}
