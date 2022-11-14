interface PostData{
    title?:string,
    content?:string,
}
import {Posts,Category} from "../type"



async function fetchAPI(query:string, { variables } = {} as any) {
    const headers = { "Content-Type": "application/json" };
    const res = await fetch("https://masjidmoedhararifin.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
    });
  
    const json = await res.json();
    if (json.errors) {
      console.log(json.errors);
      throw new Error("Failed to fetch API");
    }
  
    return json.data;
  }
  export async function getAllPagesWithSlugs() {
    const data = await fetchAPI(`
      {
        pages(first: 10000) {
          edges {
            node {
              slug
            }
          }
        }
      }
      `);
    return data?.pages;
  }
  export async function getPageBySlug(slug:string) {
    const data = await fetchAPI(`
      {
        page(id: "${slug}", idType: URI) {
          title
          content
        }
      }
      `);
    return data?.page;
  }
  export async function testingPost(slug:string) {
    const data = await fetchAPI(
      `{
          post(id: "${slug}", idType: URI) {
            content
            title
          }
      }`
    );
    return data?.post as PostData;
  }
  export async function posts() {
    const data = await fetchAPI(
      `{
        posts {
          edges {
            node {
              slug
              title
              date
              categories {
                nodes {
                  name
                }
              }
              featuredImage {
                node {
                  link
                }
              }
              author {
                node {
                  name
                }
              }
              excerpt
            }
          }
        }
      }`
    );
    return data?.posts;
  }
  export async function categorys(slug:string){
    const data = await fetchAPI(
      `{
        category(id: "${slug}", idType: SLUG) {
          name
          posts(where: {orderby: {field: DATE, order: DESC}}){
            nodes {
              slug
              title
              date
              featuredImage {
                node {
                  link
                }
              }
              categories {
                nodes {
                  slug
                  name
                }
              }
            }
          }
        }
      }
      `
    );
    return data?.category as Category;
  }
export async function listPosts(){
    const data = await fetchAPI(
      `{
        posts(where: {orderby: {field: DATE, order: DESC}}) {
          edges {
            node {
              slug
              date
              title
              categories {
                nodes {
                  slug
                  name
                }
              }
              featuredImage {
                node {
                  link
                }
              }
            }
          }
        }
      } 
      `
    )
    return data?.posts as Posts
}