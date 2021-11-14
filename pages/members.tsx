import Layout from "../components/Layout/Layout";
import MembersList from "../components/Members/MembersList";
import { members } from "../members";
import CustomButton from ".././components/common/CustomButton";
import Link from "next/link";



function Members() {
  return <Layout header="Members">
      <div className="w-full flex justify-end items-center pb-2">
        <Link href="/members/">
          <CustomButton color="blue">Invite Members</CustomButton>
        </Link>
      </div>
      <div>
        <MembersList members={members}></MembersList></div></Layout>;
}

export default Members;


export const getServerSideProps = async () => {
  return {
    props: {
      members: members,
    },
  };
};