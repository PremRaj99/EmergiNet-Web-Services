import { Button } from "flowbite-react";
import React from "react";

export default function AlertCard() {
  return (
    <div className="flex p-6 items-end m-2 justify-between rounded-lg bg-blue-100 border">
      <div className="flex gap-10 flex-1 font-semibold">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-16 h-16 bg-gray-500 object-cover rounded-full"
        />
        <div className="flex flex-1 justify-between items-center">
          <div className="">
            <p>UserName: <span className="text-gray-800 font-normal" >premraj</span></p>
            <p>Email: <span className="text-gray-800 font-normal">premraj299341@gmail.com</span> </p>
            <p>Phone: <span className="text-gray-800 font-normal">+91 6200103129</span></p>
            <p>Place of Incedent: <span className="text-gray-800 font-normal">Dhanbad</span></p>
          </div>
          <div className="">
            <p>longitude: <span className="text-gray-800 font-normal">73.58347</span></p>
            <p>latitude: <span className="text-gray-800 font-normal">22.4578</span></p>

            <p className="text-sky-400 cursor-pointer hover:underline">visit</p>
            <p>Time of Incednet: <span className="text-gray-800 font-normal">8:23AM</span> </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-end flex-col gap-4">
        <p>Respnd for help?</p>
        <Button gradientDuoTone="purpleToPink" outline className="w-32">
          Yes
        </Button>
      </div>
    </div>
  );
}
