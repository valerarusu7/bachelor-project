import { useState, useEffect, ChangeEvent } from 'react';
import { BanIcon, StarIcon } from "@heroicons/react/solid";

import Link from "next/link";
import { stringAvatar } from "../../helpers/stringAvatar";
import { IMemberProps, IMembers,IRoles } from "../../types";
import { roles } from '../../roles';


function Member({ member }: IMemberProps) 
{
 
  const [listOfRoles, setRoles] = useState<string[]>(["a"]);


  useEffect(() => {
  getRoles(roles);
}, []);

  function getRoles(data: IRoles[]): void {
    const allRoles: string[] = data.map(e => {
        return e.role
    })
    let uniqueRoles: string[] = allRoles.filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
    })
    uniqueRoles = uniqueRoles.filter(val => !member.role.includes(val));
    setRoles(uniqueRoles);
  }

  return (

      <tr
        className={`${
          member.id % 2 ? "bg-white" : "bg-gray-50"
        } border-b border-gray-200 hover:bg-gray-100 cursor-pointer hover:overflow-hidden`}
      >
        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            <div className="mr-2">
              <div className="border-blue-400 bg-blue-200 text-blue-500 w-8 h-8 border-2 rounded-full p-2 flex items-center justify-center">
                <p className="font-semibold text-sm">{stringAvatar(`${member.firstName} ${member.lastName}`)}</p>
              </div>
            </div>
            <span>{`${member.firstName} ${member.lastName}`}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <span className="font-medium">{member.email}</span>
          </div>
        </td> 
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
          <select name="roles" id="select-role" >
                <option value="roles">{member.role}</option>
                {listOfRoles.map(e => <option value={e} key={e}>{e}</option>)}
            </select>
        
          </div>
        </td>
      </tr>
   
  );
}

export default Member;
