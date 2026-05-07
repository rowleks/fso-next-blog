import { createBlog } from "@/app/actions/blogs.action";

const NewBlogPage = () => {
  return (
    <div className="p-4 max-w-sm">
      <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>

      <form action={createBlog} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="border p-2"
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
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="likes">Likes</label>
          <input
            id="likes"
            name="likes"
            type="number"
            min="0"
            defaultValue={0}
            className="border p-2 no-spinner"
          />
        </div>

        <button
          type="submit"
          className="border p-2 cursor-pointer mt-2 bg-blue-600"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default NewBlogPage;
