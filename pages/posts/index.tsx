import AllPosts from "@/pages/posts/all-posts";
import { DUMMY_POSTS } from "@/mock/DUMMY_POSTS";

export default function Posts() {
  return <AllPosts posts={DUMMY_POSTS} />;
}
