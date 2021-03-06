import { useState, useEffect } from "react";
import { stringAvatar } from "../../helpers/stringAvatar";
import { IUserProps, Roles } from "../../types";

function Member({ user, idx }: IUserProps) {
  const [listOfRoles, setRoles] = useState<string[]>(["a"]);
  var list = Object.values(Roles);
  useEffect(() => {
    getRoles(list);
  }, []);

  function getRoles(data: string[]): void {
    const allRoles: string[] = data.map((e) => {
      return e;
    });
    let uniqueRoles: string[] = allRoles.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    });
    uniqueRoles = uniqueRoles.filter((val) => !user.role.includes(val));
    setRoles(uniqueRoles);
  }

  function updateRole(event: any) {
    fetch(`/api/account/${user._id}?role=${event.target.value}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...user,
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: event.target.value,
        companyId: user.companyId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("role changed");
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <tr
      className={`${
        idx % 2 ? "bg-white" : "bg-gray-50"
      } border-b border-gray-200 hover:bg-gray-100 cursor-pointer hover:overflow-hidden`}
    >
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <div className="mr-2">
            <div className="border-blue-400 bg-blue-200 text-blue-500 w-8 h-8 border-2 rounded-full p-2 flex items-center justify-center">
              <p className="font-semibold text-sm">
                {stringAvatar(`${user.firstName} ${user.lastName}`)}
              </p>
            </div>
          </div>
          <span>{`${user.firstName} ${user.lastName}`}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <span className="font-medium">{user.email}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <select
            onChange={() => updateRole(event)}
            name="roles"
            id="select-role"
            className="rounded-2xl"
          >
            <option value="roles">{user.role}</option>
            {listOfRoles.map((e) => (
              <option value={e} key={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
      </td>
    </tr>
  );
}

export default Member;
