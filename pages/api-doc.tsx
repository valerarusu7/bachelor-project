import { useEffect } from "react";
import { createSwaggerSpec } from "next-swagger-doc";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { isDev } from "../config";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    openApiVersion: "3.0.0",
    title: "NextJS Swagger",
    version: "0.1.0",
    apiFolder: "pages/api",
  });

  return {
    props: { spec },
  };
};

const ApiDoc: NextPage = ({
  spec,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  useEffect(() => {
    if (!isDev) {
      router.push("/404");
    }
  }, [isDev]);

  return <SwaggerUI spec={spec} />;
};

export default ApiDoc;
