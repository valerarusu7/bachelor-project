import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../../components/Layout/Layout";
import { templates } from "../../templates";

function TemplateDetails() {
  return <Layout header=''><div><p>Template details</p></div></Layout>;
}

export default TemplateDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  //   const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = templates;

  const paths = data.map((template) => {
    return {
      params: { id: template.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
    id: string
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params as IParams // no longer causes error
  const data = templates[parseInt(id) - 1];

  return {
    props: { template: data },
  };
};
