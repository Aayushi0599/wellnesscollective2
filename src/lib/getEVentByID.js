// eventApi.js

import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEvent } from "@/context/EventContext";

// Define your API functions here

export async function fetchEventData(eventId) {
  const eventDocRef = doc(db, "events", eventId);
  const docSnapshot = await getDoc(eventDocRef);

  if (docSnapshot.exists()) {
    const eventData = docSnapshot.data();
    // Process and transform the data as needed
    return eventData;
  } else {
    throw new Error("Event not found.");
  }
}

export async function generateStaticParams() {
  const querySnapshot = await getDocs(collection(db, "events"));
  const formattedEvents = querySnapshot.docs.map((doc) => {
    const event = doc.data();
    return event.map((ele)=>{
      return ele.id
    })
  })

}
export async function startEvent(eventId) {
    const eventDocRef = doc(db, "events", eventId);
    await updateDoc(eventDocRef, {
      started: true,
    });
  }