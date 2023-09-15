'use client'
import React, { useState } from "react";
import Session from "./Schedule/Session";
import SessionRecording from "./Schedule/SessionRecording";
import SpeakersHost from "./Schedule/SpeakersHost";
import Activity from "./Schedule/Activity";

const Schedule = ({event}) => {
  const [activeLink, setActiveLink] = useState("session");
  const [showSession, setShowSession] = useState(true);
  const [showSpeakersHost, setShowSpeakersHost] = useState(false);
  const [showSessionRecording, setShowSessionRecording] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
    
  const handleMenuClick = (link) => {
    setActiveLink(link);
    if (link === "session") {
      setShowSession(true);
      setShowSpeakersHost(false);
      setShowSessionRecording(false);
      setShowActivity(false);a
     
    } else if (link === "speakersandhosts") {
      setShowSession(false);
      setShowSpeakersHost(true);
      setShowSessionRecording(false);
      setShowActivity(false);
    } else if (link === "session_recording") {
      setShowSession(false);
      setShowSpeakersHost(false);
      setShowSessionRecording(true);
      setShowActivity(false);
    } else if (link === "activity") {
      setShowSession(false);
      setShowSpeakersHost(false);
      setShowSessionRecording(false);
      setShowActivity(true);
    }
  };

  return (
    <div className="flex gap-4 ">
      <div className="w-1/4 bg-gray-700 bg-opacity-20  px-8 py-8 rounded-2xl flex gap-10">
        <ul className="flex flex-col text-gray-200 tracking-wide gap-4">
          <li
            className={
              activeLink === "session"
                ? " py-2 pr-2 rounded-md border-r-2 border-secondry"
                : " py-2 cursor-pointer"
            }
            onClick={() => handleMenuClick("session")}
          >
            Session
          </li>
          <li
            className={
              activeLink === "speakersandhosts"
                ? " py-2 pr-2 rounded-md border-r-2 border-secondry"
                : " py-2 cursor-pointer"
            }
            onClick={() => handleMenuClick("speakersandhosts")}
          >
            Speakers & Hosts
          </li>
          <li
            className={
              activeLink === "session_recording"
                ? " py-2 pr-2 rounded-md border-r-2 border-secondry"
                : " py-2 cursor-pointer"
            }
            onClick={() => handleMenuClick("session_recording")}
          >
            Session Recording
          </li>
          <li
            className={
              activeLink === "activity"
                ? " py-2 pr-2 rounded-md border-r-2 border-secondry"
                : " py-2 cursor-pointer"
            }
            onClick={() => handleMenuClick("activity")}
          >
            Activity
          </li>
        </ul>
      </div>
      <div className="w-3/4 bg-gray-800 bg-opacity-20  px-8 py-8 rounded-2xl flex gap-10">
        {showSession && <Session event={event}/>}
        {showSpeakersHost && <SpeakersHost/>}
        {showSessionRecording && <SessionRecording/>}
        {showActivity && <Activity/>}
      </div>
    </div>
  );
};

export default Schedule;
