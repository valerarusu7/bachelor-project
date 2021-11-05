import { BiCodeAlt, BiSelectMultiple } from "react-icons/bi";
import { GetStaticPaths, GetStaticProps } from "next";

import { BsQuestion } from "react-icons/bs";
import { ParsedUrlQuery } from "querystring";
import { templates } from "../../templates";

function TemplateDetails() {
  return (
    <div className="grid grid-cols-5 h-screen">
      <div className="bg-red-200 col-span-1"></div>

      <div className="col-span-3 flex justify-center">
        <div className="shadow-2xl w-10/12 h-full">
          <div className="border-2 border-dashed min-h-32 m-2 rounded-lg p-2 flex justify-evenly items-center ">
            <div className="rounded-full bg-gradient-to-tr from-red-500 to-red-400 h-12 w-12 flex justify-center items-center cursor-pointer hover:opacity-90">
              <BsQuestion className="text-white h-10 w-10" />
            </div>
            <div className="rounded-full bg-gradient-to-tr from-purple-500 to-purple-400 h-12 w-12 flex justify-center items-center cursor-pointer hover:opacity-90">
              <BiSelectMultiple className="text-white h-8 w-8" />
            </div>
            <button
              className="rounded-full bg-gradient-to-tr from-blue-500 to-blue-400 h-12 w-12 flex justify-center items-center hover:opacity-90 disabled:opacity-50 cursor-not-allowed"
              disabled
            >
              <BiCodeAlt className="text-white h-8 w-8" />
            </button>
          </div>
        </div>
      </div>

      <div className="col-span-1"></div>
    </div>
  );
}

export default TemplateDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  //   const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = templates;

  const paths = data.map((template) => {
    return {
      params: { id: template._id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams; // no longer causes error
  const data = templates[parseInt(id) - 1];

  return {
    props: { template: data },
  };
};
