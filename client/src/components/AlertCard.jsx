import { Button } from "flowbite-react";
import React from "react";

export default function AlertCard({ alert }) {
  console.log(alert)
  return (
    <div className="flex p-6 items-end m-2 justify-between rounded-lg bg-blue-100 border">
      <div className="flex gap-10 flex-1 font-semibold">
        <img
          src={alert.userData.profilePicture}
          alt=""
          className="w-16 h-16 bg-gray-500 object-cover rounded-full"
        />
        <div className="flex flex-1 justify-between items-center">
          <div className="">
            <p>UserName: <span className="text-gray-800 font-normal" >{alert.userData.username}</span></p>
            <p>Email: <span className="text-gray-800 font-normal">{alert.userData.email}</span> </p>
            <p>Phone: <span className="text-gray-800 font-normal">+91 6200103129</span></p>
            <p>Place of Incedent: <span className="text-gray-800 font-normal">haridwar</span></p>
          </div>
          <div className="">
            <p>longitude: <span className="text-gray-800 font-normal">{alert.data.longitude}</span></p>
            <p>latitude: <span className="text-gray-800 font-normal">{alert.data.latitude}</span></p>

            <p className="text-sky-400 cursor-pointer hover:underline" onClick={() => {window.open(`https://maps.google.com/?q=${alert.data.latitude},${alert.data.longitude}`)}} >visit</p>
            <p>Time of Incident: <span className="text-gray-800 font-normal">8:23AM</span> </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-end flex-col gap-4">
        <p>Respnd for help?</p>
        <Button gradientDuoTone="purpleToPink" outline className="w-32" onClick={() => {}} >
          Yes
        </Button>
      </div>
    </div>
  );
}
