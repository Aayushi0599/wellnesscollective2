"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { ParticipantView } from "./ParticipantView";
import { Controls } from "./Controls";



export function SpeakerView() {
    //Get the participants and hlsState from useMeeting
    const { participants, hlsState } = useMeeting();
  
    //Filtering the host/speakers from all the participants
    const speakers = useMemo(() => {
      const speakerParticipants = [...participants.values()].filter(
        (participant) => {
          return participant.mode == Constants.modes.CONFERENCE;
        }
      );
      return speakerParticipants;
    }, [participants]);
    return (
      <div>
        <p>Current HLS State: {hlsState}</p>
        {/* Controls for the meeting */}
        <Controls />
  
        {/* Rendring all the HOST participants */}
        {speakers.map((participant) => (
          <ParticipantView participantId={participant.id} key={participant.id} />
        ))}
      </div>
    );
  }