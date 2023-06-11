import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Sharerd/Navbar/Navbar";
import dynamic from "next/dynamic";
import "react-calendar/dist/Calendar.css";
import Modal from "../components/Sharerd/Modal";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/router";
import Banner from "../components/Banner";
import Footer from "../components/Sharerd/Footer";
import Vision from "../components/HomeLanding/Vision";
import Partners from "../components/HomeLanding/Partners";
const Calendar = dynamic(
  () => {
    return import("react-calendar");
  },
  { ssr: false }
);

const turfs = [
  {
    id: 1,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcDEZS8IYEV5ImlTxBxDwg5Hi96osNUZKh6w&usqp=CAU",
      "https://example.com/turf1-2.jpg",
      "https://example.com/turf1-3.jpg",
    ],
    avatar: "https://example.com/avatar1.jpg",
    video: "https://example.com/video1.mp4",
    name: "Turf 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada, quam non elementum aliquet, odio neque fermentum massa, nec semper ligula eros nec neque.",
    location: "City A, Country A",
  },
  {
    id: 2,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE_eJ0TMTtGsLoGIvRzWp70acwnpzmGm4p5w&usqp=CAU",
      "https://example.com/turf2-2.jpg",
      "https://example.com/turf2-3.jpg",
    ],
    avatar: "https://example.com/avatar2.jpg",
    video: "https://example.com/video2.mp4",
    name: "Turf 2",
    description:
      "Praesent mattis est nec finibus varius. Suspendisse sollicitudin nunc vel malesuada consectetur. Sed eu metus finibus, tempus elit ac, suscipit erat.",
    location: "City B, Country B",
  },
  {
    id: 3,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_hm2ot3LIfi0e2Ilg8ERC8n6OQXr3oSdPEw&usqp=CAU",
      "https://example.com/turf3-2.jpg",
      "https://example.com/turf3-3.jpg",
    ],
    avatar: "https://example.com/avatar3.jpg",
    video: "https://example.com/video3.mp4",
    name: "Turf 3",
    description:
      "Vestibulum sed ante ut sapien consectetur dignissim. Quisque nec tellus varius, feugiat lorem non, dapibus purus. Sed ut libero posuere, euismod justo ut, dapibus sapien.",
    location: "City C, Country C",
  },
];

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const router = useRouter();
  const [select, setSelect] = useState([]);

  const [confrimPage, setConfirmPage] = useState(false);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  return (
    <div className="max-w-[1450px] mx-auto">
      <Navbar />

      <Banner />

      <div className=" mt-10 mx-auto  grid lg:grid-cols-2  grid-cols-1 gap-[60px] ">
        {turfs.map((turf) => (
          <div
            key={turf.id}
            className="bg-[#02243d] text-white w-full h-[300px] rounded shadow-md  flex card "
          >
            <img
              className="w-[300px] h-full rounded-l-sm"
              src={turf.images[0]}
              alt="Turf Image"
            />
            <div className="w-full flex flex-col">
              <div className="p-4 pb-0 flex-1">
                <h3 className="font-light mb-1 ">{turf.name}</h3>
                <div className="text-xs flex items-center mb-4">
                  <i className="fas fa-map-marker-alt mr-1 text-grey-dark"></i>
                  {turf.location}
                </div>
                <span className="text-5xl ">
                  ৳ 63.00<span className="text-lg">/PPPN</span>
                </span>
                <div className="flex items-center mt-4">
                  <div className="pr-2 text-xs">
                    <i className="fas fa-wifi text-green"></i> Free WiFi
                  </div>
                  <div className="px-2 text-xs">
                    <i className="text-grey-darker far fa-building"></i> 2mins
                    to center
                  </div>
                </div>
              </div>
              <div className="bg-grey-lighter p-3 flex items-center justify-between transition hover:bg-grey-light">
                <button
                  onClick={() => setOpen(true)}
                  className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Book Now
                </button>
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
        ))}

        <Modal closeOnOutsideClick={false} onClose={handleClose} open={open}>
          <div className=" rounded-md md:w-[600px] w-[300px] flex bg-white p-5">
            {!confrimPage ? (
              <div className="flex ">
                <Calendar
                  onChange={setDate}
                  value={date}
                  className="react-calendar"
                />
                <div className=" ml-5">
                  <p className="text-[16px]">Available Slot</p>
                  <div>
                    <div
                      onClick={() => {
                        if (select.includes("8.00 PM - 9.00pm")) {
                          setSelect(
                            select.filter((a) => a !== "8.00 PM - 9.00pm")
                          );
                        } else {
                          setSelect([...select, "8.00 PM - 9.00pm"]);
                        }
                      }}
                      className={` w-full block cursor-pointer py-2 border  rounded-md my-2 ${
                        select.includes("8.00 PM - 9.00pm")
                          ? "bg-green-500 text-white"
                          : ""
                      }`}
                    >
                      <p className="text-center text-[16px] ">
                        8.00 PM - 9.00pm
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        if (select.includes("9.00 PM - 10.00pm")) {
                          setSelect(
                            select.filter((a) => a !== "9.00 PM - 10.00pm")
                          );
                        } else {
                          setSelect([...select, "9.00 PM - 10.00pm"]);
                        }
                      }}
                      className={` w-full block cursor-pointer py-2 border  rounded-md my-2 ${
                        select.includes("9.00 PM - 10.00pm")
                          ? "bg-green-500 text-white"
                          : ""
                      }`}
                    >
                      <p className="text-center text-[16px] ">
                        9.00 PM - 10.00pm
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={(e) => setConfirmPage(true)}
                    className="w-[200px] mt-5 cursor-pointer"
                  >
                    <p className=" px-5 py-2 bg-blue-500 text-center rounded-md mb-3 text-white active:opacity-80 text-[18px] ">
                      Next
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div
                  onClick={() => setConfirmPage(false)}
                  className=" mb-2 text-[#828095] flex cursor-pointer text-lg font-medium items-center"
                >
                  <MdOutlineKeyboardArrowLeft className="mr-2 scale-125" /> Back
                </div>
                <div className="shrink md:pr-3 md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                  <p className="text-base mb-1 text-[#333333] ">
                    Your Name <small>*</small>
                  </p>
                  <input
                    type="text"
                    autoFocus
                    className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                    placeholder="Enter your name"
                    onChange={(e) => handleChange(e, setName)}
                    value={name}
                  />
                </div>
                <div className="shrink   md:w-3/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
                  <p className="text-base mb-1 text-[#333333] ">
                    Phone Number <small>*</small>
                  </p>
                  <input
                    type="text"
                    autoFocus
                    className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
                    placeholder="Enter your phone number"
                    onChange={(e) => handleChange(e, setNumber)}
                    value={number}
                  />
                </div>
                <div
                  onClick={(e) => {
                    router.push("/payment");
                  }}
                  className="w-[200px] mt-5 cursor-pointer"
                >
                  <p className=" px-5 py-2 bg-blue-500 text-center rounded-md mb-3 text-white active:opacity-80 text-[18px] ">
                    Confirm
                  </p>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
      <Vision />
      <Partners />
      <Footer />
    </div>
  );
}
