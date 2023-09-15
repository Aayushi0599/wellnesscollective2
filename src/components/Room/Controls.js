"use client";
import React, { useEffect } from "react";
import { MeetingProvider, useMeeting} from "@videosdk.live/react-sdk";
import { useRouter } from "next/navigation";

export function Controls() {
  const router = useRouter();
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  const handleLeaveMeeting = async() => {
    try {
      await leave();
      router.push("/dashboard");
    } catch (error) {
      console.error("Error leaving the meeting:", error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center md:flex-row justify-center md:items-end p-4">
      <button
        className="bg-red-700 text-white px-4 rounded mb-2 md:mb-0 md:mr-2"
        onClick={handleLeaveMeeting}  >
        Leave
      </button>
      <div className="mb-2 md:mb-0 md:mx-2">
        <button
          className="bg-gradient-to-br from-primary via-primary to-secondry hover:bg-gradient-to-br hover:from-secondry hover:via-primary hover:to-primary text-black  px-4 rounded"
          onClick={() => toggleMic()}
        >
          Toggle Mic
        </button>
      </div>
      <div>
        <button
          className="bg-gradient-to-br from-primary via-primary to-secondry hover:bg-gradient-to-br hover:from-secondry hover:via-primary hover:to-primary text-black  px-4 rounded"
          onClick={() => toggleWebcam()}
        >
          Toggle Webcam
        </button>
      </div>
    </div>
  );
}
