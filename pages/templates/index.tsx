import {
  ITemplate,
  ITemplatesProps,
  IAccessTokenPayload,
} from "../../types";
import CustomButton from "../../components/common/CustomButton";
import Layout from "../../components/Layout/Layout";
import Link from "next/link";
import Template from "../../components/Templates/Template";
import TemplateModel from "../../models/Template";
import protect from "../../helpers/protect";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";

function Templates({ templates }: ITemplatesProps) {
  return (
    <Layout header="Templates">
      <div className="w-full flex justify-end items-center pb-2">
        <Link href="/templates/create">
          <CustomButton color="blue">New template</CustomButton>
        </Link>
      </div>
      <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 ">
        {templates.map((template: ITemplate) => (
          <Template template={template} key={template._id} />
        ))}
      </div>
    </Layout>
  );
}

export default Templates;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protection = await protect(
    context.req as NextApiRequest,
    context.res as NextApiResponse
  );
  if (!protection.status && !protection.payload) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }

  const templates: ITemplate[] = await TemplateModel.find({
    companyId: (protection.payload as IAccessTokenPayload).companyId,
  })
    .select("_id name description tasks companyId jobId createdAt")
    .lean();

  return {
    props: {
      templates: TemplateModel.toClientArray(templates),
    },
  };
};
