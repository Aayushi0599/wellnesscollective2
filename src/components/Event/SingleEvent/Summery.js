'use client'
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";

const Summery = ({ event }) => {  
  const { user } = useAuth();
  const handlebooth = () => {};
  const totalRegister = event.registeredUsers.length;
  const totalseatleft = event.participant - totalRegister;

  const startTimeParts = event.startTime.split(":");
  const startHours = parseInt(startTimeParts[0]);
  const startMinutes = parseInt(startTimeParts[1]);
  const adjustedMinutes = parseInt(startMinutes) + parseInt(event.welcometime);
  const adjustedHours = startHours + Math.floor(adjustedMinutes / 60);
  const adjustedMinutesRemainder = adjustedMinutes % 60;
  const adjustedStartTime = `${adjustedHours
    .toString()
    .padStart(2, "0")}:${adjustedMinutesRemainder.toString().padStart(2, "0")}`;

  return (
    <div className=" flex flex-col md:flex-row px-3 md:px-0 justify-between gap-8">
     
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <div className="bg-gray-700 bg-opacity-20  px-8 py-8 rounded-2xl flex sm:flex-row flex-col gap-10">
          <div className="w-full sm:w-1/2 border-0 sm:border-r border-gray-600 pr-5 ">
            <h2>Schedule</h2>
            <div className="flex gap-6 sm:gap-2 justify-between mt-5">
              <div className="w-1/2 flex flex-col gap-4 ">
                <div>
                  <p>{event.start}</p>
                  <p>{event.startTime} </p>
                </div>
                <div>
                  <p>Conversation Start</p>
                  <p>{adjustedStartTime} </p>
                </div>
              </div>

              <div className="w-1/2 flex flex-col gap-4 text-gray-400">
                <div>
                  <p>Welcome Session</p>
                  <p>{event.welcometime} min</p>
                </div>
                <div>
                  <p>{event.title}</p>
                  <p>30min</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2>Host</h2>
            <div className="flex mt-5">
              <div>
                <p>Wellness Collective</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-700 bg-opacity-20  px-8 py-8 rounded-2xl flex gap-10">
          <div className="w-1/2 border-r border-gray-600 pr-5 ">
            <h2>Event Registration</h2>
            <div className="flex justify-between gap-2 mt-5">
              <div className="w-1/2 flex flex-col gap-4 ">
                <div>
                  <p>Total Seat</p>
                  <p>{event.participant}</p>
                </div>
                <div></div>
              </div>

              <div className="w-1/2 flex flex-col gap-4 text-gray-400">
                <div>
                  <p>Total left Seat</p>
                  <p>{totalseatleft}</p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <div>
            <h2>Booth (0)</h2>
            <div className="flex mt-5">
              <button
                onClick={handlebooth}
                className="flex border border-dashed px-10 py-1"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/6 bg-gray-700 bg-opacity-20 flex flex-col px-8 py-8 rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="tracking-wider">Event Details</h2>
          { user && user.role === "host" ? (
            <Link href="/" className="text-primary">
              Edit
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="mt-3 text-gray-300">
          <p className="text-sm">
            {event.start}, {event.startTime} - {event.endTime}{" "}
          </p>
          <p className="text-sm">Message- {event.message}</p>

          <div className="mt-4 ">
            <h2 className="mb-2 text-white tracking-wider">Event Setting</h2>
            <p className="text-sm">* Session Recording</p>
            <p className="text-sm">* Chat Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summery;
