'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import eventimg from "@/images/backbg.jpg";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const EventList = ({ events }) => {

  const router = useRouter();
  const { user } = useAuth();
  const handleViewDetails = (eventId) => {
    if (eventId) {
      router.push(`/dashboard/event/${eventId}`);
    }
  };
  const [eventStatuses, setEventStatuses] = useState("Complete");
  const [registeredEvents, setRegisteredEvents] = useState();
  useEffect(() => {

    if(user && user.role === "attendee"){
    const filterUserRegisterEvents = () => {
      const registerEvents = events.filter((event) =>
        event.registeredUsers.includes(user.uid)
      );
      setRegisteredEvents(registerEvents);
    };
    filterUserRegisterEvents();
  }else{
    setRegisteredEvents(events);
    }

  }, [user, events]);

  useEffect(() => {
    const updateEventStatuses = () => {
      const currentDate = new Date();
      const currentTime = currentDate.toLocaleTimeString();
      const updatedEventStatuses = {};
      if (events) {
        events.forEach((event) => {
          const startDate = new Date(`${event.start} ${event.startTime}`);
          const endDate = new Date(`${event.end} ${event.endTime}`);

          if (startDate > currentDate ) {
            updatedEventStatuses[event.id] = "Upcoming";
          } else if (
            currentDate >= startDate &&
            currentDate <= endDate &&
            currentTime >= event.startTime
            
          ) {
            updatedEventStatuses[event.id] = "Running";
          } else {
            updatedEventStatuses[event.id] = "Complete";
          }
        });
      }
      setEventStatuses(updatedEventStatuses);
    };

    updateEventStatuses(); // Initial update
    // Update event statuses every second
    const interval = setInterval(updateEventStatuses, 1000);

    return () => {
      clearInterval(interval); // Clear interval on component unmount
    };
  }, [events, user]);

  return (
    <div>
      <ul className="space-y-6">
        <li className="md:flex hidden md:visible justify-between items-center bg-black  bg-opacity-40  rounded-xl py-4 px-1 md:px-4">
          <div className="w-1/3 md:w-3/5">
            <h2 className="px-2 tracking-wider"> Event Title </h2>
          </div>
          <div className="w-1/3 md:w-1/5">
            <h2 className="text-center tracking-wider"> Status </h2>
          </div>
          <div className="w-1/3 md:w-1/5">
            <h2 className="text-center tracking-wider"> Action </h2>
          </div>
        </li>
        {registeredEvents &&
        registeredEvents.map((e) => {
          const eventStatus = eventStatuses[e.id] || "";
            return (
              <li
                key={e.id}
                className="flex flex-col md:flex-row  md:justify-between md:items-center  bg-black  bg-opacity-20 shadow-lg rounded-xl py-4 px-4"
              >
                <div className="w-full md:w-3/5 flex flex-col md:flex-row  gap-5 md:items-center">
                  <Image
                    src={eventimg}
                    alt="eventimg"
                    width={150}
                    height={150}
                    className="rounded-lg w-full md:w-36"
                  />
                  <div className="space-y-4">
                    <h2 className="tracking-wide capitalize">{e.title}</h2>
                    <div className="flex gap-4">
                      <div className="space-y-1 text-gray-400 ">
                        <p className="text-xs">Start Date: {e.start} </p>
                        <p className="text-xs">Start Time: {e.startTime} </p>
                      </div>
                      <div className="space-y-1 text-gray-400 ">
                        <p className="text-xs">End Date: {e.end} </p>
                        <p className="text-xs">End Time: {e.endTime} </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full my-3 md:my-0 md:w-1/5 md:text-center">
                  <p
                    className={
                      eventStatus === "Complete"
                        ? "text-red-500"
                        : eventStatus === "Running"
                        ? "text-secondry animate-blink"
                        : "text-primary"
                    }
                  >
                    {eventStatus}
                  </p>
                </div>
                <div className="w-full md:w-1/5 md:text-center">
                  <button
                    onClick={() => handleViewDetails(e.id)}
                    className="bg-gray-200 hover:bg-gray-300 rounded-xl px-5 py-2 text-black text-sm"
                  >
                    View Event
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default EventList;
