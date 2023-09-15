import React, { useEffect, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { ParticipantView } from "./ParticipantView";
import { Controls } from "./Controls";
import { useRouter } from "next/navigation";

export function MeetingView(props) {
  const router = useRouter();

  const [participantss, setParticipants] = useState([]); // Initialize participantss state
  const [joined, setJoined] = useState(false);
  const [showPairs, setShowPairs] = useState(false);
  const [pairs, setPairs] = useState([]);
  const [pairIndex, setPairIndex] = useState(0);

  const { join, participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined(true);
      const participantsList = participants;
      setParticipants(participantsList);
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
      router.push("/dashboard");
    },
  });

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const formPairs = () => {
    const shuffledParticipants = shuffleArray(participants);
    const newPairs = [];

    while (shuffledParticipants.length >= 2) {
      const pair = shuffledParticipants.splice(0, 2);
      newPairs.push(pair);
    }

    setPairs(newPairs);
  };

  useEffect(() => {
    if (joined) {
      setTimeout(() => {
        setShowPairs(true);
        formPairs();
        setPairIndex(0);
      }, 60000);
    }
  }, [joined, participants]);


  useEffect(() => {
    if (joined) {
      // Show all participants initially
      setPairs([]);
    }
  }, [joined]);

  const handleJoinMeeting = () => {
    setJoined(true);
    join();
  };

  const changePair = () => {
    setPairIndex((prevIndex) => (prevIndex + 1) % pairs.length);
  };

  useEffect(() => {
    if (showPairs && pairs.length > 0) {
      const interval = setInterval(() => {
        changePair();
        formPairs(); // Re-shuffle pairs every 10 seconds
      }, 60000); // Change pair every 10 seconds

      return () => {
        clearInterval(interval);
      };
    }
  }, [showPairs, pairs]);


  useEffect(() => {
    if (pairs.length === 0 && showPairs) {
      // All participants have connected, end the meeting
      // You can add your logic here to end the meeting
      // For example, you can call a function to end the meeting.
      endMeeting();
    }
  }, [pairs, showPairs]);

  const endMeeting = () => {
    // Add your logic here to end the meeting, e.g., disconnect from the meeting.
    // You can use the MeetingProvider or other methods to end the meeting.
    // For simplicity, you can set the "joined" state to false to simulate leaving the meeting.
    setJoined(false);
  };

  // Calculate the number of columns and rows based on the number of participants
  useEffect(() => {
    // Call this function when participants change
    function updateGrid() {
      const numParticipants = participants.length;
      const container = document.getElementById("participant-container");

      if (numParticipants === 1) {
        container.style.gridTemplateColumns = "1fr";
        container.style.gridTemplateRows = "1fr";
      } else if (numParticipants === 2) {
        container.style.gridTemplateColumns = "1fr 1fr";
        container.style.gridTemplateRows = "1fr";
      } else if (numParticipants === 3) {
        container.style.gridTemplateColumns = "1fr 1fr";
        container.style.gridTemplateRows = "1fr 1fr";
      } else {
        container.style.gridTemplateColumns = "1fr 1fr 1fr";
        container.style.gridTemplateRows = "1fr 1fr 1fr";
      }
    }

    if (joined) {
      // Initial update when user joins
      updateGrid();
    }

    // Update the grid whenever participants change
    if (participants.length > 0) {
      window.addEventListener("resize", updateGrid);
    }

    return () => {
      window.removeEventListener("resize", updateGrid);
    };
  }, [joined, participants]);


  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-[80vh]">
      {joined ? (
        <div id="participant-container" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          <Controls />
          {showPairs
            ? pairs.map((pair, index) => (
                <div
                  key={index}
                  className="flex items-center mb-4 border p-4 rounded-lg"
                >
                  {pair.map((participant, pIndex) => (
                    <div
                      className="w-full"
                      key={participant.id}
                    >
                      <ParticipantView participant={participant} />
                    </div>
                  ))}
                </div>
              ))
            : [...participants.keys()].map((participant, index) => (
                <div
                  key={participant.id}
                  className="border p-4 rounded-lg"
                 
                >
                  <ParticipantView participant={participant} />
                </div>
              ))}
        </div>
      ) : (
        <button
          onClick={handleJoinMeeting}
          className="bg-secondry hover:bg-gradient-to-br hover:from-secondry hover:via-primary hover:to-primary mt-5 text-black font-bold py-2 px-6 mx-auto rounded-full flex items-center justify-center"
        >
          Join
        </button>
      )}
    </div>
  );
}
