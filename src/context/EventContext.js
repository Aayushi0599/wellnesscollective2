import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const EventContext = createContext();

export const useEvent = () => useContext(EventContext);
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const querySnapshot = await getDocs(collection(db, "events"));
        const formattedEvents = querySnapshot.docs.map((doc) => {
          const event = doc.data();
          // Convert start and end strings to Date objects
          const start = event.start.toDate();
          const end = event.end.toDate();
          // Format date and time strings for start and end
          const formatDate = (date) => date.toLocaleDateString();
          const formatTime = (time) =>
            time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

          return {
            id: doc.id,
            title: event.title,
            start: formatDate(start),
            startTime: formatTime(start),
            end: formatDate(end),
            endTime: formatTime(end),
            img: event.img,
            registeredUsers: event.registeredUsers,
            message: event.message,
          };
        });

        setEvents(formattedEvents); // Set the formatted events in the state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <div>
      <p className="flex justify-center items-center">Loading...</p>
    </div>
  ) : (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};
