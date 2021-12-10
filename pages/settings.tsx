import CompanySettings from "../components/Settings/CompanySettings";
import LanguageSettings from "../components/Settings/LanguageSettings";
import Layout from "../components/Layout/Layout";
import NotificationsSettings from "../components/Settings/NotificationsSettings";
import PasswordSettings from "../components/Settings/PasswordSettings";
import UserSettings from "../components/Settings/UserSettings";
import { IAccessTokenPayload, ICompany, ISettingsProps, IUser } from "../types";
import Company from "../models/Company";
import User from "../models/User";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import protect from "../helpers/protect";

function Settings({ company, user }: ISettingsProps) {
  return (
    <Layout header="Settings">
      <CompanySettings company={company} />
      <UserSettings user={user} />
      <PasswordSettings />
      <NotificationsSettings />
      <LanguageSettings />
    </Layout>
  );
}

export default Settings;

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

  const payload = protection.payload as IAccessTokenPayload;

  // @ts-ignore
  const [user, company]: [IUser, ICompany] = await Promise.all([
    User.findById(payload.id)
      .select("email firstName lastName")
      .lean(),
    Company.findById(payload.companyId).lean(),
  ]);

  if (company && company._id) {
    company._id = company._id.toString();
  }

  return {
    props: {
      user: User.toClientObject(user),
      company: company,
    },
  };
};
