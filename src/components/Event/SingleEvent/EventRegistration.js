import Link from "next/link";
import React from "react";

const EventRegistration = ({ event }) => {
  const totalRegister = event.registeredUsers.length;

  return (
    <div>
      <div className="w-full bg-gray-700 bg-opacity-20  px-8 py-5 rounded-2xl overflow-hidden ">
        <h2 className="tracking-wide text-lg ">Participants Details</h2>
        <p className="text-sm text-gray-400">Manage your all participants</p>
      </div>
      <div className="flex flex-col gap-4 px-8 py-8 ">
        <h2 className="tracking-wide">Registration & Attendance</h2>
        <div className="flex gap-10">
          <div className="flex flex-col items-center gap-3">
            <p>Registration</p>
            <p className=" bg-gradient-to-br from-primary via-primary to-secondry text-black shadow-xl w-24 h-24 flex items-center justify-center p-4 rounded-full">
              {totalRegister}/{event.participant}
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <p>Attend</p>
            <p className=" bg-gradient-to-br from-primary via-primary to-secondry text-black shadow-xl w-24 h-24 flex items-center justify-center p-4 rounded-full">
              0/30
            </p>
          </div>
        </div>
      </div>
      <div className="w-full mb-6 bg-gray-700 bg-opacity-20  px-8 py-5 rounded-2xl flex items-center justify-between ">
        <div className="w-full lg:w-1/4">
          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-transparent border border-gray-700 rounded-xl px-4 py-3"
          />
        </div>
        <div>
          <Link
            href="/event/dashboard/createevent"
            className="w-fit bg-gradient-to-br from-primary via-primary to-secondry hover:bg-gradient-to-br hover:from-secondry hover:via-primary hover:to-primary text-black px-8 py-3 rounded-3xl"
          >
            Download List
          </Link>
        </div>
      </div>
      <div className="w-full bg-gray-700 bg-opacity-20  px-8 py-8 rounded-2xl ">
        <table className="min-w-full ">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium  uppercase tracking-wider">
                S.No
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium  uppercase tracking-wider">
                Participants (30)
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium  uppercase tracking-wider">
                Email Address
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium  uppercase tracking-wider">
                Role Type
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium  uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className=" ">
            {event.registeredUsers.map((u) => (
              <tr key={u.id}>
                <td className="py-4 px-6 text-sm font-medium ">1</td>
                <td className="py-4 px-6 text-sm font-medium ">
                  Participant name
                </td>
                <td className="py-4 px-6 text-sm font-medium 0">
                  Name@gmail.com
                </td>
                <td className="py-4 px-6 text-sm font-medium ">Attendee</td>
                <td className="py-4 px-6 text-sm font-medium text-green-600">
                  Registered
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventRegistration;
