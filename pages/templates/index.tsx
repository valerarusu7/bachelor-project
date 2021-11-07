import { ITemplate, ITemplatesProps } from "../../types";

import Layout from "../../components/Layout/Layout";
import Link from "next/link";
import Template from "../../components/Templates/Template";
import CustomButton from "../../components/common/CustomButton";
import absoluteUrl from "next-absolute-url";
import { NextPageContext } from "next";

function Templates({ templates }: ITemplatesProps) {
  return (
    <Layout header="Templates">
      <div className="w-full flex justify-end items-center pb-2">
        <Link href="/templates/create">
          <CustomButton color="blue">New template</CustomButton>
        </Link>
      </div>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 ">
        {templates.map((template) => (
          <Template template={template} key={template._id} />
        ))}
      </div>
    </Layout>
  );
}

export default Templates;

export const getServerSideProps = async ({ req }: NextPageContext) => {
  const { origin } = absoluteUrl(req);
  const res = await fetch(`${origin}/api/templates`);
  const templatesData: ITemplate[] = await res.json();
  return {
    props: {
      templates: templatesData,
    },
  };
};
