"use client";

import { createBlog } from "@/app/actions/blogs.action";
import { useActionState, useState } from "react";

const NewBlogPage = () => {
  const [state, dispatchAction, isPending] = useActionState(createBlog, {
    error: "",
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  return (
    <div className="p-4 max-w-sm">
      <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>

      <form action={dispatchAction} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="border p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            required
            className="border p-2"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="url">URL</label>
          <input
            id="url"
            name="url"
            type="url"
            required
            className="border p-2"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="likes">Likes</label>
          <input
            id="likes"
            name="likes"
            type="number"
            min="0"
            className="border p-2 no-spinner"
            value={likes}
            onChange={(e) => setLikes(parseInt(e.target.value))}
          />
        </div>

        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}

        <button type="submit" className="btn" disabled={isPending}>
          {isPending ? "Adding..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default NewBlogPage;
