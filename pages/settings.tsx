import CompanySettings from "../components/Settings/CompanySettings";
import LanguageSettings from "../components/Settings/LanguageSettings";
import Layout from "../components/Layout/Layout";
import NotificationsSettings from "../components/Settings/NotificationsSettings";
import PasswordSettings from "../components/Settings/PasswordSettings";
import UserSettings from "../components/Settings/UserSettings";
import { ICompanySettingsProps, ISettingsProps, IUser } from "../types";

function Settings({ settings }: ISettingsProps) {
  return (
    <Layout header="Settings">
      <CompanySettings company={settings.company.company} />
      <UserSettings user={settings.user.user} />
      <PasswordSettings />
      <NotificationsSettings />
      <LanguageSettings />
    </Layout>
  );
}

export default Settings;

export const getServerSideProps = async () => {
  const res = await fetch(
    "http://localhost:3000/api/company/6182887f8a051eb01be80084"
  );
  const data = await res.json();
  const userData: IUser = {
    user: {
      firstName: "Valeriu",
      lastName: "Rusu",
      email: "valeriu.rusu111@gmail.com",
      birthday: "1999-11-24",
    },
  };
  const companyData: ICompanySettingsProps = { company: data };

  return {
    props: {
      settings: {
        user: userData,
        company: companyData,
      },
    },
  };
};
