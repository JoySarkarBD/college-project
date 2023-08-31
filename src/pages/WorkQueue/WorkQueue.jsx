import PageTitle from "../../components/Shared/PageTitle/PageTitle";
import WorkingDataTable from "../../components/WorkingDataTable/WorkingDataTable";

const WorkQueue = () => {
  return (
    <div>
      <PageTitle title='Work Queue' />
      <h1 className='text-center my-5 text-secondary'>WORK QUEUE</h1>
      <WorkingDataTable />
    </div>
  );
};

export default WorkQueue;
