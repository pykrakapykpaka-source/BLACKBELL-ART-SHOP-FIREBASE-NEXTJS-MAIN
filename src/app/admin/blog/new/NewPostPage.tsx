"use client";
import { renderMarkdown } from "@/lib/parseMarkdown";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import Link from "next/link";
import { useState } from "react";
import { FaLink, FaLongArrowAltLeft, FaSave, FaEye } from "react-icons/fa";
import * as Scroll from "react-scroll";
import PostImages from "./PostImages";
import SectionContentEditor from "./PostSections/SectionContentEditor";
import TagsHandler from "./TagsHandler";
import { EditorState } from "draft-js";
import EditSection from "../edit/EditSection";
import SectionsList from "./PostSections/SectionsList";
import FaqHandler from "./FaqHandler";
import { addDocument } from "@/firebase";
import { toast } from "react-toastify";
import Image from "next/image";
var randomId = require("random-id");

export default function NewPostPage() {
  const [input, setInput] = useState({
    postId: randomId(30, "aA0"),
    title: "",
    intro: "",
    outro: "",
    metaTitle: "",
    mainImage: "",
    metaDescription: "",
    sections: [],
    tags: [],
    faq: [],
    url: "",
    blogType: "",
    creationTime: Date.now(),
  });
  const [selectedSection, setSelectedSection] = useState({
    title: "",
    content: EditorState.createEmpty(),
    id: 0,
  });
  const [sectionEditorOpen, setSectionEditorOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const addSection = (title: string, content: EditorState) => {
    setInput((prevInput: any) => ({
      ...prevInput,
      sections: [...prevInput.sections, { title: title, content: content }],
    }));
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setInput((prevInput: any) => ({
        ...prevInput,
        tags: [...prevInput.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  let ScrollTo = Scroll.Link;

  const removeSection = (idx: number) => {
    const newSections = [...input.sections];
    newSections.splice(idx, 1);
    setInput({ ...input, sections: newSections });
  };

  const removeTag = (idx: number) => {
    const newTags = [...input.tags];
    newTags.splice(idx, 1);
    setInput({ ...input, tags: newTags });
  };

  const blogTypes = ["art", "tattoo", "design", "inspiration"];

  const validateForm = () => {
    if (!input.title.trim()) {
      toast.error("Tytuł jest wymagany");
      return false;
    }
    if (!input.blogType) {
      toast.error("Wybierz typ bloga");
      return false;
    }
    if (!input.intro.trim()) {
      toast.error("Wstęp jest wymagany");
      return false;
    }
    if (!input.mainImage.trim()) {
      toast.error("Główne zdjęcie jest wymagane");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await addDocument("blog", input.postId, input);
      toast.success("Post został utworzony pomyślnie!");
      // Reset form
      setInput({
        postId: randomId(30, "aA0"),
        title: "",
        intro: "",
        outro: "",
        metaTitle: "",
        mainImage: "",
        metaDescription: "",
        sections: [],
        tags: [],
        faq: [],
        url: "",
        blogType: "",
        creationTime: Date.now(),
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Błąd podczas tworzenia postu");
    } finally {
      setLoading(false);
    }
  };

  if (typeof window !== "undefined")
    return (
      <>
        <EditSection
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          selectedPost={input}
          setSelectedPost={setInput}
          setSectionEditorOpen={setSectionEditorOpen}
          sectionEditorOpen={sectionEditorOpen}
        />

        <div className="relative">
          <div className="flex justify-between items-center mb-8 pt-12 px-5">
            <Link
              href="/admin/blog"
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
            >
              <FaLongArrowAltLeft />
              Powrót do bloga
            </Link>
            <div className="flex gap-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <FaEye />
                {previewMode ? "Ukryj podgląd" : "Podgląd"}
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <FaSave />
                {loading ? "Zapisywanie..." : "Zapisz post"}
              </button>
            </div>
          </div>

          {previewMode ? (
            <div className="bg-white text-black p-8 rounded-lg max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-4">
                {input.title || "Tytuł postu"}
              </h1>
              {input.mainImage && (
                <Image
                  width={1000}
                  height={1000}
                  src={input.mainImage}
                  alt={input.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <div className="prose max-w-none">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Wstęp</h2>
                  <p>{input.intro || "Treść wstępu..."}</p>
                </div>

                {input.sections && input.sections.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Sekcje</h2>
                    {input.sections.map((section: any, index: number) => (
                      <div key={index} className="mb-4">
                        <h3 className="text-lg font-medium mb-2">
                          {section.title}
                        </h3>
                        <div
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {input.faq && input.faq.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">FAQ</h2>
                    {input.faq.map((item: any, index: number) => (
                      <div key={index} className="mb-4">
                        <h4 className="font-medium mb-1">{item.question}</h4>
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Zakończenie</h2>
                  <p>{input.outro || "Treść zakończenia..."}</p>
                </div>

                {input.tags && input.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {input.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 px-2 py-1 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 pt-0 pr-0 text-white gap-y-6 w-full">
              <div className="flex flex-col space-y-3 w-full bg-[#13151f] px-5 pb-12">
                <h1 className="w-full text-3xl text-white font-bold">
                  Nowy post
                </h1>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Typ bloga *
                    </label>
                    <select
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      value={input.blogType}
                      onChange={(e) => {
                        setInput({ ...input, blogType: e.target.value });
                      }}
                    >
                      <option value="">Wybierz rodzaj bloga</option>
                      {blogTypes.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Tytuł *
                    </label>
                    <textarea
                      placeholder="Wpisz tytuł..."
                      rows={3}
                      value={input.title}
                      onChange={(e) =>
                        setInput({ ...input, title: e.target.value })
                      }
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      URL
                    </label>
                    <input
                      type="text"
                      placeholder="url-postu"
                      value={input.url}
                      onChange={(e) =>
                        setInput({ ...input, url: e.target.value })
                      }
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Główne zdjęcie *
                    </label>
                    <input
                      type="text"
                      placeholder="URL zdjęcia"
                      value={input.mainImage}
                      onChange={(e) =>
                        setInput({ ...input, mainImage: e.target.value })
                      }
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Meta tytuł
                    </label>
                    <textarea
                      placeholder="Wpisz tytuł SEO... (max 60 znaków)"
                      rows={2}
                      value={input.metaTitle}
                      onChange={(e) =>
                        setInput({ ...input, metaTitle: e.target.value })
                      }
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                    />
                    <div className="text-sm text-gray-400 mt-1">
                      Pozostałe znaki: {60 - input.metaTitle.length}/60
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Meta opis
                    </label>
                    <textarea
                      placeholder="Wpisz opis SEO... (max 160 znaków)"
                      rows={3}
                      value={input.metaDescription}
                      onChange={(e) =>
                        setInput({ ...input, metaDescription: e.target.value })
                      }
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                    />
                    <div className="text-sm text-gray-400 mt-1">
                      Pozostałe znaki: {160 - input.metaDescription.length}/160
                    </div>
                  </div>
                </div>

                <div className="text-black">
                  <PostImages input={input} setInput={setInput} />
                </div>
              </div>

              <div className="flex flex-col space-y-3 w-full bg-[#13151f] px-5 pb-12">
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Wstęp *
                    </label>
                    <textarea
                      placeholder="Wpisz tekst..."
                      rows={6}
                      value={input.intro}
                      onChange={(e) =>
                        setInput({ ...input, intro: e.target.value })
                      }
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="text-black">
                    <SectionContentEditor
                      addSection={addSection}
                      removeSection={removeSection}
                    />
                    <SectionsList
                      input={input}
                      setSelectedSection={setSelectedSection}
                      setSectionEditorOpen={setSectionEditorOpen}
                      removeSection={removeSection}
                    />
                  </div>

                  <div className="text-black p-3 rounded-xl bg-[#222430]">
                    <FaqHandler setInput={setInput} input={input} />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Zakończenie
                    </label>
                    <textarea
                      placeholder="Wpisz tekst..."
                      rows={4}
                      value={input.outro}
                      onChange={(e) =>
                        setInput({ ...input, outro: e.target.value })
                      }
                      className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>

                  <TagsHandler
                    tagInput={tagInput}
                    setTagInput={setTagInput}
                    addTag={addTag}
                    removeTag={removeTag}
                    input={input}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );

  return null;
}
