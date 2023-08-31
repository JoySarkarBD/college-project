import PageTitle from "../../components/Shared/PageTitle/PageTitle";
import WorkingDataTable from "../../components/WorkingDataTable/WorkingDataTable";
import "./workQueue.css";

const WorkQueue = () => {
  return (
    <>
      <PageTitle title='Work Queue' />
      <h1 className='text-center mt-4 mb-2 work_queue_title'>WORK QUEUE</h1>
      <hr className='upload_divider' />
      <WorkingDataTable />
    </>
  );
};

export default WorkQueue;
