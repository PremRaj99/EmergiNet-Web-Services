import React from "react";
import CarPng from "../../assets/car-gps1.webp";

const About = () => {
  return (
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={CarPng}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[350px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                About us
              </h1>
              <p data-aos="fade-up" className=" tracking-wide">
                We are a team driven by the goal of saving lives after
                accidents. Witnessing the devastating impact of delayed medical
                attention, we developed a revolutionary system to bridge the
                critical gap in the "golden hour." Our IoT device detects
                accidents in real-time, triggering a multi-pronged alert system
                via a dedicated server.
              </p>
              <p data-aos="fade-up">
                Additionally, the system empowers nearby drivers to offer
                immediate assistance, creating a network of potential
                bystanders. By expediting medical response and leveraging the
                power of community, our invention aims to significantly reduce
                post-accident fatalities and build a safer future for everyone.
              </p>
              <button data-aos="fade-up" className="button-outline bg-red-300 px-4 py-2 rounded-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
