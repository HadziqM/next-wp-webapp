import { listPosts, categorys } from "../../lib/wp";
import { Posts, Category, Views } from "../../type";
import { promises as fs } from "fs";
import Router from "next/router";
import path from "path";
import Layout from "../../components/layout";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Head from "next/head";

interface Props {
  post: Posts;
  headline: Category;
  views: Views;
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

export default function Beranda({ post, headline, views }: Props) {
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
      </Layout>
    </>
  );
}
