import ManageDataTable from "../../components/ManageDataTable/ManageDataTable";
import PageTitle from "../../components/Shared/PageTitle/PageTitle";
import "./Admin.css";

const ManageUploadData = () => {
  return (
    <>
      <PageTitle title='Manage Upload Data' />
      <div className='text-center my-3 '>
        <h1 className='fw-bold'>MANAGE UPLOAD DATA</h1>
        <div className='manage-heading mx-auto'></div>
      </div>
      <ManageDataTable />
    </>
  );
};

export default ManageUploadData;
