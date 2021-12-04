import CompanySettings from "../components/Settings/CompanySettings";
import LanguageSettings from "../components/Settings/LanguageSettings";
import Layout from "../components/Layout/Layout";
import NotificationsSettings from "../components/Settings/NotificationsSettings";
import PasswordSettings from "../components/Settings/PasswordSettings";
import UserSettings from "../components/Settings/UserSettings";
import { ICompany, ISettingsProps, IUser } from "../types";
import Company from "../models/Company";
import connectDB from "../utils/mongodb";
import User from "../models/User";

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

export const getStaticProps = async () => {
  await connectDB();

  // @ts-ignore
  const [user, company]: [IUser, ICompany] = await Promise.all([
    User.findOne({ email: "david.le@test.com" })
      .select("email firstName lastName birthday")
      .lean(),
    Company.findOne({ name: "Stibo Accelerator" }).lean(),
  ]);

  if (company && company._id) {
    company._id = company._id.toString();
  }

  return {
    props: {
      user: User.toClientObject(user),
      company: company,
    },
    revalidate: 30,
  };
};
