import { listPosts, categorys } from "../../lib/wp";
import { Posts, Category } from "../../type";
import Corousel, { CorouselItem } from "../../components/corousel";
import Layout from "../../components/layout";
import JadwalDOM from "../../components/jadwal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Head from "next/head";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Cards from "../../components/card";
import { PrismaClient } from "@prisma/client";

export const getStaticProps = async function () {
  const prisma = new PrismaClient();
  const post: Promise<Posts> = listPosts();
  const headline: Promise<Category> = categorys("headline");
  const kajian: Promise<Category> = categorys("jadwalkajian");
  const khotib: Promise<Category> = categorys("jadwalkhutbah");
  const json = prisma.post.findMany({
    orderBy: { views: "desc" },
    select: { slug: true },
  });
  const [posts, headlines, jsons, j_kajian, j_khotib] = await Promise.all([
    post,
    headline,
    json,
    kajian,
    khotib,
  ]);
  const headLines =
    headlines.posts.nodes.length > 5
      ? headlines.posts.nodes.slice(0, 5)
      : headlines.posts.nodes;
  const mView = jsons.length > 3 ? jsons.slice(0, 3) : jsons;
  const viewMap = posts.edges.filter((e) =>
    mView.map((e) => e.slug).includes(e.node.slug)
  );
  const newMap = posts.edges.length > 3 ? posts.edges.slice(0, 3) : posts.edges;
  await prisma.$disconnect();
  return {
    props: {
      viewMap: viewMap,
      newMap: newMap,
      headline: headLines,
      kajian: j_kajian.posts.nodes[0],
      khotib: j_khotib.posts.nodes[0],
    },
    revalidate: 24 * 60 * 60,
  };
};

export default function Beranda({
  viewMap,
  headline,
  newMap,
  kajian,
  khotib,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const jadwal = [kajian, khotib];
  return (
    <>
      <Head>
        <title>Beranda - Masjid Akbar Medhar Arifin</title>
        <meta name="description" content="Listed Wordpress post" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <div className="container-out">
          <div className="container-in">
            <Corousel width={600} height={400} interval={5000}>
              {headline.map((e) => (
                <CorouselItem
                  slug={`/post/${e.slug}`}
                  url={e.featuredImage.node.link}
                  alt={e.title}
                  lebar={600}
                  height={400}
                >
                  <h2 className="m-2 w-full text-center text-black text-xl px-1">
                    {e.title}
                  </h2>
                </CorouselItem>
              ))}
            </Corousel>
            <div className="flex flex-col h-[400px] justify-between items-stretch">
              {jadwal.map((e) => (
                <JadwalDOM
                  img={e.featuredImage.node.link}
                  title={e.title}
                  slug={e.slug}
                  key={e.slug}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="container-out">
          <div className="container-in flex-col items-start">
            <div className="flex justify-start items-center p-1 border-black border-b-2 w-full">
              <h2 className="text-black bg-gold p-1">TERBARU</h2>
            </div>
            {newMap.map((e) => (
              <Cards
                key={e.node.slug}
                slug={e.node.slug}
                img={e.node.featuredImage.node.link}
                date={e.node.date}
                title={e.node.title}
                tags={
                  e.node.categories.nodes.filter(
                    (e) => e.name !== "Headline"
                  )[0].name
                }
              />
            ))}
          </div>
        </div>
        <div className="container-out">
          <div className="container-in flex-col items-start">
            <div className="flex justify-start items-center p-1 border-black border-b-2 w-full">
              <h2 className="text-black bg-gold p-1">TERPOPULER</h2>
            </div>
            {viewMap.map((e) => (
              <Cards
                img={e.node.featuredImage.node.link}
                title={e.node.title}
                date={e.node.date}
                tags={
                  e.node.categories.nodes.filter(
                    (e) => e.name !== "Headline"
                  )[0].name
                }
                key={e.node.slug}
                slug={e.node.slug}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
