import { useEffect, useState } from "react";
import { usePostStore } from "./poststore";

const PostList = () => {
  const { posts, loading, error, fetchPosts, addPost, updatePost, deletePost } =
    usePostStore();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = () => {
    if (title.trim() === "" || body.trim() === "") return;

    if (editId) {
      updatePost(editId, { title, body });
    } else {
      addPost({ title, body });
    }
    setTitle("");
    setBody("");
    setEditId(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        📄 Post Manager
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 space-y-4">
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          rows={3}
        ></textarea>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all"
          onClick={handleSubmit}
        >
          {editId ? "Update Post" : "Add Post"}
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid gap-4">
        {posts.slice(0, 10).map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg p-5 flex flex-col space-y-2 border border-gray-100"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {post.title}
            </h2>
            <p className="text-gray-600">{post.body}</p>
            <div className="flex gap-2 mt-2">
              <button
                className="text-sm px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                onClick={() => {
                  setEditId(post.id);
                  setTitle(post.title);
                  setBody(post.body);
                }}
              >
                Edit
              </button>
              <button
                className="text-sm px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                onClick={() => deletePost(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
