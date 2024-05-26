import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import AlertCard from "./AlertCard";

export default function DashAlert() {
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [online, setOnline] = useState(false);
  const [alert, setAlert] = useState([]);
  const [ws, setWs] = useState(null);

  // const connectWs = async () => {
  //   const ws = new WebSocket(`ws://localhost:3000?userId=${currentUser.id}`);
  //   ws.onopen = () => {
  //     console.log("Connected to the server");
  //     setOnline(true);
  //   };

  //   ws.onmessage = (event) => {
  //     const message = JSON.parse(event.data);
  //     console.log("Message from server:", message);
  //     setAlert({ ...alert, message });
  //     onmessage(message);
  //   };

  //   ws.onclose = () => {
  //     console.log("Disconnected from the server");
  //   };

  //   ws.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   return ws;
  // };

  const connectWs = async () => {
    const ws = new WebSocket(`ws://localhost:3000?userId=${currentUser._id}`);

    ws.onopen = () => {
      console.log("Connected to the server");
      setOnline(true);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // console.log("Message from server:", message);
      setAlert((prev) => [message, ...prev]);
    };

    ws.onclose = () => {
      console.log("Disconnected from the server");
      setOnline(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWs(ws);
  };
  useEffect(() => {
    connectWs();

    // Cleanup function to close WebSocket when component unmounts
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [currentUser, onmessage]);

  const disconnectWs = () => {
    if (ws) {
      console.log("Closing WebSocket connection");
      ws.close();
      setWs(null);
      setOnline(false);
      setAlert([]);
    }
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
          <p className="text-gray-700">@{currentUser.username}</p>
        </div>
        {/* <Button color="gray" onClick={() => setOnline(!online)}> */}

        <Button color="gray" onClick={online ? disconnectWs : connectWs}>
          {online ? "Connected" : "Disconnected"}
        </Button>
      </div>
      {(currentUser.isAdmin || currentUser.isServiceProvider) && online ? (
        <>
          <div className=" p-4 border-b-2 my-2 ">Alert</div>
          {alert &&
            alert.map((alert) => {

              return <AlertCard key={alert.userId} alert={alert.data} />;
            })}
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
