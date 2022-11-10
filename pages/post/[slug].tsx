import Layout from "../../components/layout";
import { testingPost, listPosts } from "../../lib/wp";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Posts } from "../../type";
import React from "react";

interface IParams extends ParsedUrlQuery {
  slug: string;
}
interface ApiJson {
  message?: string;
  view?: number;
}
interface Post {
  title: string;
  content: string;
}
interface Props {
  result: Post;
  slug: string;
  auth: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: Posts = await listPosts();
  const paths = data.edges.map((idk) => {
    const slug = idk.node.slug;
    return {
      params: { slug },
    };
  });
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams;
  const result = await testingPost(slug);
  if (result == null) return { notFound: true };
  if (result.content == undefined || result.title == undefined) {
    return { notFound: true };
  }
  return {
    props: {
      result: result,
      slug: slug,
      auth: process.env.NEXTAUTH_URL,
    },
    revalidate: 24 * 60 * 60,
  };
};
export default function Wordpress({ result, slug, auth }: Props) {
  let dataView;
  React.useEffect(() => {
    const getData = async () => {
      const data = await fetch(`${auth}/api/prisma/${slug}`);
      const json: ApiJson = await data.json();
      if (data.status == 400) {
        dataView = json.message;
      } else {
        dataView = json.view;
      }
    };
    getData().catch((e) => console.log(e));
  }, []);
  return (
    <>
      <Head>
        <title>{result.title} - Masjid Akbar Medhar Arifin</title>
        <meta name="description" content={result.title} />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <h1 className="text-center font-bold text-[2rem] mt-2">
          {result.title}
        </h1>
        <div
          className="wordpress"
          dangerouslySetInnerHTML={{ __html: result.content }}
        />
      </Layout>
    </>
  );
}
// export const getServerSideProps: GetServerSideProps = async function (context) {
//   const { slug } = context.query;
//   if (slug !== undefined && !(slug instanceof Array)) {
//     const result = testingPost(slug);
//     const prisma = new PrismaClient();
//     const views = prisma.post.findUnique({
//       where: { slug: slug },
//       select: { views: true },
//     });
//     const [res, view] = await Promise.all([result, views]);
//     if (res == null) return { notFound: true };
//     if (view === null) {
//       await prisma.post.create({ data: { slug: slug, views: 1 } });
//     } else {
//       await prisma.post.update({
//         where: { slug: slug },
//         data: { views: view.views + 1 },
//       });
//     }
//     await prisma.$disconnect();
//     return { props: { res } };
//   } else return { notFound: true };
// };
