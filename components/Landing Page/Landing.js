import Link from "next/link";

function Landing() {
  return (
    <div>
      Landing page
      <Link href="/become-a-customer">
        <div className="bg-blue-300 p-1 w-48 cursor-pointer">Become a customer</div>
      </Link>
    </div>
  );
}

export default Landing;
