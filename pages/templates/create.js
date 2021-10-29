import Layout from "../../components/Layout/Layout";

function Create() {
  const createTemplate = async () => {
    let newTemplate = {
      name: "Software Engineering",
      description:
        "This a Software Engineering job description and it is not long. It will be great to get an experienced person on board which will have good interview results.",
      jobId: "JR242",
    };

    const res = await fetch("/api/template", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTemplate),
    });

    if (res.ok) {
      console.log("success");
    } else {
      console.log("fail");
    }
  };

  return (
    <Layout>
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
