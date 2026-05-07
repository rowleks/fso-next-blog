const blogs = [
  {
    id: 1,
    title: "The Joys of Baking Sourdough",
    author: "Alice Peterson",
    url: "https://example.com/sourdough",
    likes: 12,
  },
  {
    id: 2,
    title: "Exploring the National Parks",
    author: "Bob Williams",
    url: "https://example.com/national-parks",
    likes: 25,
  },
  {
    id: 3,
    title: "Beginner's Guide to Python",
    author: "Charlie Davis",
    url: "https://example.com/python-guide",
    likes: 5,
  },
];

let id = 4;

export const getBlogs = () => {
  return blogs;
};

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id);
};

export const addLikes = (id: number) => {
  const blog = getBlogById(id);
  if (blog) {
    blog.likes++;
  }
};

export const addBlog = (
  title: string,
  author: string,
  url: string,
  likes: number,
) => {
  const newBlog = {
    id: id++,
    title,
    author,
    url,
    likes,
  };
  blogs.push(newBlog);
  return newBlog;
};
