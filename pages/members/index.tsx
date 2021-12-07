import Layout from "../../components/Layout/Layout";
import MembersList from "../../components/Members/MembersList";
import CustomButton from "../../components/common/CustomButton";
import Link from "next/link";
import User from "../../models/User";
import { IUsersProps, IUser, IAccessTokenPayload } from "../../types";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protection = await protect(
    context.req as NextApiRequest,
    context.res as NextApiResponse
  );
  if (!protection.status && !protection.payload) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }

  const users: IUser[] = await User.find({
    companyId: (protection.payload as IAccessTokenPayload).companyId,
  })
    .select("email firstName lastName role")
    .lean();

  return {
    props: {
      users: User.toClientArray(users),
    },
  };
};
