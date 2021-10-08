import {
  BriefcaseIcon,
  ChartBarIcon,
  CogIcon,
  HomeIcon,
  PresentationChartBarIcon,
  QuestionMarkCircleIcon,
  TemplateIcon,
} from "@heroicons/react/outline";

import { LoginIcon } from "@heroicons/react/outline";
import NavLink from "./NavLink";

function Sidebar() {
  return (
    <div className=" h-screen transition duration-500">
      <nav className="bg-black opacity-80 w-64 shadow-lg relative h-full flex flex-col items-center justify-between text-white">
        <div className="w-full">
          <div className="flex justify-center items-center h-16 ">
            <img
              src="https://www.heyfunding.dk/images/logoer/stibo-accelerator.png"
              alt="logo"
              className="h-16 w-16 p-2 "
            />
          </div>
          <NavLink name="Home" href="/" Icon={HomeIcon} />
          <NavLink
            name="Dashboard"
            href="/dashboard"
            Icon={PresentationChartBarIcon}
          />
          <NavLink name="Templates" href="/templates" Icon={TemplateIcon} />
          <NavLink name="Positions" href="/positions" Icon={BriefcaseIcon} />
          <NavLink name="Reports" href="/reports" Icon={ChartBarIcon} />
          <NavLink name="Settings" href="/settings" Icon={CogIcon} />
        </div>
        <div className="w-full">
          <NavLink name="help" href="/help" Icon={QuestionMarkCircleIcon} />
          <NavLink name="logout" href="/logout" Icon={LoginIcon} />
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
