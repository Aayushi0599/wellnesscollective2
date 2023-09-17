  // eventApi.js

  import { doc, getDoc, updateDoc, arrayUnion, getDocs } from "firebase/firestore";
  import { db } from "@/lib/firebase";

  // Define your API functions here

  export async function fetchEventData(eventId) {
    const eventDocRef = doc(db, "events", eventId);
    const docSnapshot = await getDoc(eventDocRef ,{ cache: 'no-store' });

    if (docSnapshot.exists()) {
      const eventData = docSnapshot.data();
      // Process and transform the data as needed
      return eventData;
    } else {
      throw new Error("Event not found.");
    }
  }


  export async function startEvent(eventId) {
      const eventDocRef = doc(db, "events", eventId);
      await updateDoc(eventDocRef, {
        started: true,
      });
    }