import DataExportCard from "../../components/DataExportCard/DataExportCard";
import PageTitle from "../../components/Shared/PageTitle/PageTitle";
import "./Reports.css";

const DataExport = () => {
  return (
    <>
      <PageTitle title='Data Report' />
      <h1 className='text-center mt-4 mb-2 data_report_title'>Data Report</h1>
      <hr className='upload_divider' />
      <DataExportCard />
    </>
  );
};

export default DataExport;
