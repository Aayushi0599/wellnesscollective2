import React from "react";

const CreateEventForm = ({ onSubmit}) => {

  return (
    <div className="py-5 ">
    <form onSubmit={onSubmit} className="space-y-5 tracking-wider text-sm">
      <div className="flex flex-col space-y-3">
        <label htmlFor="event_name" className="ml-1 ">
          Event Name
        </label>
        <input
          type="text"
          name="event_title"
          id="event_title"
          placeholder="Enter Event Name"
          className="bg-transparent border border-gray-700 rounded-lg py-3 px-4 "
        />
      </div>
      <div className="flex gap-4">
        <div className="w-1/2 flex flex-col space-y-3">
          <label htmlFor="start_date" className="ml-1">
            Start Date
          </label>
          <input
            type="date"
            name="start_date"
            id="start_date"
            placeholder="Enter Event Start Date"
            className="bg-transparent border border-gray-700 rounded-lg py-3 px-4"
          />
        </div>
        <div className="w-1/2 flex flex-col space-y-3">
          <label htmlFor="start_time" className="ml-1">
            Start Time
          </label>
          <input
              type="time"
              name="start_time"
              id="start_time"
              placeholder="Enter Event Start Time"
              className="bg-transparent border border-gray-700 rounded-lg py-3 px-4"
            />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2 flex flex-col space-y-3">
          <label htmlFor="end_time" className="ml-1 ">
            Welcome Session
          </label>
          <select
            name="welcomesession"
            id="welcomesession"
            className="bg-transparent border border-gray-700 rounded-lg py-3 px-4"
          >
            <option className="text-black" value="yes">
              Yes
            </option>
            <option className="text-black" value="no">
              No
            </option>
          </select>
        </div>
        <div className="w-1/2 flex flex-col space-y-3">
          <label htmlFor="end_time" className="ml-1">
            Welcome Session Time Duration
          </label>
          <select
            name="welcometime"
            id="welcometime"
            className="bg-transparent border border-gray-700 rounded-lg py-3 px-4"
          >
            <option className="text-black" value="10">
              10 min
            </option>
            <option className="text-black" value="15">
              15 min
            </option>
            <option className="text-black" value="20">
              20 min
            </option>
            <option className="text-black" value="30">
              30 min
            </option>
            <option className="text-black" value="45">
              45 min
            </option>
          </select>
        </div>
      </div>
      <div className="w-1/2 flex flex-col space-y-3">
          <label htmlFor="end_time" className="ml-1">
            Group Time Duration
          </label>
          <select
            name="groupTime"
            id="GroupTime"
            className="bg-transparent border border-gray-700 rounded-lg py-3 px-4"
          >
            <option className="text-black" value="10">
              10 min
            </option>
            <option className="text-black" value="15">
              15 min
            </option>
            <option className="text-black" value="20">
              20 min
            </option>
            <option className="text-black" value="30">
              30 min
            </option>
            <option className="text-black" value="45">
              45 min
            </option>
          </select>
        </div>
      <div className="flex gap-4">
      <div className="flex w-1/2 flex-col space-y-3">
        <label htmlFor="number_participents" className="ml-1 ">
         Total Number of Participents
        </label>
        <input
          type="number"
          name="number_participents"
          id="number_participents"
          className="bg-transparent border border-gray-700 rounded-lg py-3 px-4 "
        />
      </div>
      <div className="flex w-1/2 flex-col space-y-3">
        <label htmlFor="img" className="ml-1">
          Image
        </label>
        <input
          type="file"
          name="img"
          id="img"
          accept="image/*"
          className="bg-transparent border border-gray-700 rounded-lg py-3 px-4"
        />
      </div></div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="message" className="ml-1">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          placeholder="Enter about the event"
          className="bg-transparent border border-gray-700 rounded-lg py-3 px-4"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-gradient-to-br from-primary via-primary to-secondry hover:bg-gradient-to-br hover:from-secondry hover:via-primary hover:to-primary text-black w-full py-3 rounded-2xl"
        >
          Create Event
        </button>
      </div>
    </form>
  </div>

  );
};

export default CreateEventForm;
