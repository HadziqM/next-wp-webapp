import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import { InferGetServerSidePropsType } from "next/types";
import Layout from "../../components/layout";

export async function getServerSideProps() {
  const files = fs.readdirSync("markdown");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`markdown/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  });
  return { props: { posts } };
}

export default function WpPost({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
        {posts.map(({ slug, frontmatter }) => (
          <div
            key={slug}
            className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <Link
              href={`/md/${slug}`}
              className="flex flex-col justify-between items-center"
            >
              <Image
                width={200}
                height={120}
                alt={frontmatter.title}
                src={frontmatter.socialImage}
              />
              <h1 className="p-4">{frontmatter.title}</h1>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
