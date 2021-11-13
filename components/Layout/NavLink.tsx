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
  const activeClassName = "active text-blue-400 font-bold bg-darkBlue";

  return (
    <Link href={href}>
      <div
        className={`${
          router.asPath === href ? activeClassName : "text-gray-500 "
        } w-4/5 rounded-lg flex text-md flex-row group  cursor-pointer items-center p-4 my-2 justify-start`}
      >
        {Icon && <Icon className="h-6 mr-4" />}
        <p className="h-6 mr-2 font-semibold">{name}</p>
      </div>
    </Link>
  );
}

export default NavLink;
