import React, { useEffect, useState } from "react";
import Navbar from "../../components/Sharerd/Navbar/Navbar";
import dynamic from "next/dynamic";
import "react-calendar/dist/Calendar.css";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/router";
import axios from "axios";
import Calendar from "../../components/Calendar/Calendar";

const Manager = () => {
  const [date, setDate] = useState(new Date());
  const [select, setSelect] = useState([]);
  const [selectTime, setSelectTime] = useState([]);

  const time = [
    "1.00 PM - 2.00 PM",
    "2.00 PM - 3.00 PM",
    "3.00 PM - 4.00 PM",
    // ... other time slots up to '11.00 PM - 12.00 AM'
    "11.00 PM - 12.00 AM",
    "12.00 AM - 1.00 AM",
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/booking/turf@gmail.com`
        );
        setData(res.data.message);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    run();
  }, []);
  console.log(data, "data");

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
        setTimeSlots(
          res?.data?.find(
            (a) => a.date.slice(0, 10) == currentDate.slice(0, 10)
          ).timeSlots
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
    axios
      .patch(`http://localhost:5000/slot`, {
        turfId: "item?.id",
        date: new Date().toISOString().slice(0, 10),
        timeSlots: timeSlot,
      })
      .then((res) => {
        console.log(res.data);
        alert("Booked");
      });
  };

  return (
    <div className="">
      <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:">
        <div class="fixed w-full flex items-center justify-between h-14  z-10">
          <div class="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-blue-800 dark:bg-gray-800 border-none">
            <img
              class="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden"
              src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
            />
            <span class="hidden md:block text-white">ADMIN</span>
          </div>
          <div class="flex justify-between items-center h-14 bg-blue-800 dark:bg-gray-800 p-2 header-right">
            <div class="bg-white rounded flex items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200">
              <button class="outline-none focus:outline-none">
                <svg
                  class="w-5 text-gray-600 h-5 cursor-pointer"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
              <input
                type="search"
                name=""
                id=""
                placeholder="Search"
                class="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent"
              />
            </div>
            <ul class="flex items-center">
              {/* <li>
                <button
                  aria-hidden="true"
                  class="group p-2 transition-colors duration-200 rounded-full shadow-md bg-blue-200 hover:bg-blue-200 dark:bg-gray-50 dark:hover:bg-gray-200 text-gray-900 focus:outline-none"
                >
                  <svg
                    x-show="isDark"
                    width="24"
                    height="24"
                    class="fill-current text-gray-700 group-hover:text-gray-500 group-focus:text-gray-700 dark:text-gray-700 dark:group-hover:text-gray-500 dark:group-focus:text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke=""
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  <svg
                    x-show="!isDark"
                    width="24"
                    height="24"
                    class="fill-current text-gray-700 group-hover:text-gray-500 group-focus:text-gray-700 dark:text-gray-700 dark:group-hover:text-gray-500 dark:group-focus:text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke=""
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </button>
              </li> */}
              <li>
                <div class="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center mr-4 text-white hover:text-blue-100"
                >
                  <span class="inline-flex mr-1">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </span>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full  transition-all duration-300 border-none z-10 sidebar">
          <div class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
            <ul class="flex flex-col py-4 space-y-1 text-white">
              <li class="px-5 hidden md:block">
                <div class="flex flex-row items-center h-8">
                  <div class="text-sm font-light tracking-wide text-gray-400 uppercase">
                    Main
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 -600 hover:-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-sm tracking-wide truncate">
                    Dashboard
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 -600 hover:-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-sm tracking-wide truncate">Board</span>
                  <span class="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">
                    New
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 -600 hover:-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-sm tracking-wide truncate">
                    Messages
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 -600 hover:-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-sm tracking-wide truncate">
                    Notifications
                  </span>
                  <span class="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                    1.2k
                  </span>
                </a>
              </li>
              <li class="px-5 hidden md:block">
                <div class="flex flex-row items-center mt-5 h-8">
                  <div class="text-sm font-light tracking-wide text-gray-400 uppercase">
                    Settings
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 -600 hover:-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-sm tracking-wide truncate">
                    Profile
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 -600 hover:-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-sm tracking-wide truncate">
                    Settings
                  </span>
                </a>
              </li>
            </ul>
            <p class="mb-14 px-5 py-3 hidden md:block text-center text-white text-xs">
              Copyright @2021
            </p>
          </div>
        </div>

        <div class="h-full ml-14 mt-14 mb-10 md:ml-64">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4 text-white">
            <div class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600  font-medium group">
              <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-2xl">1,257</p>
                <p>Visitors</p>
              </div>
            </div>
            <div class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600  font-medium group">
              <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-2xl">557</p>
                <p>Orders</p>
              </div>
            </div>
            <div class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600  font-medium group">
              <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-2xl">$11,257</p>
                <p>Sales</p>
              </div>
            </div>
            <div class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600  font-medium group">
              <div class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
                <svg
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-2xl">$75,257</p>
                <p>Balances</p>
              </div>
            </div>
          </div>

          <div className="flex px-5 my-5">
            <Calendar
              className={`text-black w-full bg-white`}
              setDate={setDate}
            />
            <div className=" ml-5">
              <p className="text-[16px] text-white">Available Slot</p>
              <div>
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
                      <p className="text-center text-[16px]">{timeSlot.time}</p>
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
              </div>
              <div
                onClick={(e) => setConfirmPage(true)}
                className="w-[200px] mt-5 cursor-pointer"
              >
                <p className=" px-5 py-2 bg-blue-500 text-center rounded-md mb-3  active:opacity-80 text-[18px] ">
                  Next
                </p>
              </div>
            </div>
          </div>

          <div class="px-5 ">
            <div class="w-full overflow-hidden rounded-lg shadow-xs">
              <div class="w-full overflow-x-auto">
                <table className="w-full">
                  <thead className="">
                    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      <th scope="col" className="  text-[#ABABAB] px-6 py-4 ">
                        Name
                      </th>
                      <th scope="col" className=" text-[#ABABAB] px-6 py-4 ">
                        Phone Number
                      </th>
                      <th scope="col" className=" text-[#ABABAB] px-6 py-4 ">
                        Date of Booking
                      </th>
                      <th scope="col" className=" text-[#ABABAB] px-6 py-4 ">
                        Booking Time
                      </th>
                      <th scope="col" className=" text-[#ABABAB] px-6 py-4 ">
                        Payment
                      </th>
                      <th scope="col" className=" text-[#ABABAB] px-6 py-4 ">
                        Status
                      </th>
                      <th
                        scope="col"
                        className=" text-[#ABABAB] px-6 py-4 "
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    {data?.map((item) => (
                      <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                        <td className="px-6 py-4 font-medium ">
                          <div className="flex items-center">{item.name}</div>
                        </td>
                        <td className=" font-medium px-6 py-4 whitespace-nowrap">
                          <a
                            className="text-balck"
                            href={`tel:+88${item.phonenumber}`}
                          >
                            {item.phonenumber}
                          </a>{" "}
                        </td>
                        <td className=" font-medium px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div>{new Date().toLocaleDateString()}</div>

                            <div className="text-[#9FA2B4] text-sm">
                              {new Date().toLocaleTimeString()}
                            </div>
                          </div>
                        </td>
                        <td className=" font-medium px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div>{new Date().toLocaleDateString()}</div>

                            <div className="text-[#9FA2B4] text-sm">
                              {new Date().toLocaleTimeString()} -{" "}
                              {new Date().toLocaleTimeString()}
                            </div>
                          </div>
                        </td>
                        <td className=" font-medium px-6 py-4">
                          <div className="flex flex-col ">৳ {item.price}</div>
                        </td>
                        <td className=" font-medium px-6 py-4">
                          <div className="flex flex-col ">
                            ৳ {item.priceStatus}
                          </div>
                        </td>
                        <td className=" font-medium px-6 py-4 flex items-center">
                          <div
                            onClick={(e) => setConfirmPage(true)}
                            className="w-[100px] mr-2 cursor-pointer"
                          >
                            <p className=" px-5 py-2 bg-blue-500 text-center rounded-md mb-3 text-white active:opacity-80 text-[18px] ">
                              Edit
                            </p>
                          </div>
                          <div
                            onClick={(e) => setConfirmPage(true)}
                            className="w-[100px] cursor-pointer"
                          >
                            <p className=" px-5 py-2 bg-red-500 text-center rounded-md mb-3 text-white active:opacity-80 text-[18px] ">
                              Cancel
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* <div class="mt-4 mx-4">
            <div class="w-full overflow-hidden rounded-lg shadow-xs">
              <div class="w-full overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                      <th class="px-4 py-3">Client</th>
                      <th class="px-4 py-3">Amount</th>
                      <th class="px-4 py-3">Status</th>
                      <th class="px-4 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                      <td class="px-4 py-3">
                        <div class="flex items-center text-sm">
                          <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                            <img
                              class="object-cover w-full h-full rounded-full"
                              src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                              alt=""
                              loading="lazy"
                            />
                            <div
                              class="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                          <div>
                            <p class="font-semibold">Hans Burger</p>
                            <p class="text-xs text-gray-600 dark:text-gray-400">
                              10x Developer
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-sm">$855.85</td>
                      <td class="px-4 py-3 text-xs">
                        <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                          {" "}
                          Approved{" "}
                        </span>
                      </td>
                      <td class="px-4 py-3 text-sm">15-01-2021</td>
                    </tr>
                    <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                      <td class="px-4 py-3">
                        <div class="flex items-center text-sm">
                          <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                            <img
                              class="object-cover w-full h-full rounded-full"
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;facepad=3&amp;fit=facearea&amp;s=707b9c33066bf8808c934c8ab394dff6"
                              alt=""
                              loading="lazy"
                            />
                            <div
                              class="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                          <div>
                            <p class="font-semibold">Jolina Angelie</p>
                            <p class="text-xs text-gray-600 dark:text-gray-400">
                              Unemployed
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-sm">$369.75</td>
                      <td class="px-4 py-3 text-xs">
                        <span class="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">
                          {" "}
                          Pending{" "}
                        </span>
                      </td>
                      <td class="px-4 py-3 text-sm">23-03-2021</td>
                    </tr>
                    <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                      <td class="px-4 py-3">
                        <div class="flex items-center text-sm">
                          <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                            <img
                              class="object-cover w-full h-full rounded-full"
                              src="https://images.unsplash.com/photo-1502720705749-871143f0e671?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;s=b8377ca9f985d80264279f277f3a67f5"
                              alt=""
                              loading="lazy"
                            />
                            <div
                              class="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                          <div>
                            <p class="font-semibold">Dave Li</p>
                            <p class="text-xs text-gray-600 dark:text-gray-400">
                              Influencer
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-sm">$775.45</td>
                      <td class="px-4 py-3 text-xs">
                        <span class="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700">
                          {" "}
                          Expired{" "}
                        </span>
                      </td>
                      <td class="px-4 py-3 text-sm">09-02-2021</td>
                    </tr>
                    <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                      <td class="px-4 py-3">
                        <div class="flex items-center text-sm">
                          <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                            <img
                              class="object-cover w-full h-full rounded-full"
                              src="https://images.unsplash.com/photo-1551006917-3b4c078c47c9?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                              alt=""
                              loading="lazy"
                            />
                            <div
                              class="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                          <div>
                            <p class="font-semibold">Rulia Joberts</p>
                            <p class="text-xs text-gray-600 dark:text-gray-400">
                              Actress
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-sm">$1276.75</td>
                      <td class="px-4 py-3 text-xs">
                        <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                          {" "}
                          Approved{" "}
                        </span>
                      </td>
                      <td class="px-4 py-3 text-sm">17-04-2021</td>
                    </tr>
                    <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                      <td class="px-4 py-3">
                        <div class="flex items-center text-sm">
                          <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                            <img
                              class="object-cover w-full h-full rounded-full"
                              src="https://images.unsplash.com/photo-1566411520896-01e7ca4726af?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                              alt=""
                              loading="lazy"
                            />
                            <div
                              class="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                          <div>
                            <p class="font-semibold">Hitney Wouston</p>
                            <p class="text-xs text-gray-600 dark:text-gray-400">
                              Singer
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-sm">$863.45</td>
                      <td class="px-4 py-3 text-xs">
                        <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                          {" "}
                          Denied{" "}
                        </span>
                      </td>
                      <td class="px-4 py-3 text-sm">11-01-2021</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                <span class="flex items-center col-span-3">
                  {" "}
                  Showing 21-30 of 100{" "}
                </span>
                <span class="col-span-2"></span>

                <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                  <nav aria-label="Table navigation">
                    <ul class="inline-flex items-center">
                      <li>
                        <button
                          class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                          aria-label="Previous"
                        >
                          <svg
                            aria-hidden="true"
                            class="w-4 h-4 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </li>
                      <li>
                        <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                          1
                        </button>
                      </li>
                      <li>
                        <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                          2
                        </button>
                      </li>
                      <li>
                        <button class="px-3 py-1  dark:text-gray-800 transition-colors duration-150 bg-blue-600 dark:bg-gray-100 border border-r-0 border-blue-600 dark:border-gray-100 rounded-md focus:outline-none focus:shadow-outline-purple">
                          3
                        </button>
                      </li>
                      <li>
                        <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                          4
                        </button>
                      </li>
                      <li>
                        <span class="px-3 py-1">...</span>
                      </li>
                      <li>
                        <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                          8
                        </button>
                      </li>
                      <li>
                        <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                          9
                        </button>
                      </li>
                      <li>
                        <button
                          class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                          aria-label="Next"
                        >
                          <svg
                            class="w-4 h-4 fill-current"
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Manager;
