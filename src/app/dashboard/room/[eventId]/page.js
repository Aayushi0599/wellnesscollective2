"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "../../../API";
import ReactPlayer from "react-player";
import { JoinScreen } from "@/components/Room/JoinScreen";
import { MeetingView } from "@/components/Room/MeetngView";
import { Container } from "@/components/Room/Conatiner";
import { useRouter } from "next/navigation";

const Room = ({ params }) => {
  const eventId = params.room;
  const router = useRouter();

  const [meetingId, setMeetingId] = useState("");
  const [token ,setauthToken]=useState(authToken)
  const [mode, setMode] = useState("CONFERENCE");
  const [micOn, setMicOn] = useState(true);
  const [webcamOn, setWebcamOn] = useState(true);
  const [startDateTime] = useState(new Date()); // Replace with your desired start time
  const [meetingDurationInMinutes] = useState(1); // Replace with your desired meeting duration in minutes
  const [meetingEnded, setMeetingEnded] = useState(false);
  const [sessions ,setSession]=useState(null)

  const validateMeeting = async (meetingId) => {
    const options = {
      method: "POST",
      headers: {
        Authorization:token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "customRoomId": meetingId, 
        'autoCloseConfig': {
          'type': 'session-ends',
          'duration': 1
         }
      
    }),
    };
    const url = `https://api.videosdk.live/v2/rooms`;
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    setMeetingId(data.roomId);
    console.log(data.links.get_session)
    console.log(data.id)
  };


  useEffect(() => {
    validateMeeting(eventId);
  }, [eventId]);

  const onMeetingLeave = () => {
    setMeetingId(null);
    setWebcamOn(false);
    setMicOn(false);
    setauthToken(null)
    console.log("onnmeetingleave")
    router.push("/dashboard");

  };

  

  console.log(authToken, "authToken");
  console.log(meetingId, "meetingId");
 

  return( meetingId &&
    <div className="">
      <MeetingProvider
        config={{
          meetingId: meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: "C.V. Raman",
          mode: mode,
          // layout: {
          //   type: "GRID",
          //   priority: "SPEAKER",
          //   gridSize: 9,
          // },
        }}
        
        token={authToken}
      >
        <MeetingView
          meetingId={meetingId}
          onMeetingLeave={
            onMeetingLeave
          }
        />
      </MeetingProvider>
    </div>
  )
};

export default Room;
