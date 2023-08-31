import AuditReportCard from "../../components/AuditReportCard/AuditReportCard";
import PageTitle from "../../components/Shared/PageTitle/PageTitle";
import "./Reports.css";

const AuditReport = () => {
  return (
    <>
      <PageTitle title='Audit Report' />
      <h1 className='text-center mt-4 mb-2 audit_report_title'>Audit Report</h1>
      <hr className='upload_divider' />
      <AuditReportCard />
    </>
  );
};

export default AuditReport;
