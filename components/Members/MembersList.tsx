import Member from "./Member";
import { IMembersProps } from "../../types";



function MembersList({ members }: IMembersProps) {
  return (
    <div>
      <div className="inline-block min-w-full  overflow-hidden align-middle shadow-lg rounded-lg mt-2 border-r-2 border-l-2 border-gray-200">
        <table className=" min-w-full ">
          <thead className="bg-gray-300 text-gray-600 uppercase text-sm rounded-t-lg w-full">
            <tr>
              <th className="py-3 px-6 text-left">Member</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
            </tr>
          </thead>
          {<tbody className="text-gray-600">
            {members.map((member) => (
              <Member member={member} key={member.id} />
            ))}
          </tbody> }
        </table>
      </div>
    </div>
  );
}

export default MembersList;
