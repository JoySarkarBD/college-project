import "./Announcements.css";
const Announcements = () => {
  return (
    <>
      <div className='container overflow-hidden text-center announcement'>
        <div className='row gx-5 gy-3 gy-md-0 gy-lg-0'>
          <div className='col-12 col-md-6 col-lg-6'>
            <div className='card'>
              <h2 className='card_title'>Announcement</h2>

              <div className='card-body'>
                <h3 className='mb-3'>1. Announcement 1</h3>
                <h3>2. Announcement 2</h3>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-6 col-lg-6'>
            <div className='card'>
              <h2 className='card_title'>Alerts</h2>
              <div className='card-body'>
                <h3>
                  1. Download alert. Tool will be under scheduled maintenance
                  between 0000hrs on 15 mar 2023 0600hrs on 15 mae 2023
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcements;
