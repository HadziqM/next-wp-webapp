import Layout from "../../components/layout";
import Head from "next/head";
import CommentCard from "../../components/comment_card";
import SignModal from "../../components/signModal";
import Form from "../../components/form_comments";
import React from "react";
import { testingPost, categorys } from "../../lib/wp";
import { AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { comment, PrismaClient } from "@prisma/client";

interface ApiJson {
  message?: string;
  view?: number;
}
interface Out {
  message?: string;
  data: comment[];
}
interface Post {
  title: string;
  content: string;
}
interface Idk {
  params: {
    slug: string;
  };
}
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await categorys("infaq");
  const paths = data.posts.nodes.map((idk) => {
    const slug = idk.slug;
    return {
      params: { slug },
    };
  });
  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }: Idk) => {
  const prisma = new PrismaClient();
  const { slug } = params;
  const [result, data, transfer] = await Promise.all([
    testingPost(slug),
    prisma.infaq.findUnique({ where: { slug: slug } }),
    prisma.infaq_trf.findMany({ where: { slug: slug } }),
  ]);
  if (result == null) return { notFound: true };
  if (result.content == undefined || result.title == undefined) {
    return { notFound: true };
  }
  return {
    props: {
      result: result,
      slug: slug,
      data_post: data,
      transfer: transfer,
    },
    revalidate: 24 * 60 * 60,
  };
};
export default function Wordpress({
  result,
  slug,
  data_post,
  transfer,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [data, setData] = React.useState([] as comment[]);
  const [textComment, setTextComment] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const { data: session } = useSession();
  React.useEffect(() => {
    const getData = async () => {
      const [data, data2] = await Promise.all([
        fetch(`/api/prisma/${slug}`),
        fetch(`/api/comments/${slug}`),
      ]);
      const [json, json2]: [ApiJson, Out] = await Promise.all([
        data.json(),
        data2.json(),
      ]);
      setData(json2.data);
    };
    getData().catch((e) => console.log(e));
  }, []);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user) {
      return setModal(true);
    }
    const jsonData = JSON.stringify({
      avatar: session.user.image,
      name: session.user.name ?? session.user.email,
      slug: slug,
      content: textComment,
    });
    const response = await fetch("/api/post_comment", {
      method: "POST",
      body: jsonData,
    });
    const body = (await response.json()) as {
      data: comment;
      message?: string;
    };
    setTextComment("");
    setData([body.data, ...data]);
  };
  return (
    <>
      <Head>
        <title>{result.title} - Masjid Akbar Medhar Arifin</title>
        <meta name="description" content={result.title} />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <h1 className="text-center font-bold text-[2rem] mt-2 text-gold">
          {result.title}
        </h1>
        <div className="container-out">
          <div className="container-in flex-col gap-4">
            <div
              className="wordpress border-gold border-[3px] rounded-lg shadow-xl shadow-black w-[800px]"
              dangerouslySetInnerHTML={{
                __html: result.content || "No content",
              }}
            />
            <div className="w-[800px] flex flex-col border-gold border-[3px] rounded-lg shadow-xl shadow-black justify-center items-cente">
              {!session && (
                <div className="flex justify-start items-center p-4 gap-2 w-full">
                  <h2 className="font-bold">Please Log-in to Comment</h2>
                  <button
                    onClick={(e) => (modal ? setModal(false) : setModal(true))}
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 ml-auto"
                  >
                    Log-In
                  </button>
                </div>
              )}
              {session?.user && (
                <>
                  <div className="flex justify-start items-center p-4 gap-2 w-full">
                    {session.user.image && (
                      <img
                        src={`${session.user.image}`}
                        alt={`${session.user.name}'s avatar`}
                        className="w-8 h-8 rounded-full border border-gold"
                      />
                    )}
                    <h2 className="font-bold">
                      {session.user.name ?? session.user.email}
                    </h2>
                    <button
                      onClick={(e) => {
                        e.preventDefault;
                        signOut();
                      }}
                      className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 ml-auto"
                    >
                      Log-Out
                    </button>
                  </div>
                  <Form
                    onSubmit={onSubmit}
                    textComment={textComment}
                    setTextComment={(e) => setTextComment(e.target.value)}
                  />
                </>
              )}
              <AnimatePresence
                initial={false}
                exitBeforeEnter
                onExitComplete={() => null}
              >
                {modal && <SignModal handleClose={() => setModal(false)} />}
              </AnimatePresence>
              <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200">
                {data.length !== 0 &&
                  data.map((e) => (
                    <CommentCard
                      name={e.name}
                      url={e.avatar_url}
                      date={e.date}
                      comment={e.content}
                      key={e.id}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
