import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/components/posts/posts-grid";

const postsDirectory = path.join(process.cwd(), "posts");

type PostMetaData = Omit<Post, "slug" | "content"> & {
  isFeatured: boolean;
};

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier: string): Post {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug: postSlug,
    ...(data as Omit<Post, "slug" | "content">),
    content,
  };
}

interface PostData extends PostMetaData {
  slug: string;
  content: string;
}
export function getAllPosts() {
  const postFiles = getPostsFiles();
  const allPosts = postFiles.map((fileName) =>
    getPostData(fileName)
  ) as PostData[];
  return allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.isFeatured);
}

export function getPostBySlug(slug: string) {
  const allPosts = getAllPosts();
  return allPosts.find((post) => post.slug === slug);
}
