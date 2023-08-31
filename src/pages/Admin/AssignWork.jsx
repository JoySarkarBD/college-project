import DataTable from "../../components/DataTable/DataTable";
import PageTitle from "../../components/Shared/PageTitle/PageTitle";
import "./Admin.css";

const AssignWork = () => {
  return (
    <>
      <PageTitle title='Assign Work' />
      <div className='text-center my-3 '>
        <h2 className='fw-bold'>ASSIGN WORK</h2>
        <div className='admin-heading mx-auto'></div>
      </div>
      <DataTable />
    </>
  );
};

export default AssignWork;
