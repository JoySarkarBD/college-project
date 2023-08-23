import DataTable from "../../components/DataTable/DataTable";
import "./Admin.css";

const Admin = () => {
  return (
    <>
      <div className='text-center my-3 '>
        <h2 className='fw-bold'>ASSIGN WORK</h2>
        <div className='admin-heading mx-auto'></div>
      </div>
      <DataTable />
    </>
  );
};

export default Admin;
