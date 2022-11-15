import Layout from "../../components/layout";
import { categorys } from "../../lib/wp";
import Head from "next/head";
import { PrismaClient } from "@prisma/client";
import Slug from "../api/comments/[slug]";

// export async function getStaticProps() {
//   const prisma = new PrismaClient();
//   const infaq = await categorys("infaq");
//   const data = await Promise.all(
//     infaq.posts.nodes.map(async (e) => {
//       return await prisma.post.findUnique({
//         where: { slug: e.slug },
//         include: { infaq: true, infaq_trf: true },
//       });
//     })
//   );
//   return {
//     props: {},
//     revalidate: 24 * 60 * 60,
//   };
// }

export default function Infaq() {
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
