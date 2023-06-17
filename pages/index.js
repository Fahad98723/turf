import React, { useEffect, useState } from "react";
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
import axios from "axios";
import Calendar from "../components/Calendar/Calendar";

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
    email: "turf@gmail.com",
    phonenumber: "01865236836",
    price: 2000,
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
    price: 1000,
    email: "turf2@gmail.com",
    phonenumber: "01665236836",
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
    email: "turf3@gmail.com",
    phonenumber: "01365236836",
    video: "https://example.com/video3.mp4",
    name: "Turf 3",
    price: 1500,
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

  // useEffect(() => {
  //   const run = async () => {
  //     try {
  //       const res = await axios.get(`https://ai.ostello.co.in/chat/room`, {
  //         headers: {
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //       });
  //       console.log(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   run();
  // }, []);

  const router = useRouter();
  const [select, setSelect] = useState([]);
  const [selectTime, setSelectTime] = useState([]);

  const [confrimPage, setConfirmPage] = useState(false);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const handleChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const [priceStatus, setPricestatuse] = useState("pending");
  const [priceMethod, setPriceMethod] = useState("pending");
  const [item, setItem] = useState({});

  // const handleTimeClick = (timeInterval) => {
  //   if (select.includes(timeInterval)) {
  //     setSelect(select.filter((selected) => selected !== timeInterval));
  //   } else {
  //     setSelect([...select, timeInterval]);
  //   }
  // };
  // const handleExtendTime = (timeInterval) => {
  //   const isTimeSelected = select.includes(timeInterval);

  //   if (isTimeSelected) {
  //     const [startTime, endTime] = timeInterval.split(" - ");

  //     // Check if any other time interval is already selected within the same range
  //     const hasOverlappingInterval = select.some((selected) => {
  //       if (selected !== timeInterval) {
  //         const [selectedStartTime, selectedEndTime] = selected.split(" - ");
  //         return (
  //           (startTime >= selectedStartTime && startTime < selectedEndTime) ||
  //           (endTime > selectedStartTime && endTime <= selectedEndTime)
  //         );
  //       }
  //       return false;
  //     });

  //     if (hasOverlappingInterval) {
  //       return; // Return early if there's an overlapping interval
  //     }

  //     const updatedSelect = select.map((selected) => {
  //       if (selected === timeInterval) {
  //         if (!selected.includes("+30 minutes")) {
  //           // Add 30 minutes to the time interval
  //           const extendedEndTime = add30Minutes(endTime);
  //           return startTime + " - " + extendedEndTime + " +30 minutes";
  //         } else {
  //           // Remove 30 minutes from the time interval
  //           const shortenedEndTime = remove30Minutes(endTime);
  //           return startTime + " - " + shortenedEndTime;
  //         }
  //       }
  //       return selected;
  //     });

  //     setSelect(updatedSelect);
  //   }
  // };

  const add30Minutes = (timeString) => {
    let [time, ampm] = timeString.split(" ");

    const [hours, minutes] = time.split(".");
    let extendedHours = parseInt(hours);
    let extendedMinutes = parseInt(minutes) + 30;

    if (extendedMinutes >= 60) {
      extendedHours += Math.floor(extendedMinutes / 60);
      extendedMinutes %= 60;
    }

    // Adjust for AM/PM
    if (extendedHours >= 12) {
      if (ampm === "AM") {
        ampm = "PM";
      } else {
        ampm = "AM";
      }
    }

    return `${extendedHours}.${extendedMinutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  const remove30Minutes = (timeString) => {
    let [time, ampm] = timeString.split(" ");

    let [hours, minutes] = time.split(".");
    let shortenedHours = parseInt(hours);
    let shortenedMinutes = parseInt(minutes) - 30;

    if (shortenedMinutes < 0) {
      shortenedHours -= 1;
      shortenedMinutes += 60;
    }

    // Adjust for AM/PM
    if (shortenedHours < 0) {
      if (ampm === "AM") {
        ampm = "PM";
      } else {
        ampm = "AM";
      }
    }

    return `${shortenedHours}.${shortenedMinutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  console.log(select);

  const time =
    select.length > 0
      ? select
      : [
          "1.00 PM - 2.00 PM",
          "2.00 PM - 3.00 PM",
          "3.00 PM - 4.00 PM",
          "4.00 PM - 5.00 PM",
          "5.00 PM - 6.00 PM",
          "11.00 PM - 12.00 AM",
          "12.00 AM - 1.00 AM",
        ];

  const [timeSlots, setTimeSlots] = useState([
    { time: "1.00 PM - 2.00 PM", status: null },
    { time: "2.00 PM - 3.00 PM", status: null },
    { time: "3.00 PM - 4.00 PM", status: null },
    { time: "4.00 PM - 5.00 PM", status: null },
    { time: "5.00 PM - 6.00 PM", status: null },
    { time: "11.00 PM - 12.00 AM", status: null },
    { time: "12.00 AM - 1.00 AM", status: null },
  ]);

  const [timeSlot, setTimeSlot] = useState([
    { time: "1.00 PM - 2.00 PM", status: null },
    { time: "2.00 PM - 3.00 PM", status: null },
    { time: "3.00 PM - 4.00 PM", status: null },
    { time: "4.00 PM - 5.00 PM", status: null },
    { time: "5.00 PM - 6.00 PM", status: null },
    { time: "11.00 PM - 12.00 AM", status: null },
    { time: "12.00 AM - 1.00 AM", status: null },
  ]);

  useEffect(() => {
    const run = async () => {
      const currentDate = new Date().toISOString();
      console.log(currentDate);
      try {
        const res = await axios.get(`http://localhost:5000/slot`);
        setTimeSlot(
          res?.data?.find(
            (a) => a.date.slice(0, 10) == currentDate.slice(0, 10)
          ).timeSlots
        );

        setTimeSlots(
          res?.data
            ?.find((a) => a.date.slice(0, 10) == currentDate.slice(0, 10))
            .timeSlots.filter((a) => a.status !== "booked")
        );
      } catch (err) {
        console.log(err);
      }
    };
    run();
  }, []);

  const handleTimeClick = (index) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index].status =
      updatedTimeSlots[index].status === "booked" ? null : "booked";
    setSelect(updatedTimeSlots);
    if (selectTime.includes(updatedTimeSlots[index])) {
      setSelectTime(
        selectTime.filter((selected) => selected !== updatedTimeSlots[index])
      );
    } else {
      setSelectTime([...selectTime, updatedTimeSlots[index]]);
    }
  };

  const handleExtendTime = (index) => {
    const updatedTimeSlots = [...timeSlots];
    const selectedTimeSlot = updatedTimeSlots[index];

    if (selectedTimeSlot.status === "booked") {
      const [startTime, endTime] = selectedTimeSlot.time.split(" - ");

      // Add 30 minutes to the time interval
      const extendedEndTime = add30Minutes(endTime);
      const extendedTimeSlot = `${startTime} - ${extendedEndTime}`;
      updatedTimeSlots.splice(index, 1, {
        time: extendedTimeSlot,
        status: "booked",
      });
    }

    setTimeSlot(updatedTimeSlots);
  };

  console.log(timeSlots);

  const bookingHandle = () => {
    const data = {
      date,
      slotTime: selectTime,
      turfname: item.name,
      turfEmail: item.email,
      turfPhoneNumber: item.phonenumber,
      turfLocation: item.location,
      price: parseInt(select.length * item?.price),
      priceStatus: priceStatus,
      priceMethod: priceMethod,
      turfId: item?.id,
      name: name,
      phonenumber: number,
    };

    axios.post(`http://localhost:5000/booking`, data).then((res) => {
      if (res.data.insertedId) {
        alert("Booked");
        axios
          .patch(`http://localhost:5000/slot`, {
            turfId: item?.id,
            date: new Date().toISOString().slice(0, 10),
            timeSlots: timeSlot,
          })
          .then((res) => {
            console.log(res.data);
            alert("Booked");
          });
      }
    });
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
                  onClick={() => {
                    setOpen(true);
                    setItem(turf);
                  }}
                  className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Book Now
                </button>
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
        ))}

        <Modal
          closeOnOutsideClick={handleClose}
          onClose={handleClose}
          open={open}
        >
          <div className=" rounded-md md:w-[600px] w-[300px] flex bg-white p-5">
            {!confrimPage ? (
              <div className="flex ">
                <Calendar className={`text-black`} setDate={setDate} />
                <div className=" ml-5">
                  <p className="text-[16px]">Available Slot</p>
                  {/* {time.map((a) => (
                    <div className="flex">
                      <div
                        key={a.id}
                        onClick={() => {
                          if (select.includes(a)) {
                            setSelect(select.filter((ab) => ab !== a));
                          } else {
                            setSelect([...select, a]);
                          }
                        }}
                        className={` w-full block cursor-pointer py-2 border bg-green-500  rounded-md my-2 ${
                          select.includes(a) ? "bg-red-500 " : ""
                        }`}
                      >
                        <p className="text-center text-[16px] ">{a}</p>
                      </div>
                      {select.find((a) => a === a) &&
                      select.find((a) => a === a) === a ? (
                        <div
                          key={a.id}
                          onClick={() => {
                            if (select.includes(a)) {
                              setSelect(select.filter((ab) => ab !== a));
                            } else {
                              setSelect([...select, a]);
                            }
                          }}
                          className={` w-[50px] block cursor-pointer py-2 border bg-green-500  rounded-md my-2 ml-1`}
                        >
                          <p className="text-center text-[16px] ">+30</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))} */}

                  {timeSlots.map((timeSlot, index) => (
                    <div className="flex" key={index}>
                      <div
                        onClick={() => handleTimeClick(index)}
                        className={`w-full block cursor-pointer py-2 border rounded-md my-2 ${
                          timeSlot.status === "booked"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        <p className="text-center text-[16px]">
                          {timeSlot.time}
                        </p>
                      </div>
                      {/* {timeSlot.status === "booked" && (
                        <div
                          onClick={() => handleExtendTime(index)}
                          className="w-[50px] block cursor-pointer py-2 border rounded-md my-2 ml-1"
                        >
                          <p className="text-center text-[16px]">-30</p>
                        </div>
                      )} */}
                    </div>
                  ))}

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
                    bookingHandle();
                    // router.push("/payment");
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
