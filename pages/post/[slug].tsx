import { InferGetServerSidePropsType } from "next/types";
import Layout from "../../components/layout";
import { testingPost } from "../../lib/wp";

interface query {
  slug: string;
}
interface input {
  query: query;
}

export async function getServerSideProps(context: input) {
  const { slug } = context.query;
  const res = await testingPost(slug);
  return { props: { res } };
}

export default function Wordpress({
  res,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <h1 className="text-center font-bold text-[2rem] my-4">{res.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: res.content }} />
    </Layout>
  );
}
