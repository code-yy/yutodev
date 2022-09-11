import { GetStaticProps, GetStaticPaths, NextPage } from "next/types";
import { Blog, Blogs } from "@/type/blog";
import { NextPageWithLayout } from "@/type/next-type";
import { client } from "@/lib/microcms-client";
import { BlogId } from "@/component/page/blogs/blogId";
import { Layout, SEO } from "@/component/layout";

export type Props = {
  blog: Blog;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs: Blogs = await client.get({ endpoint: "blogs" });

  const paths = blogs.contents.map((blog) => `/blogs/${blog.slug}`);
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const blogs: Blogs = await client.get({
    endpoint: "blogs",
  });

  const blog: Blog[] = blogs.contents.filter((blog) => {
    return blog.slug === context.params?.slug;
  });

  return {
    props: {
      blog: blog[0],
    },
  };
};

const BlogIdPage: NextPage<Props> = ({ blog }) => {
  return (
    <>
      <SEO title={`ユウトブログ/${blog.title}`} description={blog.description} url={blog.eyecatch.url} type="website" />
      {/* <Layout> */}
      <BlogId blog={blog} />
      {/* </Layout> */}
    </>
  );
};

export default BlogIdPage;
