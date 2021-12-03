import CompanySettings from "../components/Settings/CompanySettings";
import LanguageSettings from "../components/Settings/LanguageSettings";
import Layout from "../components/Layout/Layout";
import NotificationsSettings from "../components/Settings/NotificationsSettings";
import PasswordSettings from "../components/Settings/PasswordSettings";
import UserSettings from "../components/Settings/UserSettings";
import { ISettingsProps, IUser } from "../types";
import Company from "../models/Company";
import connectDB from "../utils/mongodb";

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

export const getServerSideProps = async () => {
  await connectDB();
  const company = await Company.findOne({ name: "Stibo Accelerator" }).lean();
  company._id = company._id.toString();

  const user: IUser = {
    firstName: "Valeriu",
    lastName: "Rusu",
    email: "valeriu.rusu111@gmail.com",
    birthday: "1999-11-24",
  };

  return {
    props: {
      user: user,
      company: company,
    },
  };
};
