import React, { useRef } from "react";
import Carousel from "react-elastic-carousel";


const Partners = () => {
  const carousel = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "Anigrah",
      work: "Cuet Student",
      img: 'https://prod-media-eng.dhakatribune.com/uploads/2020/11/jaff-1605617789692.jpg',
      reviewText:
        "I recently discovered Ostello, and it is safe to say that it has entirely transformed my academic journey. From linking me with some of the town's most amazing mentors to giving me 100% reliable information, Ostello has been very helpful in shaping my future.",
    },
    {
      id: 2,
      name: "Anvisha",
      work: "Student",
      img: 'https://previews.123rf.com/images/koonsiri/koonsiri2003/koonsiri200300195/143381474-soccer-ball-on-green-artificial-turf-at-corner-of-football-field-with-blurry-players-background.jpg',
      reviewText:
        "My life has gotten so much easier since I found Ostello, last year. For years, I have been looking for the right coaching center for me, but the process was very difficult and stressful. However with Ostello, I was able to find the coaching institute that best fits my needs and it's currently helping me succeed academically, and I owe it all to Ostello.",
    },
    {
      id: 3,
      name: "Imaan",
      work: "Student",
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8OcLOKUFobb8MPOWcnrRdjvIQOHqU6p5LjDk_cWk2XRatIIQNYbLKsO4YPG4p7NTMVM&usqp=CAU',
      reviewText:
        "It has always been my habit to research well before making a decision, and coaching institutes were no exception. However, it can be extremely difficult to find all the information you need. This is where Ostello came into my life, giving me access to all the data and information I could possibly need. With their assistance, I was able to find the ideal institute in my neighborhood.",
    },
    {
      id: 1,
      name: "Anigrah",
      work: "Cuet Student",
      img: 'https://www.greatsportstech.com/images/astro_park.jpg',
      reviewText:
        "I recently discovered Ostello, and it is safe to say that it has entirely transformed my academic journey. From linking me with some of the town's most amazing mentors to giving me 100% reliable information, Ostello has been very helpful in shaping my future.",
    },
    {
      id: 2,
      name: "Anvisha",
      work: "Student",
      img: 'https://www.w3schools.com/css/img_lights.jpg',
      reviewText:
        "My life has gotten so much easier since I found Ostello, last year. For years, I have been looking for the right coaching center for me, but the process was very difficult and stressful. However with Ostello, I was able to find the coaching institute that best fits my needs and it's currently helping me succeed academically, and I owe it all to Ostello.",
    },
    {
      id: 3,
      name: "Imaan",
      work: "Student",
      img: 'https://www.w3schools.com/css/img_lights.jpg',
      reviewText:
        "It has always been my habit to research well before making a decision, and coaching institutes were no exception. However, it can be extremely difficult to find all the information you need. This is where Ostello came into my life, giving me access to all the data and information I could possibly need. With their assistance, I was able to find the ideal institute in my neighborhood.",
    },
  ];
  return (
    <div className="p-5 sm:p-10">
      <div>
        <p className="md:text-[45px] text-[25px] font-semibold text-center mb-5">
          <span className="text-primary font-bold ">Partners </span> &{" "}
          <span className="text-primary font-bold ">Collaborators </span>
        </p>
        <Carousel
          ref={carousel}
          showArrows={false}
          itemsToShow={2}
          className=""
          pagination={true}
          renderPagination={({ pages, activePage, onClick }) => {
            return (
              <div className="flex items-center space-x-2 mt-3 ">
                {pages?.map((page, i) => {
                  const isActivePage = activePage === page;
                  return (
                    <div
                      className={`cursor-pointer  h-2 rounded-md my-5 transition-all duration-500 ease-in-out ${
                        isActivePage
                          ? "bg-[#02243d] md:w-28 w-16 "
                          : "bg-[#567D46] md:w-6 w-2"
                      }`}
                      key={i}
                      onClick={() => onClick(page)}
                      // active={isActivePage}
                    />
                  );
                })}
              </div>
            );
          }}
          breakPoints={[
            { width: 1, itemsToShow: 1 },
            { width: 600, itemsToShow: 1 },
            { width: 900, itemsToShow: 3 },
          ]}
        >
          {reviews?.map((item, index) => (
            <div
              key={index}
              className=" bg-white m-2  rounded-[10px] border-2 border-light-gray max-h-[300px] h-full shadow-md"
            >
              <div>
                <img
                  className="w-full h-[250px] rounded-[10px] "
                  src={item.img}
                  alt=""
                />

                {/* <div className="p-5">
                    <h4 className=" text-[24px]">{item?.name}</h4>
                    <p className="text-[18px] text-[#407BFF] mt-2">
                      {item?.work}
                    </p>
                  </div> */}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Partners;
