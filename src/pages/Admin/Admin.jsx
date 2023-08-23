import DataTable from "../../components/DataTable/DataTable";
import PageTitle from "../../components/Shared/PageTitle/PageTitle";
import "./Admin.css";

const Admin = () => {
  return (
    <>
      <PageTitle title='Admin' />
      <div className='text-center my-3 '>
        <h2 className='fw-bold'>ASSIGN WORK</h2>
        <div className='admin-heading mx-auto'></div>
      </div>
      <DataTable />
    </>
  );
};

export default Admin;
