import { Category } from "../../../type";
import { InferGetServerSidePropsType } from "next/types";
import Layout from "../../../components/layout";
import { categorys } from "../../../lib/wp";

interface Input {
  query: {
    slug: string;
  };
}
export async function getServerSideProps(context: Input) {
  const { slug } = context.query;
  const res: Category = await categorys(slug);
  return { props: { res } };
}

export default function Wordpress({
  res,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <p>{res.name}</p>
      {res.posts.nodes.map((e) => (
        <>
          <p>{e.title}</p>
          <p>{e.date}</p>
          <p>{e.slug}</p>
          <img src={e.featuredImage.node.link} alt="" />
        </>
      ))}
    </Layout>
  );
}
