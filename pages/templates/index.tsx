import { ITemplate, IServerProps, ITemplatesProps } from "../../types";
import CustomButton from "../../components/common/CustomButton";
import Layout from "../../components/Layout/Layout";
import Link from "next/link";
import Template from "../../components/Templates/Template";
import connectDB from "../../utils/mongodb";
import TemplateModel from "../../models/Template";
import protect from "../../helpers/protect";

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

export const getServerSideProps = async ({ req }: IServerProps) => {
  if (!protect(req.cookies["accessToken"]).status) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }

  await connectDB();

  const templates: ITemplate[] = await TemplateModel.find({})
    .select("_id name description tasks companyId jobId createdAt")
    .lean();

  return {
    props: {
      templates: TemplateModel.toClientArray(templates),
    },
  };
};
