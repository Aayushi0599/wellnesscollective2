'use client'
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { MdKeyboardBackspace, MdShare } from "react-icons/md";
import { useState, useEffect, useCallback } from "react";
import Summery from "@/components/Event/SingleEvent/Summery";
import Schedule from "@/components/Event/SingleEvent/Schedule";
import Booth from "@/components/Event/SingleEvent/Booth";
import EventRegistration from "@/components/Event/SingleEvent/EventRegistration";
import Setting from "@/components/Event/SingleEvent/Setting";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const EventDetail = ({params}) => {
  const router = useRouter();
  const { user } = useAuth();
  const  eventId  = params.eventId;
  const [event, setEvent] = useState(null);
  const [activeLink, setActiveLink] = useState("summary");
  const [showComponent, setShowComponent] = useState({
    summary: true,
    schedule: false,
    registration: false,
    booths: false,
    settings: false,
  });
  const [eventStarted, setEventStarted] = useState(true);
  const [eventClose, setEventClose] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleStartEvent = async () => {
    const eventDocRef = doc(db, "events", eventId);
    await updateDoc(eventDocRef, {
      started: true,
    });
    setEventStarted(true);
  };

  useEffect(() => {
    const fetchEventData = async () => {
      const eventDocRef = doc(db, "events", eventId);
      const docSnapshot = await getDoc(eventDocRef);

      if (docSnapshot.exists()) {
        const eventData = docSnapshot.data();
        const start = eventData.start.toDate();
        const end = eventData.end.toDate();
        const currentDate = new Date();


        if (currentDate >= start ) {
          handleStartEvent();
        } else {
          setEventStarted(false);
        }

        const startDate = start.toLocaleDateString();
        const startTime = start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const endDate = end.toLocaleDateString();
        const endTime = end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const updatedEvent = {
          ...eventData,
          start: startDate,
          startTime,
          end: endDate,
          endTime,
        };

        setEvent(updatedEvent);
        const eventRef = doc(db, "events", eventId);
        if (end < currentDate) {
          setEventClose(true);
        } else {
          setEventClose(false);
        }
        try {
          const eventDoc = await getDoc(eventRef);
          if (eventDoc.exists()) {
            const registeredUsers = eventDoc.data().registeredUsers || [];

            if (registeredUsers.includes(user.uid)) {
              setRegistered(true);
            }
          } else {
            console.log("Event not found.");
          }
        } catch (error) {
          console.error("Error checking registration status: ", error);
        }
      }
    };

    fetchEventData();
  }, [eventId, setRegistered, setEvent, setEventStarted, handleStartEvent]);

  const handleMenuClick = (link) => {
    setActiveLink(link);
    setShowComponent((prevState) => ({
      summary: link === "summary",
      schedule: link === "schedule",
      registration: link === "registration",
      booths: link === "booths",
      settings: link === "settings",
    }));
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: "Check out this event!",
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    }
  };

  const handleEnterEvent = useCallback(() => {
    router.push(`/dashboard/room/${eventId}`);
  }, [router, eventId]);

  if (!event) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        Loading...
      </div>
    );
  }
  const { summary, schedule, registration, booths, settings } = showComponent;

  const registerUserForEvent = async () => {
    // const eventId = eid; // Replace with the actual event ID
    const eventRef = doc(db, "events", eventId);

    try {
      // Retrieve the event document
      const eventDoc = await getDoc(eventRef);

      // Check if the event exists
      if (eventDoc.exists()) {
        // Get the current registered users array from the event document
        const registeredUsers = eventDoc.data().registeredUsers || [];

        // Check if the user is already registered
        if (registeredUsers.includes(user.uid)) {
          console.log("User is already registered for this event.");
          return;
        }

        // Add the user ID to the registered users array
        const updatedUsers = arrayUnion(user.uid);

        // Update the event document with the updated registered users array
        await updateDoc(eventRef, { registeredUsers: updatedUsers });
        setRegistered(true);
        console.log("User registered successfully for the event.");
      } else {
        console.log("Event not found.");
      }
    } catch (error) {
      console.error("Error registering user for event: ", error);
    }
  };

  return (
    <div className="container mx-auto py-5">
      <div className="bg-gray-700 bg-opacity-20 py-4 rounded-3xl">
        <div className="flex items-center justify-between px-8">
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 text-sm sm:text-base"
            >
              <MdKeyboardBackspace size={20} /> Back
            </button>
          </div>
          <div className="flex items-center gap-4 ">
         
            {eventStarted ? (
              !eventClose ? (
                <div className="flex relative">
                  <div className="bg-red-600 absolute -top-3 right-0 animate-blink w-4 h-4 rounded-full"></div>
                  <button onClick={handleEnterEvent}>
                    <span className="bg-gradient-to-br from-primary via-primary to-secondry hover:bg-gradient-to-br hover:from-secondry hover:via-primary hover:to-primary font-semibold text-gray-900 text-sm tracking-wider w-full py-3 px-5 rounded-3xl">
                      Enter Event
                    </span>
                  </button>
                </div>
              ) : (
                <div className="bg-secondry text-black px-4 py-2 rounded-3xl bg-opacity-50">
                  <p className="cursor-pointer">Close Event</p>
                </div>
              )
            ) : (
              <p className="text-secondry text-sm sm:text-base">Event Starting Soon</p>
            )}
            <button
              onClick={handleShareClick}
              className="flex items-center text-sm border border-white px-6 py-2 rounded-3xl gap-1 tracking-wider"
            >
              <MdShare /> Share
            </button>
          </div>
        </div>

        <div className="mt-3 text-sm bg-black py-3 pl-10 pr-10 sm:pr-0 tracking-wide">
          {user && user.role === "host" ? (
            <ul className="flex items-center gap-10">
              <li
                className={
                  activeLink === "summary"
                    ? "active px-2 py-2 border-b-2 border-secondry rounded-lg"
                    : "px-2 py-2 border-b-2 border-transparent cursor-pointer"
                }
                onClick={() => handleMenuClick("summary")}
              >
                Summery
              </li>
              <li
                className={
                  activeLink === "schedule"
                    ? "active px-2 py-2 border-b-2 border-secondry rounded-lg"
                    : "px-2 py-2 border-b-2 border-transparent cursor-pointer"
                }
                onClick={() => handleMenuClick("schedule")}
              >
                Schedule
              </li>
              <li
                className={
                  activeLink === "registration"
                    ? "active px-2 py-2 border-b-2 border-secondry rounded-lg"
                    : "px-2 py-2 border-b-2 border-transparent cursor-pointer"
                }
                onClick={() => handleMenuClick("registration")}
              >
                Registration
              </li>
              <li
                className={
                  activeLink === "booths"
                    ? "active px-2 py-2 border-b-2 border-secondry rounded-lg"
                    : "px-2 py-2 border-b-2 border-transparent cursor-pointer"
                }
                onClick={() => handleMenuClick("booths")}
              >
                Booths
              </li>
              <li
                className={
                  activeLink === "settings"
                    ? "active px-2 py-2 border-b-2 border-secondry rounded-lg"
                    : "px-2 py-2 border-b-2 border-transparent cursor-pointer"
                }
                onClick={() => handleMenuClick("settings")}
              >
                Settings
              </li>
            </ul>
          ) : (
            <div className="flex  justify-between items-center">
              <ul className="flex ">
                <li
                  className={
                    activeLink === "summary"
                      ? "active px-2 py-2 border-b-2 border-secondry rounded-lg"
                      : "px-2 py-2 border-b-2 border-transparent cursor-pointer"
                  }
                  onClick={() => handleMenuClick("summary")}
                >
                  Summery
                </li>
              </ul>
              {!registered ? (
                <div className="flex gap-5 items-center">
                  <p className="">You want to Join This event</p>
                  <button
                    onClick={registerUserForEvent}
                    className="bg-secondry px-6 py-3 rounded-3xl text-black font-semibold tracking-wider "
                  >
                    Click To Register{" "}
                  </button>
                </div>
              ) : (
                <p>✔ Registered</p>
              )}
            </div>
          )}
        </div>
      </div>

      {user && user.role === "host" ? (
        <div className="py-8">
          {summary && (
            <Summery event={event} handleMenuClick={handleMenuClick} />
          )}
          {schedule && <Schedule  event={event}/>}
          {registration && <EventRegistration event={event}/>}
          {booths && <Booth />}
          {settings && <Setting />}
        </div>
      ) : (
        <div className="py-8">
          {summary && (
            <Summery event={event} handleMenuClick={handleMenuClick} />
          )}
        </div>
      )}
    </div>
  );
};
export async function getStaticPaths() {
  const paths = [];

  // Fetch the event IDs from your database or API and add them to the paths array
  const eventsQuery = query(collection(db, "events"));
  const eventsSnapshot = await getDocs(eventsQuery);

  eventsSnapshot.forEach((doc) => {
    paths.push({ params: { eventId: doc.id } });
  });

  return {
    paths,
    fallback: false, // or true if you want to enable fallback rendering
  };
}

export default EventDetail;
