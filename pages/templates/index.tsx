import { ITemplate, ITask, ITemplatesProps } from "../../types";

import CustomButton from "../../components/common/CustomButton";
import Layout from "../../components/Layout/Layout";
import Link from "next/link";
import Template from "../../components/Templates/Template";
import TemplateModel from "../../models/Template";
import connectDB from "../../utils/mongodb";

function Templates({ templates }: ITemplatesProps) {
  const templatesData: ITemplate[] = JSON.parse(templates);
  return (
    <Layout header="Templates">
      <div className="w-full flex justify-end items-center pb-2">
        <Link href="/templates/create">
          <CustomButton color="blue">New template</CustomButton>
        </Link>
      </div>
      <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 ">
        {templatesData.map((template) => (
          <Template template={template} key={template._id} />
        ))}
      </div>
    </Layout>
  );
}

export default Templates;

export const getServerSideProps = async () => {
  await connectDB();

  const templates: ITemplate[] = await TemplateModel.find({})
    .select("_id name description tasks companyId jobId createdAt")
    .lean();

  const modifiedTemplates = templates.map(async (template: ITemplate) => {
    const tasks = template.tasks as ITask[];
    const taskTypes = tasks.map((task: ITask) => task.taskType);
    template["multiple"] = taskTypes.includes("multiple");
    template["email"] = taskTypes.includes("email");
    template["single"] = taskTypes.includes("single");
    template["code"] = taskTypes.includes("code");
    template["tasks"] = taskTypes.length;

    return template;
  });

  const templatesData: ITemplate[] = await Promise.all(modifiedTemplates);

  return {
    props: {
      templates: JSON.stringify(templatesData),
    },
  };
};
