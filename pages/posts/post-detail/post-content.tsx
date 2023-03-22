import PostHeader from "@/pages/posts/post-detail/post-header";
import classes from "./post-content.module.css";
import ReactMarkdown, { Components } from "react-markdown";
import { Post } from "@/components/posts/posts-grid";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function PostContent(props: { postData: Post }) {
  const imagePath = `/images/posts/${props.postData.slug}/${props.postData.image}`;

  const customRenderers: Components = {
    p(paragraph) {
      const { node } = paragraph;
      if (
        node.children[0].type === "element" &&
        node.children[0].tagName === "img"
      ) {
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${props.postData.slug}/${node.children[0].properties?.src}`}
              alt={(node.children[0].properties?.alt as string) || "Image"}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
    code(code) {
      const { children, className } = code;
      const lang = className?.split("-")[1];
      console.log(code);
      return (
        <SyntaxHighlighter language={lang} style={atomDark}>
          {children as string | string[]}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader image={imagePath} title={props.postData.title} />
      <ReactMarkdown components={customRenderers}>
        {props.postData.content}
      </ReactMarkdown>
    </article>
  );
}
