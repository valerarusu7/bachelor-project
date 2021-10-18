import Layout from "../../components/Layout/Layout";
import Template from "../../components/Templates/Template";

function Templates({ templates }) {
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

  return {
    props: {
      templates: [
        {
          id: 1,
          name: "Solution Architect",
          description:
            "This a Solution Architect job description and it is not long. It will be great to get an experienced person on board which will have good interview results.",
          created: "3 DAYS AGO",
          multiple: true,
          mail: true,
          single: true,
          code: false,
          tasks: 6,
        },
        {
          id: 2,
          name: "Software Engineering",
          description:
            "This a Software Engineering job description and it is not long. It will be great to get an experienced person on board which will have good interview results.",
          created: "5 DAYS AGO",
          multiple: true,
          mail: false,
          single: false,
          code: true,
          tasks: 11,
        },
        {
          id: 3,
          name: "Backend-Developer",
          description:
            "This a Backend-Developer job description and it is not long. It will be great to get an experienced person on board which will have good interview results.",
          created: "6 DAYS AGO",
          multiple: true,
          mail: false,
          single: true,
          code: true,
          tasks: 13,
        },
        {
          id: 4,
          name: "Frontend-Developer",
          description:
            "This a Frontend-Developer job description and it is not long. It will be great to get an experienced person on board which will have good interview results.",
          created: "17 DAYS AGO",
          multiple: true,
          mail: false,
          single: true,
          code: true,
          tasks: 9,
        },
        {
          id: 5,
          name: "Project Manager",
          description:
            "This a Project Manager job description and it is not long. It will be great to get an experienced person on board which will have good interview results.",
          created: "1 MONTH AGO",
          multiple: false,
          mail: true,
          single: true,
          code: false,
          tasks: 7,
        },
      ],
    },
  };
};
