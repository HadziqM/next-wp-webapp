import { listPosts, categorys } from "../../lib/wp";
import { Posts, Category } from "../../type";
import Corousel, { CorouselItem } from "../../components/corousel";
import Router from "next/router";
import Image from "next/image";
import Layout from "../../components/layout";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Head from "next/head";
import { GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";

interface Props {
  post: Posts;
  headline: Category;
  views: {
    slug: string;
  }[];
}
interface Sorted {
  img: string;
  title: string;
  date: string;
  tags: string;
  slug: string;
}

export const getStaticProps: GetStaticProps = async function (context) {
  const post: Posts = await listPosts();
  const headline: Category = await categorys("headline");
  const prisma = new PrismaClient();
  const json = await prisma.post.findMany({
    orderBy: { views: "desc" },
    select: { slug: true },
  });
  await prisma.$disconnect();
  return {
    props: {
      post: post,
      headline: headline,
      views: json,
    },
    revalidate: 1000,
  };
};

function Cards({ img, title, date, tags, slug }: Sorted) {
  const onClicked = function () {
    Router.push(`/post/${slug}`);
  };
  return (
    <div
      className=" flex flex-start p-2 items-center gap-2 cursor-pointer hover:bg-[rgba(0,0,0,0.1)] w-full"
      onClick={onClicked}
    >
      <Image src={img} alt={title} width={161} height={90} />
      <div
        className="flex flex-col justify-between py-1"
        style={{ height: "90px" }}
      >
        <h2 className="text-black text-2xl font-normal">{title}</h2>
        <div className="flex gap-1 flex-start">
          <p className="text-gold uppercase mr-4">{tags}</p>
          <p className="uppercase font-light">
            {String(new Date(date)).replace("GMT+0700 (Indochina Time)", "")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Beranda({ post, headline, views }: Props) {
  const views1 = post.edges.filter((e) => e.node.slug == views[0].slug)[0];
  const views2 = post.edges.filter((e) => e.node.slug == views[1].slug)[0];
  const views3 = post.edges.filter((e) => e.node.slug == views[2].slug)[0];
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
              {headline.posts.nodes.map((e) => (
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
          </div>
        </div>
        <div className="container-out">
          <div className="container-in flex-col items-start">
            <div className="flex justify-start items-center p-1 border-black border-b-2 w-full">
              <h2 className="text-black bg-gold p-1">TERBARU</h2>
            </div>
            <Cards
              key={post.edges[0].node.slug}
              img={post.edges[0].node.featuredImage.node.link}
              title={post.edges[0].node.title}
              date={post.edges[0].node.date}
              tags={
                post.edges[0].node.categories.nodes.filter(
                  (e) => e.name !== "Headline"
                )[0].name
              }
              slug={post.edges[0].node.slug}
            />
            <Cards
              key={post.edges[1].node.slug}
              img={post.edges[1].node.featuredImage.node.link}
              title={post.edges[1].node.title}
              date={post.edges[1].node.date}
              tags={
                post.edges[1].node.categories.nodes.filter(
                  (e) => e.name !== "Headline"
                )[0].name
              }
              slug={post.edges[1].node.slug}
            />
            <Cards
              key={post.edges[2].node.slug}
              img={post.edges[2].node.featuredImage.node.link}
              title={post.edges[2].node.title}
              date={post.edges[2].node.date}
              tags={
                post.edges[2].node.categories.nodes.filter(
                  (e) => e.name !== "Headline"
                )[0].name
              }
              slug={post.edges[2].node.slug}
            />
          </div>
        </div>
        <div className="container-out">
          <div className="container-in flex-col items-start">
            <div className="flex justify-start items-center p-1 border-black border-b-2 w-full">
              <h2 className="text-black bg-gold p-1">TERPOPULER</h2>
            </div>
            <Cards
              img={views1.node.featuredImage.node.link}
              title={views1.node.title}
              date={views1.node.date}
              tags={
                views1.node.categories.nodes.filter(
                  (e) => e.name !== "Headline"
                )[0].name
              }
              slug={views1.node.slug}
              key={views1.node.slug}
            />
            <Cards
              img={views2.node.featuredImage.node.link}
              title={views2.node.title}
              date={views2.node.date}
              tags={
                views2.node.categories.nodes.filter(
                  (e) => e.name !== "Headline"
                )[0].name
              }
              slug={views2.node.slug}
              key={views2.node.slug}
            />
            <Cards
              img={views3.node.featuredImage.node.link}
              title={views3.node.title}
              date={views3.node.date}
              tags={
                views3.node.categories.nodes.filter(
                  (e) => e.name !== "Headline"
                )[0].name
              }
              slug={views3.node.slug}
              key={views3.node.slug}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
