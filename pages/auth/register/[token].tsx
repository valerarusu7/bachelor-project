import { GetServerSidePropsContext } from "next";
import jwt from "jsonwebtoken";
import { IRegisterProps, IRegistrationTokenPayload } from "../../../types";

function Register({ email, companyName }: IRegisterProps) {
  return <div>Register</div>;
}

export default Register;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { ACCOUNT_PRIVATE_KEY } = process.env;

  // @ts-ignore
  const { token } = context.params;

  try {
    const decoded = jwt.verify(
      token,
      ACCOUNT_PRIVATE_KEY as string
    ) as IRegistrationTokenPayload;

    return {
      props: {
        email: decoded.email,
        companyName: decoded.companyName,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        permanent: false,
        destination: "/registration_error",
      },
    };
  }
};
