"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
export function JoinScreen({ getMeetingAndToken, setMode }) {

   
    const [meetingId, setMeetingId] = useState(null);
  
    const onClick = async (mode) => {
      setMode(mode);
      await getMeetingAndToken(meetingId);
    };
    return (
      <div className="container">
        <button onClick={() => onClick("CONFERENCE")}>Create Meeting</button>
        <br />
        <br />
        {" or "}
        <br />
        <br />
        <input
          type="text"
          placeholder="Enter Meeting Id"
          onChange={(e) => {
            setMeetingId(e.target.value);
          }}
        />
        <br />
        <br />
        <button onClick={() => onClick("CONFERENCE")}>Join as Host</button>
        {" | "}
        <button onClick={() => onClick("VIEWER")}>Join as Viewer</button>
      </div>
    );
  }