import PostCard from "../../components/postCard";
import { InferGetServerSidePropsType } from "next/types";
import Layout from "../../components/layout";
import { posts } from "../../lib/wp";
import Link from "next/link";
interface Edges {
  edges: {
    node: {
      slug: string;
      title: string;
      date: string;
      excerpt: string;
      categories: {
        nodes: {
          name: string;
        }[];
      };
      author: {
        node: {
          name: string;
        };
      };
      featuredImage: {
        node: {
          link: string;
        };
      };
    };
  }[];
}
export async function getServerSideProps() {
  const res: Edges = await posts();
  return { props: { res } };
}

export default function WpPost({
  res,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // window.alert(JSON.stringify(res));
  return (
    <Layout>
      <div className="grid grid-cols-3 w-screen p-8">
        {res.edges.map((e) => (
          <Link
            href={`/post/${encodeURIComponent(e.node.slug)}`}
            className="m-2"
            key={e.node.slug}
          >
            <PostCard
              title={e.node.title}
              description={e.node.excerpt}
              date="<p>hello world!</p>"
              author={e.node.author.node.name}
              link={e.node.featuredImage.node.link}
              category={e.node.categories.nodes}
            />
          </Link>
        ))}
      </div>
    </Layout>
  );
}
