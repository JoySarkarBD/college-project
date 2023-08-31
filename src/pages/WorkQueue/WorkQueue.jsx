import PageTitle from "../../components/Shared/PageTitle/PageTitle";
import WorkingDataTable from "../../components/WorkingDataTable/WorkingDataTable";
import './workQueue.css';

const WorkQueue = () => {
  return (
    <div>
      <PageTitle title='Work Queue' />
      <h1 className='text-center my-4 work_queue_title'>WORK QUEUE</h1>
      <WorkingDataTable />
    </div>
  );
};

export default WorkQueue;
