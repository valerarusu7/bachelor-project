import {
  BriefcaseIcon,
  ChartBarIcon,
  CogIcon,
  HomeIcon,
  PresentationChartBarIcon,
  QuestionMarkCircleIcon,
  TemplateIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

import { LoginIcon } from "@heroicons/react/outline";
import NavLink from "./NavLink";

function Sidebar() {
  return (
    <div className="h-screen transition duration-500">
      <nav className="w-56 relative h-full flex flex-col items-center justify-between text-gray-500">
        <div className="w-full">
          <div className="flex justify-center items-center ">
            <div className="h-20 w-20 rounded-full bg-white flex justify-center items-center mt-2">
              <img
                src="https://www.heyfunding.dk/images/logoer/stibo-accelerator.png"
                alt="logo"
                className="h-16 w-16 p-2 "
              />
            </div>
          </div>
          <NavLink
            name="Dashboard"
            href="/dashboard"
            Icon={PresentationChartBarIcon}
          />
          <NavLink name="Templates" href="/templates" Icon={TemplateIcon} />
          <NavLink name="Positions" href="/positions" Icon={BriefcaseIcon} />
          <NavLink name="Reports" href="/reports" Icon={ChartBarIcon} />
          <NavLink name="Members" href="/members" Icon={UserGroupIcon} />
          <NavLink name="Settings" href="/settings" Icon={CogIcon} />
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
