import Link from "next/link";
import { useRouter } from "next/dist/client/router";

function NavLink({ name, href, Icon }) {
  const router = useRouter();
  const activeClassName =
    "active text-blue-500 bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500 ";

  return (
    <Link href={href}>
      <div
        className={`${
          router.asPath === href ? activeClassName : ""
        } flex flex-row group w-full hover:text-blue-500 hover:opacity-90 cursor-pointer font-thin uppercase items-center p-4 my-2 transition-colors duration-200 justify-start`}
      >
        {Icon && <Icon className="h-6 mr-2" />}
        <p className="h-6 mr-2 font-semibold">{name}</p>
      </div>
    </Link>
  );
}

export default NavLink;
