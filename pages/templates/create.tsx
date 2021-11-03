import Layout from "../../components/Layout/Layout";
import { ITask, ITemplate, IChoice } from "../../types";

function Create() {
  const createTemplate = async () => {
    const choice1: IChoice = {
      value: "10",
      isCorrect: false,
    };

    const choice2: IChoice = {
      value: "11",
      isCorrect: false,
    };

    const choice3: IChoice = {
      value: "12",
      isCorrect: true,
    };

    const task: ITask = {
      question: "Hey! How are you doing. Do you have a few seconds for me?",
      taskType: "Multiple",
      order: 1,
      choices: [choice1, choice2, choice3],
    };

    const template: ITemplate = {
      name: "Software Engineering",
      description:
        "This a Software Engineering job description and it is not long. It will be great to get an experienced person on board which will have good interview results.",
      companyId: "6182887f8a051eb01be80084",
      jobId: "JR200",
      tasks: [task],
    };

    const res = await fetch("/api/templates", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(template),
    });

    if (res.ok) {
      console.log("success");
    } else {
      console.log("fail");
    }
  };

  return (
    <Layout header="Create new template">
      <div>
        <p>Create New Template</p>
        <button
          className="bg-blue-500 p-2 text-white rounded-lg font-semibold"
          onClick={() => createTemplate()}
        >
          Create template
        </button>
      </div>
    </Layout>
  );
}

export default Create;
