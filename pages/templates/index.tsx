import { ITaskDocument, ITemplatesProps } from "../../types";

import CustomButton from "../../components/common/CustomButton";
import Layout from "../../components/Layout/Layout";
import Link from "next/link";
import Template from "../../components/Templates/Template";
import TemplateModel from "../../models/Template";
import connectDB from "../../utils/mongodb";

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

export const getServerSideProps = async () => {
  await connectDB();

  const templates = await TemplateModel.find({})
    .select("_id name description tasks companyId jobId createdAt")
    .lean();
  
  console.log(templates)

  const modifiedTemplates = templates.map(async (template) => {
    const taskTypes = template.tasks.map(
      (task: ITaskDocument) => task.taskType
    );
    if (taskTypes.length != 0) {
      template["multiple"] = taskTypes.includes("multiple");
      template["email"] = taskTypes.includes("email");
      template["single"] = taskTypes.includes("single");
      template["code"] = taskTypes.includes("code");
      template["tasks"] = taskTypes.length;
    }

    template._id = template._id.toString();
    template.companyId = template.companyId.toString();
    template.createdAt = template.createdAt.toString();
    return template;
  });


  const templatesData = await Promise.all(modifiedTemplates);
  return {
    props: {
      templates: templatesData,
    },
  };
};
