import Layout from "../../components/Layout/Layout";
import Template from "../../components/Templates/Template";
import { templates } from "../../templates";
import { ITemplate, ITemplatesProps } from "../../types";

function Templates({ templates }: ITemplatesProps) {
  return (
    <Layout header="Templates">
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 ">
        {templates.map((template) => (
          <Template template={template} key={template.id} />
        ))}
      </div>
    </Layout>
  );
}

export default Templates;

export const getServerSideProps = async () => {
  // const res = await fetch("/api/templates");
  // const data = await res.json();
  const templatesData: ITemplate[] = templates;
  return {
    props: {
      templates: templatesData,
    },
  };
};
