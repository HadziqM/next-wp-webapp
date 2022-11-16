import Layout from "../../components/layout";
import { categorys } from "../../lib/wp";
import Head from "next/head";
import { PrismaClient } from "@prisma/client";
import { InferGetStaticPropsType } from "next";

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const [infaq, data] = await Promise.all([
    categorys("infaq"),
    prisma.infaq.findMany(),
  ]);
  return {
    props: {
      infaq: infaq.posts.nodes.filter((e) =>
        data.map((i) => i.slug).includes(e.slug)
      ),
      data: data,
    },
    revalidate: 24 * 60 * 60,
  };
}

export default function Infaq({
  data,
  infaq,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Infaq - Masjid Akbar Medhar Arifin</title>
        <meta name="description" content="Listed all categories in wordpress" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <h1>Work In Progress</h1>
      </Layout>
    </>
  );
}
