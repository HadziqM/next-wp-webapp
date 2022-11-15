import { listPosts, categorys } from "../../../lib/wp";
import Layout from "../../../components/layout";
import Head from "next/head";
import Dropdown from "../../../components/dropdown";
import { InferGetStaticPropsType } from "next";
import Cards from "../../../components/card";
import { PrismaClient } from "@prisma/client";
import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

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
  const [button, setButton] = React.useState("Descend");
  const [find, setFind] = React.useState("");
  const [arrow, setArrow] = React.useState(
    <FaArrowDown className="text-white mr-1" />
  );
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
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    window.alert("on Progress");
  };
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
            <div className="flex gap-4">
              <Dropdown prop={dropList} />
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => {
                  e.preventDefault();
                  if (button === "Ascend") {
                    setButton("Descend");
                    setArrow(<FaArrowDown className="text-white mr-1" />);
                  } else {
                    setButton("Ascend");
                    setArrow(<FaArrowUp className="text-white mr-1" />);
                  }
                  setListPost(listPost.reverse());
                }}
              >
                {arrow}
                {button}
              </button>
            </div>
            <form onSubmit={onSubmit}>
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
                Search
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Post"
                  value={find}
                  onChange={(e) => {
                    e.preventDefault();
                    setFind(find);
                  }}
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
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
