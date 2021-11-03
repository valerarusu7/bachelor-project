import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { IHeroIcon } from "../../types";

export interface NavLinkProps {
  name: string;
  href: string;
  Icon: IHeroIcon;
}

function NavLink({ name, href, Icon }: NavLinkProps) {
  const router = useRouter();
  const activeClassName = "active text-blue-500 bg-gray-900";

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
