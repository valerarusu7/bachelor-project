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
      <nav className="bg-darkGray shadow w-64 relative h-full flex flex-col items-center justify-between text-gray-500">
        <div className="w-full h-full  flex flex-col items-center ">
          <div className="flex w-full justify-center items-center h-32">
            <div className="h-20 w-20 rounded-full bg-white flex justify-center items-center mt-2">
              <img src="https://www.heyfunding.dk/images/logoer/stibo-accelerator.png" alt="logo" className="h-16 w-16 p-2 " />
            </div>
          </div>
          <div className="w-full flex flex-col mt-4 items-center">
            <NavLink name="Dashboard" href="/dashboard" Icon={PresentationChartBarIcon} />
            <NavLink name="Templates" href="/templates" Icon={TemplateIcon} />
            <NavLink name="Positions" href="/positions" Icon={BriefcaseIcon} />
            <NavLink name="Reports" href="/reports" Icon={ChartBarIcon} />
            <NavLink name="Members" href="/members" Icon={UserGroupIcon} />
            <NavLink name="Settings" href="/settings" Icon={CogIcon} />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
