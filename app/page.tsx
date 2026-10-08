"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  async function saveGeneration() {
    if (!prompt || !content) {
      setMessage("Please enter both prompt and content.");
      return;
    }

    const { error } = await supabase.from("generations").insert({
      prompt,
      content,
      content_type: "text",
    });

    if (error) {
      console.error(error);
      setMessage("Error saving: " + error.message);
      return;
    }

    setMessage("✅ Saved to Supabase!");
    setPrompt("");
    setContent("");
  }

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">
          AI Content Studio
        </h1>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block font-medium">
              Prompt
            </label>

            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt..."
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Content
            </label>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter some content..."
              rows={6}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <button
            onClick={saveGeneration}
            className="rounded-lg bg-white px-5 py-3 font-medium text-black"
          >
            Save to Supabase
          </button>

          {message && (
            <p className="mt-4 font-medium">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}