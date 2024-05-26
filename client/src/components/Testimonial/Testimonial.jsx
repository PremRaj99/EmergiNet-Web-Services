import React from "react";

const testimonialData = [
  {
    name: " Dr. Sarah Thompson, Emergency Physician",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPxwCQ-3so8qgY_gi7u5ZfOqiIhUw_lEMbLRHslvv_3g&s",
    description:
      "As an emergency physician, I witness firsthand the devastating consequences of delayed medical attention after accidents. The  real-time accident detection and notification system developed by [Your Company Name] is a game-changer.  Knowing the exact location of an accident and receiving crucial information instantly allows us to respond much faster. This technology has the potential to save countless lives and significantly improve patient outcomes during the critical 'golden hour.",
    aosDelay: "0",
  },
  {
    name: "John Smith, Accident Survivor",
    image: "https://cdns-images.dzcdn.net/images/artist/086f50bb1ce0e3033634e5e9c2d75462/500x500.jpg",
    description:
      "I was involved in a serious accident on a deserted highway. Thankfully, the [Your Company Name] device in my car detected the crash and sent out immediate alerts. Within minutes, emergency responders were on the scene, providing me with life-saving care. I'm incredibly grateful for this technology. It gave me a second chance and brought peace of mind to my family by notifying them quickly.",
    aosDelay: "300",
  },
  {
    name: "Maria Garcia, Witness",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfp3PTasW1dgkUaWo-zIvPssFORCxYa0OhrMfh86QsRQ&s",
    description: "While driving home, I saw a car accident on a nearby road. Fortunately, my phone buzzed with an alert from the [Your Company Name] system. It provided the exact location and notified me it was an accident. I pulled over and used the information to call emergency services immediately. Even though I wasn't directly involved, knowing I could offer assistance during a critical time  was empowering. This system truly creates a network of people who can make a difference.",
    aosDelay: "1000",
  },
];
const Testimonial = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
        <div className="container">
          {/* Header */}
          <div className="space-y-4 pb-12">
            <p
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              What Our Clients Say About Us
            </p>
            <p data-aos="fade-up" className="text-center sm:px-44">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis iure consectetur tempora amet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
            {testimonialData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12 dark:bg-white/20 bg-gray-100 duration-300  rounded-lg "
              >
                <div className="grid place-items-center ">
                  <img
                    src={skill.image}
                    alt=""
                    className="rounded-full w-20 h-20"
                  />
                </div>
                <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                <p>{skill.description}</p>
                <p className="text-center font-semibold">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
