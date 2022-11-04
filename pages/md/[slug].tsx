import fs from "fs";
import matter from "gray-matter";
import { InferGetServerSidePropsType } from "next/types";
import Layout from "../../components/layout";
import md from "markdown-it";

interface Input {
  query: {
    slug: string;
  };
}

export async function getServerSideProps(context: Input) {
  const { slug } = context.query;
  const readFile = fs.readFileSync(`markdown/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(readFile);
  return { props: { frontmatter, content } };
}

export default function Markdown({
  frontmatter,
  content,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <div className="prose mx-auto">
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </div>
    </Layout>
  );
}
