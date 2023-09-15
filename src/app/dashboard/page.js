'use client'
import Sidebar from "@/components/Event/Sidebar";
import Topbar from "@/components/Event/Topbar";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import EventList from "@/components/Event/EventList";
import { db } from "@/lib/firebase";


const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  // const { events } = useEvent();
  useEffect(() => {
   
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      console.log(querySnapshot)
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
          registeredUsers:event.registeredUsers,
          message: event.message,
        };
      });

      setEvents(formattedEvents);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        eventStatusMatchesFilter(event)
      );
      setFilteredEvents(filtered);
    }
  }, [events, filter]);
  useEffect(() => {
    if (events) {
      const searchResults = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(searchResults);
    }
  }, [events, searchQuery]);

  const eventStatusMatchesFilter = (event) => {
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString();

    if (filter === "upcoming") {
      const startDate = new Date(`${event.start} ${event.startTime}`);
      return startDate > currentDate;
    } else if (filter === "running") {
      const startDate = new Date(`${event.start} ${event.startTime}`);
      const endDate = new Date(`${event.end} ${event.endTime}`);
      return (
        currentDate >= startDate &&
        currentDate <= endDate &&
        currentTime >= event.startTime
      );
    } else if (filter === "complete") {
      const endDate = new Date(`${event.end} ${event.endTime}`);
      return endDate < currentDate;
    }

    return false;
  };

  const handleFilter = (filterValue) => {
    setFilter(filterValue);
  };
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  

  return (
    <div className="  flex flex-col md:flex-row container text-gray-100 mx-auto py-5 gap-5">
      <div className="md:w-1/4 w-full">
        <Sidebar />
      </div>
      <div className="md:w-3/4 w-full">
        <Topbar handleFilter={handleFilter} handleSearch={handleSearch} searchQuery={searchQuery}/>
        <div className=" bg-gray-700 bg-opacity-20 rounded-xl p-5">
          <EventList events={filteredEvents} />
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;
