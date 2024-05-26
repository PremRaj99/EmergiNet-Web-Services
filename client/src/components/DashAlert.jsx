import { Button, Modal, Table } from "flowbite-react";
import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import AlertCard from "./AlertCard";

export default function DashAlert() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [online, setOnline] = useState(false);

  const connectWs = async () => {
    const ws = new WebSocket(`ws://localhost:3000?userId=${currentUser.id}`);
    ws.onopen = () => {
      console.log("Connected to the server");
      setOnline(true);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Message from server:", message);
      onMessage(message);
    };

    ws.onclose = () => {
      console.log("Disconnected from the server");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return ws;
  };

  const handleDeleteUser = async () => {};
  const handleShowMore = async () => {};
  return (
    <div className="table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div className="w-full h-10 my-2 flex gap-4 justify-end items-center">
        <div className="flex items-center gap-2 p-2 rounded-md">
          <div
            className={`w-4 h-4 rounded-full ${
              online ? "bg-green-500" : "bg-red-600"
            }`}
          ></div>
          <p className="text-gray-700">@PremRaj</p>
        </div>
        {/* <Button color="gray" onClick={() => setOnline(!online)}> */}
        {!online ? (<Button color="gray" onClick={connectWs}>
          {online ? "Connected" : "Disconnected"}
        </Button>): (
          <Button color="gray" onClick={() => setOnline(false)}>
          {online ? "Connected" : "Disconnected"}
        </Button>
        )}
      </div>
      {(currentUser.isAdmin || currentUser.isServiceProvider) && online ? (
        <>
          <div className=" p-4 border-b-2 my-2 ">Alert</div>

          <AlertCard />
          <AlertCard />
          <AlertCard />
        </>
      ) : (
        <p className="text-center">You have no alert yet or not connected!</p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400 font-semibold">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
