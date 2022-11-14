import { listPosts, categorys } from "../../../lib/wp";
import Layout from "../../../components/layout";
import Head from "next/head";
import Dropdown from "../../../components/dropdown";
import { InferGetStaticPropsType } from "next";
import Cards from "../../../components/card";
import { PrismaClient } from "@prisma/client";
import React from "react";

interface Props {
  elementClick: (title: string) => void;
  elements: string;
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const [
    listPost,
    agenda,
    jadwalkajian,
    jadwalkhutbah,
    kajian,
    khutbah,
    podcast,
  ] = await Promise.all([
    listPosts(),
    categorys("agenda"),
    categorys("jadwalkajian"),
    categorys("jadwalkhutbah"),
    categorys("kajian"),
    categorys("khutbah"),
    categorys("podcast"),
  ]);
  return {
    props: {
      post: listPost.edges.map((e) => e.node),
      agenda: agenda.posts.nodes,
      jadwalkajian: jadwalkajian.posts.nodes,
      jadwalkhutbah: jadwalkhutbah.posts.nodes,
      kajian: kajian.posts.nodes,
      khutbah: khutbah.posts.nodes,
      podcast: podcast.posts.nodes,
    },
    revalidate: 24 * 60 * 60,
  };
}

export default function Categories({
  post,
  agenda,
  jadwalkajian,
  jadwalkhutbah,
  kajian,
  khutbah,
  podcast,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [listPost, setListPost] = React.useState(post);
  const [button, setButton] = React.useState("Ascend");
  const onClick = (title: string) => {
    switch (title) {
      case "All Post": {
        setListPost(post);
        return;
      }
      case "Jadwal Kajian": {
        setListPost(jadwalkajian);
        return;
      }
      case "Agenda": {
        setListPost(agenda);
        return;
      }
      case "Jadwal Khutbah": {
        setListPost(jadwalkhutbah);
        return;
      }
      case "Khutbah": {
        setListPost(khutbah);
        return;
      }
      case "Kajian": {
        setListPost(kajian);
        return;
      }
      case "Podcast": {
        setListPost(podcast);
        return;
      }
      default: {
        window.alert("invalid list");
      }
    }
  };
  const dropList: Props[] = [
    { elements: "All Post", elementClick: onClick },
    { elements: "Agenda", elementClick: onClick },
    { elements: "Jadwal Kajian", elementClick: onClick },
    { elements: "Jadwal Khutbah", elementClick: onClick },
    { elements: "Khutbah", elementClick: onClick },
    { elements: "Kajian", elementClick: onClick },
    { elements: "Podcast", elementClick: onClick },
  ];
  return (
    <>
      <Head>
        <title>Post - Masjid Akbar Medhar Arifin</title>
        <meta name="description" content="Listed all categories in wordpress" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <div className="container-out flex-col gap-4 min-h-screen justify-start">
          <div className="container-in">
            <Dropdown prop={dropList} />
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => {
                e.preventDefault();
                button == "Ascend" ? setButton("Descend") : setButton("Ascend");
                setListPost(listPost.reverse());
              }}
            >
              {button}
            </button>
          </div>
          <div className="container-in flex-col items-start">
            {listPost.map((e) => (
              <Cards
                img={e.featuredImage.node.link}
                title={e.title}
                key={e.slug}
                date={e.date}
                slug={e.slug}
                tags={
                  e.categories.nodes.filter((e) => e.name !== "Headline")[0]
                    .name
                }
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
