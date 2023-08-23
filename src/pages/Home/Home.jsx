import Announcements from "../../components/Announcements/Announcements";
import Banner from "../../components/Banner/Banner";
import PageTitle from "../../components/Shared/PageTitle/PageTitle";

const Home = () => {
  return (
    <>
      <PageTitle title='Home' />
      <Banner />
      <Announcements />
    </>
  );
};

export default Home;
