'use client'
import Link from "next/link";
import React from "react";

const Session = ({event}) => {
  console.log(event)
  const startTimeParts = event.startTime.split(":");
  const startHours = parseInt(startTimeParts[0]);
  const startMinutes = parseInt(startTimeParts[1]);
  const adjustedMinutes = parseInt(startMinutes) + parseInt(event.welcomeTime);
  const adjustedHours = startHours + Math.floor(adjustedMinutes / 60);
  const adjustedMinutesRemainder = adjustedMinutes % 60;
  const adjustedStartTime = `${adjustedHours
    .toString()
    .padStart(2, "0")}:${adjustedMinutesRemainder.toString().padStart(2, "0")}`;
   console.log(adjustedStartTime)

  return (
    <div className="w-full pb-2">
     
      <div className=" flex justify-between">
        <div>
          <h2>Session</h2>
          <div className="mt-3">
            <div className="bg-primary text-black px-3 py-2 w-20 rounded-lg">
              <p>July</p>
              <p>24</p>
            </div>
          </div>
        </div>
        <div>
          <Link href="/event">
            <span className="bg-gradient-to-br from-primary via-primary to-secondry hover:bg-gradient-to-br hover:from-secondry hover:via-primary hover:to-primary font-semibold text-gray-800 text-sm tracking-wider w-full py-3 px-5 rounded-3xl">
              Add Activity
            </span>
          </Link>
        </div>
      </div>
      <div className="border border-gray-600 w-full mt-7"></div>
      <div className="bg-secondry py-2 px-6 text-black rounded-lg flex gap-10 mt-7 w-fit ">
        <p>Welcome Session</p>
        <p>{event.startTime} - {event.welcometime} min</p>
      </div>

      <div className="bg-secondry py-2 px-6 text-black rounded-lg flex gap-10 mt-7 ml-40 w-fit ">
        <p>Start Event</p>
        <p>{adjustedStartTime} - 30 min</p>
      </div>
    </div>
  );
};

export default Session;
