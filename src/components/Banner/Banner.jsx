import bannerImg from "../../assets/bannerImg.jpg";
import "./Banner.css";

const Banner = () => {
  return (
    <div className='container py-5 banner'>
      {/* banner heading title */}
      <div className='banner_head'>
        <h3>Welcome To aPP Tool</h3>
      </div>

      <div className='row w-100 mt-2 gap-4 gap-md-0 gap-lg-0'>
        {/* banner left side */}
        <div className='col-12 col-md-6 col-lg-6 banner-left-side'>
          {/* Banner text */}
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi,
            voluptatem vel velit ipsum dolor eos labore nam reiciendis assumenda
            temporibus repellendus omnis, asperiores architecto culpa sapiente
            earum quasi placeat aperiam. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Eligendi, voluptatem vel velit ipsum dolor eos
            labore nam reiciendis assumenda temporibus repellendus omnis,
            asperiores architecto culpa sapiente earum quasi placeat aperiam.
          </p>

          {/* status title */}
          <div className='mt-5'>
            <h3 className='title'>Current Status</h3>

            {/* status title */}
            <div className='status-items mt-4'>
              <p>Team Status</p>
              <p>Completed : 539738</p>
              <p>Work In Progress : 72</p>
              <p>Pending : 1172</p>
            </div>

            <div className='mt-4 status-items'>
              <p>My Status</p>
              <p>Completed : 80</p>
              <p>Work In Progress : 10</p>
              <p>Pending : 30</p>
            </div>
          </div>
        </div>
        {/* banner right side */}
        <div className='col-12 col-md-6 col-lg-6 banner-img-area'>
          <img src={bannerImg} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Banner;
