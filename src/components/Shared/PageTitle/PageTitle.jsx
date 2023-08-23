/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>App Tool | {title}</title>
      </Helmet>
    </>
  );
};

export default PageTitle;
