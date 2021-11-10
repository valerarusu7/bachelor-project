import { IHeroIcon } from "../../types";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

export interface NavLinkProps {
  name: string;
  href: string;
  Icon: IHeroIcon;
}

function NavLink({ name, href, Icon }: NavLinkProps) {
  const router = useRouter();
  const activeClassName =
    "active text-white bg-gradient-to-r from-blue-500 to-white";

  return (
    <Link href={href}>
      <div
        className={`${
          router.asPath === href ? activeClassName : "text-black"
        }  flex flex-row group  hover:text-white hover:opacity-90 hover:bg-gradient-to-r from-blue-500 to-white cursor-pointer font-thin items-center p-2 my-2 justify-start`}
      >
        {Icon && <Icon className="h-6 mr-2" />}
        <p className="h-6 mr-2 font-normal">{name}</p>
      </div>
    </Link>
  );
}

export default NavLink;
