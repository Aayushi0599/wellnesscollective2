"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

export function ParticipantView(props) {
  console.log(props)
  const micRef = useRef(null);
  const webcamRef = useRef(null);

  const { webcamStream, micStream, webcamOn, micOn, isLocal } =
    useParticipant(props.participantId);
  console.log(webcamOn);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  // const mediaStream = new MediaStream();
  // mediaStream.addTrack(webcamStream.track);

  // webcamRef.current.srcObject = mediaStream;
  // webcamRef.current
  //   .play()
  //   .catch((error) => console.error("videoElem.current.play() failed", error));

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);
 
  // const webcamMediaStream = useMemo(() => {
  //  if (webcamOn && webcamStream) {
  //     const mediaStream = new MediaStream();
  //     mediaStream.addTrack(webcamStream.track);
  //     return mediaStream;
  //   }
  // }, [webcamStream, webcamOn]);

  return (
    <div  style={{
      height: "300px",
      background: "#C0C2C9",
      objectFit: "contain",

    }}>
      <p>
        Participant: {props.participant} 
      </p>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />

      <ReactPlayer
        //
        playsinline // very very imp prop
        playIcon={<></>}
        //
        pip={false}
        light={false}
        controls={false}
        muted={true}
        playing={true}
        //
        url={videoStream} 
        //
        height={"150px"}
        width={"400px"}
        onError={(err) => {
          console.log(err, "participant video error");
        }}
      />
    </div>
  );
}
