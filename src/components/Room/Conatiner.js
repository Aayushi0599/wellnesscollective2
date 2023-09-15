'use client'
import React, { useEffect, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  Constants,
} from "@videosdk.live/react-sdk";
import { ParticipantView } from "./ParticipantView";

export function Container(props) {
  const [joined, setJoined] = useState(null);
  const { join } = useMeeting();

  // Callback for when the meeting is joined successfully
  const onMeetingJoined = () => {
    setJoined("JOINED");
  };

  // Callback for when the meeting is left
  const onMeetingLeft = () => {
    props.onMeetingLeave();
  };

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <h3>Meeting Id: {props.meetingId}</h3>
      {joined && joined === "JOINED" ? (
        <MeetingConsumer>
          {(meeting) => {
            if (meeting.localParticipant.mode === Constants.modes.CONFERENCE) {
              return (
                <div>
                  <ParticipantView
                    participant={meeting.localParticipant}
                  
                  />
                </div>
              );
            } 
          }}
        </MeetingConsumer>
      ) : joined && joined === "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join</button>
      )}
    </div>
  );
}
