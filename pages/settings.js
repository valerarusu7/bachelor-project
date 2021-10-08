import CompanySettings from "../components/Settings/CompanySettings";
import LanguageSettings from "../components/Settings/LanguageSettings";
import Layout from "../components/Layout/Layout";
import NotificationsSettings from "../components/Settings/NotificationsSettings";
import PasswordSettings from "../components/Settings/PasswordSettings";
import UserSettings from "../components/Settings/UserSettings";

function Settings({ settings }) {
  return (
    <Layout header="Settings">
      <CompanySettings company={settings.company} />
      <UserSettings user={settings.user} />
      <PasswordSettings />
      <NotificationsSettings />
      <LanguageSettings />
    </Layout>
  );
}

export default Settings;

export const getServerSideProps = async () => {
  // const res = await fetch("/api/templates");
  // const data = await res.json();

  return {
    props: {
      settings: {
        user: {
          firstName: "Valeriu",
          lastName: "Rusu",
          email: "valeriu.rusu111@gmail.com",
          birthday: "1999-11-24",
        },
        company: {
          name: "Stibo",
          website: "stibo.com",
        },
      },
    },
  };
};
