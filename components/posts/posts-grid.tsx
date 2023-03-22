import PostItem from "@/components/posts/post-item";
import classes from "./posts-grid.module.css";

export interface Post {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string;
  content: string;
}
type Posts = Post[];
export default function PostsGrid(props: { posts: Posts }) {
  return (
    <ul className={classes.grid}>
      {props.posts.map((post) => (
        <PostItem post={post} key={post.slug} />
      ))}
    </ul>
  );
}
