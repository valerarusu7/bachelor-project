import Layout from "../../components/Layout/Layout";
import MembersList from "../../components/Members/MembersList";
import CustomButton from "../../components/common/CustomButton";
import Link from "next/link";
import connectDB from "../../utils/mongodb";
import User from "../../models/User";
import { IUsersProps, IUser, IUserTokenPayload } from "../../types";
import { GetServerSidePropsContext } from "next";
import protect from "../../helpers/protect";

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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const protection = protect(context.req.cookies["accessToken"]);
  if (!protection.status) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }

  await connectDB();

  const users: IUser[] = await User.find({
    companyId: (protection.payload as IUserTokenPayload).companyId,
  })
    .select("email firstName lastName role")
    .lean();

  return {
    props: {
      users: User.toClientArray(users),
    },
  };
};
