import PostContent from "@/pages/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "@/lib/posts-util";
import { GetStaticPropsContext } from "next";
import { Post } from "@/components/posts/posts-grid";
import Head from "next/head";

export default function SinglePost(props: { postData: Post }) {
  return (
    <>
      <Head>
        <title>{props.postData.title}</title>
        <meta name="description" content={props.postData.excerpt} />
      </Head>
      <PostContent postData={props.postData} />
    </>
  );
}

export function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const { slug } = context.params!;
  const postData = getPostData(slug);
  return {
    props: {
      postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFileNames = getPostsFiles();
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
