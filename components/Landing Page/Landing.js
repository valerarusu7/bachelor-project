import Link from "next/link";
import { BellIcon } from "@heroicons/react/outline";
import NavBar from "./navbar";
import Wave from "./Wave";
import Canvas from "./canvas/canvas";

function Landing() {
  return (
    <div class="bg-gray-100">
      <NavBar></NavBar>
      <div class="inline-flex">
        <div class="pt-32 ">
          <div class="hidden md:flex items-center space-x-1 pl-80 pt-12">
            <a class="bg-gray-500 hover:bg-gray-700 text-2xl text-white py-2 px-6 rounded m-3">
              Login
            </a>
          </div>
          <div class="hidden md:flex items-center space-x-1 pl-64 pt-12">
            <Link href="/become-a-customer">
              <button class="bg-gray-500 hover:bg-gray-700 text-2xl text-black-700 text-white py-2 px-6 rounded m-3">
                Become a customer
              </button>
            </Link>
          </div>
        </div>
        <div class="float-right pr-24 pl-64">
          <div className="header-info">
            <h1 class=" text-gray-700 text-5xl font-bold pl-48 pt-24">
              Welcome!
            </h1>
          </div>
          <div class="mx-24 w-96 pl-12 pt-12">
            <p>
              Coca-Cola was originally green. Hot water will turn into ice
              faster than cold water. The strongest muscle in the body is the
              tongue.
            </p>
            <p>
              Fact: The first oranges weren’t orange The original oranges from
              Southeast Asia were a tangerine-pomelo hybrid, and they were
              actually green. In fact, oranges in warmer regions like Vietnam
              and Thailand still stay green through maturity.
            </p>
          </div>
        </div>
      </div>
      <Canvas />
    </div>
  );
}

export default Landing;
