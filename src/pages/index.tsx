import { GetStaticProps, NextPage } from "next";
import { Head, MainLayout } from "@/component/Layout";
import { BlogList } from "@/component/Page/BlogList";
import { blogRepository, Blogs } from "@/module/blog";
import { Categories, categoryRepository } from "@/module/category";

export type Props = {
  blogs: Blogs;
  categories: Categories;
};

const HomePage: NextPage<Props> = ({ blogs, categories }) => {
  return (
    <>
      <Head />
      <MainLayout>
        <BlogList blogs={blogs} categories={categories} />
      </MainLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await blogRepository.find();
  const categories = await categoryRepository.find();

  return {
    props: {
      blogs: {
        contents: blogs.contents,
        totalCount: blogs.totalCount,
        limit: blogs.limit,
        offset: blogs.offset,
      },
      categories: { contents: categories.contents },
    },
  };
};

export default HomePage;
