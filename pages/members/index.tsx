import Layout from "../../components/Layout/Layout";
import MembersList from "../../components/Members/MembersList";
import CustomButton from "../../components/common/CustomButton";
import Link from "next/link";
import connectDB from "../../utils/mongodb";
import User from "../../models/User";
import { IUsersProps, IUser } from "../../types";

function Members({ users }: IUsersProps) {
  return (
    <Layout header="Members">
      <div className="w-full flex justify-end items-center pb-2">
        <Link href="/members/invite">
          <CustomButton color="blue">Invite Members</CustomButton>
        </Link>
      </div>
      <div>
        <MembersList users={users}></MembersList>
      </div>
    </Layout>
  );
}

export default Members;

export const getStaticProps = async () => {
  await connectDB();

  const users: IUser[] = await User.find({})
    .select("email firstName lastName role")
    .lean();
  let lol = User.toClientArray(users);

  return {
    props: {
      users: lol,
    },
    revalidate: 600,
  };
};
