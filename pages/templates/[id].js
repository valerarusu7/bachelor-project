import { templates } from "../../templates";

function TemplateDetails() {
  return <div>Template details</div>;
}

export default TemplateDetails;

export const getStaticPaths = async () => {
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

export const getStaticProps = async (context) => {
  const id = context.params.id;
  //   const res = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
  const data = templates[id - 1];

  return {
    props: { template: data },
  };
};
