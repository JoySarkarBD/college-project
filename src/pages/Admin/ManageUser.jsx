import PageTitle from "../../components/Shared/PageTitle/PageTitle";
import UserDataTable from "../../components/UserDataTable/UserDataTable";
import "./Admin.css";

const ManageUser = () => {
  return (
    <>
      <PageTitle title='Manage User' />
      <div className='text-center my-3 '>
        <h2 className='fw-bold'>USER LIST</h2>
        <div className='admin-heading mx-auto'></div>
      </div>
      <UserDataTable />
    </>
  );
};

export default ManageUser;
