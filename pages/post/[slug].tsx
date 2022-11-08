import { InferGetServerSidePropsType } from "next/types";
import Layout from "../../components/layout";
import { testingPost } from "../../lib/wp";
import Head from "next/head";
import { PrismaClient } from "@prisma/client";

interface query {
  slug: string;
}
interface input {
  query: query;
}

export async function getServerSideProps(context: input) {
  const { slug } = context.query;
  const res = await testingPost(slug);
  const prisma = new PrismaClient();
  const view = await prisma.post.findUnique({
    where: { slug: slug },
    select: { views: true },
  });
  if (view === null) {
    await prisma.post.create({ data: { slug: slug, views: 1 } });
  } else {
    await prisma.post.update({
      where: { slug: slug },
      data: { views: view.views + 1 },
    });
  }
  await prisma.$disconnect();
  return { props: { res } };
}

export default function Wordpress({
  res,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>{res.title} - Masjid Akbar Medhar Arifin</title>
        <meta name="description" content={res.title} />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <h1 className="text-center font-bold text-[2rem] mt-2">{res.title}</h1>
        <div
          className="wordpress"
          dangerouslySetInnerHTML={{ __html: res.content }}
        />
      </Layout>
    </>
  );
}
