import axios from "axios";
import { create } from "zustand";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;

  fetchPosts: () => Promise<void>;
  addPost: (newPost: Omit<Post, "id">) => Promise<void>;
  updatePost: (id: number, updatedPost: Partial<Post>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      set({ posts: res.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch posts", loading: false });
    }
  },

  addPost: async (newPost) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        newPost
      );
      set((state) => ({
        posts: [...state.posts, res.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to add post", loading: false });
    }
  },

  updatePost: async (id, updatedPost) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        updatedPost
      );
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, ...res.data } : post
        ),
        loading: false,
      }));
    } catch (err) {
      set({ error: "Failed to update post", loading: false });
    }
  },

  deletePost: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete post", loading: false });
    }
  },
}));
