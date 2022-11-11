import Layout from "../../components/layout";
import Head from "next/head";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignModal from "../../components/signModal";
import { testingPost, listPosts } from "../../lib/wp";
import { useSession, signIn, signOut } from "next-auth/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Posts } from "../../type";

interface IParams extends ParsedUrlQuery {
  slug: string;
}
interface ApiJson {
  message?: string;
  view?: number;
}
interface Post {
  title: string;
  content: string;
}
interface Props {
  result: Post;
  slug: string;
  auth: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: Posts = await listPosts();
  const paths = data.edges.map((idk) => {
    const slug = idk.node.slug;
    return {
      params: { slug },
    };
  });
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams;
  const result = await testingPost(slug);
  if (result == null) return { notFound: true };
  if (result.content == undefined || result.title == undefined) {
    return { notFound: true };
  }
  return {
    props: {
      result: result,
      slug: slug,
      auth: process.env.NEXTAUTH_URL,
    },
    revalidate: 24 * 60 * 60,
  };
};
export default function Wordpress({ result, slug, auth }: Props) {
  let dataView;
  const { data: session } = useSession();
  React.useEffect(() => {
    const getData = async () => {
      const data = await fetch(`${auth}/api/prisma/${slug}`);
      const json: ApiJson = await data.json();
      if (data.status == 400) {
        dataView = json.message;
      } else {
        dataView = json.view;
      }
    };
    getData().catch((e) => console.log(e));
  }, []);
  const [modal, setModal] = React.useState(false);
  const close = function () {
    setModal(false);
  };
  const open = function () {
    setModal(true);
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
              className="wordpress border-gold border-[3px] rounded-lg shadow-xl shadow-black"
              dangerouslySetInnerHTML={{ __html: result.content }}
            />
            <div className="w-[800px] flex flex-col border-gold border-[3px] rounded-lg shadow-xl shadow-black justify-center items-cente">
              {session?.user ? (
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
              ) : (
                <div className="flex justify-start items-center p-4 gap-2 w-full">
                  <h2 className="font-bold">Please Log-in to Comment</h2>
                  <button
                    onClick={(e) => (modal ? close() : open())}
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 ml-auto"
                  >
                    Log-In
                  </button>
                </div>
              )}

              <AnimatePresence
                initial={false}
                exitBeforeEnter
                onExitComplete={() => null}
              >
                {modal && <SignModal handleClose={close} />}
              </AnimatePresence>
              <form>
                <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200">
                  <div className="py-2 px-4 bg-white rounded-t-lg">
                    <label className="sr-only">Your comment</label>
                    <textarea
                      id="comment"
                      rows={4}
                      className="px-0 w-full text-sm text-gray-900 bg-white border-0 focus:ring-2"
                      placeholder="Write a comment..."
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-between items-center py-2 px-3 border-t">
                    <button className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200">
                      Post comment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
// export const getServerSideProps: GetServerSideProps = async function (context) {
//   const { slug } = context.query;
//   if (slug !== undefined && !(slug instanceof Array)) {
//     const result = testingPost(slug);
//     const prisma = new PrismaClient();
//     const views = prisma.post.findUnique({
//       where: { slug: slug },
//       select: { views: true },
//     });
//     const [res, view] = await Promise.all([result, views]);
//     if (res == null) return { notFound: true };
//     if (view === null) {
//       await prisma.post.create({ data: { slug: slug, views: 1 } });
//     } else {
//       await prisma.post.update({
//         where: { slug: slug },
//         data: { views: view.views + 1 },
//       });
//     }
//     await prisma.$disconnect();
//     return { props: { res } };
//   } else return { notFound: true };
// };
