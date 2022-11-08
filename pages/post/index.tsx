import { listPosts, categorys } from "../../lib/wp";
import { Posts, Category, Views } from "../../type";
import { promises as fs } from "fs";
import Router from "next/router";
import path from "path";
import Image from "next/image";
import Layout from "../../components/layout";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Head from "next/head";

interface Props {
  post: Posts;
  headline: Category;
  views: Views;
}
interface Sorted {
  img: string;
  title: string;
  date: string;
  tags: string;
}

export async function getStaticProps() {
  const post: Posts = await listPosts();
  const headline: Category = await categorys("headline");
  const fileDir = path.join(process.cwd(), `/wp-post-view/`);
  const data = String(await fs.readFile(fileDir + "view.json"));
  let json: Views = JSON.parse(data);
  return {
    props: {
      post: post,
      headline: headline,
      views: json,
    },
    revalidate: 1000,
  };
}

function Cards({ img, title, date, tags }: Sorted) {
  return (
    <div className=" flex flex-start p-2 items-center gap-2">
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
  const views1 = post.edges.filter(
    (e) => e.node.slug == views.views[0].slug
  )[0];
  const views2 = post.edges.filter(
    (e) => e.node.slug == views.views[1].slug
  )[0];
  const views3 = post.edges.filter(
    (e) => e.node.slug == views.views[2].slug
  )[0];
  const onClicked = function (i: number, t: any) {
    Router.push(`/post/${headline.posts.nodes[i].slug}`);
  };
  return (
    <>
      <Head>
        <title>Beranda - Masjid Akbar Medhar Arifin</title>
        <meta name="description" content="Listed Wordpress post" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <div className="flex flex-col justify-center items-center relative my-4">
          <h2 className="absolute p-2 bg-gold border-black border rounded-md z-50 top-1 -translate-x-[235px]">
            Berita Utama
          </h2>
          <Carousel
            autoPlay
            infiniteLoop
            interval={5000}
            width="600px"
            onClickItem={onClicked}
          >
            {headline.posts.nodes.map((e) => (
              <div style={{ cursor: "pointer" }}>
                <img src={e.featuredImage.node.link} alt={e.slug} />
                <p className="bg-gold p-2 text-lg my-2 rounded-md">{e.title}</p>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="container-out">
          <div className="container-in flex-col items-start">
            <div className="flex justify-start items-center p-1 border-black border-b-2 w-full">
              <h2 className="text-black bg-gold p-1">TERBARU</h2>
            </div>
            <Cards
              img={post.edges[0].node.featuredImage.node.link}
              title={post.edges[0].node.title}
              date={post.edges[0].node.date}
              tags={
                post.edges[0].node.categories.nodes.filter(
                  (e) => e.name !== "Headline"
                )[0].name
              }
            />
            <Cards
              img={post.edges[1].node.featuredImage.node.link}
              title={post.edges[1].node.title}
              date={post.edges[1].node.date}
              tags={
                post.edges[1].node.categories.nodes.filter(
                  (e) => e.name !== "Headline"
                )[0].name
              }
            />
            <Cards
              img={post.edges[2].node.featuredImage.node.link}
              title={post.edges[2].node.title}
              date={post.edges[2].node.date}
              tags={
                post.edges[2].node.categories.nodes.filter(
                  (e) => e.name !== "Headline"
                )[0].name
              }
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
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
