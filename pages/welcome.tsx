import Link from "next/link";
import NavBar from "../components/Landing Page/navbar";
import Canvas from "../components/Landing Page/canvas/canvas";

function Welcome() {
  return (
    <div className="h-screen w-full bg-white mx-auto text-center">
      <NavBar></NavBar>
      <div className=" inline-flex ">
        <div className="float-right pt-24  px-16 ">
          <div className="header-info">
            <h1 className=" text-gray-700 text-4xl font-bold text-left">
              Bring innovation to your company<br></br> with Eligo's recruitment
              Process
            </h1>
          </div>
          <div className=" w-[550px] pt-12 text-left">
            <p>
              Ο άνθρωπος ό,τι μπορεί κι ο Θεός ό,τι θέλει.Κάμεις καλό, κάμεις
              κακό, θα ’ρθει γυρεύοντάς σε.Ντύσου, γδύσου, συλλογίσου, φάγε,
              πιέ, χέσε, κοιμήσου.Ο Θεός άλλους έπλασε και άλλους έκλασε. Ο
              γέρος πάει ή από πέσιμο ή από χέσιμο.
            </p>
            <Link href="/become-a-customer">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-8 py-4 px-4 rounded-full">
                Become Member
              </button>
            </Link>
            <button className="bg-white border-2 hover:border-4 border-blue-700 m-4 text-blue-700 font-bold py-4 px-16 rounded-full">
              Watch Demo
            </button>
          </div>
        </div>
        <div>
          <div className=" bg-white mt-20 px-16">
            <img
              src="https://media.istockphoto.com/vectors/job-interview-icon-vector-id1055387324?k=20&m=1055387324&s=170667a&w=0&h=8gVg5rPqavM-eobyGz0QpNnI8zilFn9x3UCouBY6dus="
              alt="logo"
              className="h-80 rounded-full "
            ></img>
          </div>
        </div>
      </div>
      <Canvas />
    </div>
  );
}

export default Welcome;
