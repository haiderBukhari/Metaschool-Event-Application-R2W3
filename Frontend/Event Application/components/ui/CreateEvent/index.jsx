import React, { useState, useEffect } from "react";
import Input from "../Input";
import eventsbackground from "../../../public/eventsbackground.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Tiptap from "./Tiptap";
import { X, MoveRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import contractABI from "../../../artifacts/contractABI.json";

const CreateEvent = () => {
  const [address, setAddress] = useState(
    useSelector((state) => state.userCredentials)
  );
  const [eventImage, setEventImage] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [eventCost, setEventCost] = useState(null);
  const [meetUrl, setMeetUrl] = useState(null);
  const [ticketLimit, setTicketLimit] = useState(null);
  const Navigate = useRouter();

  useEffect(() => {
    if (!address.address) {
      Navigate.push("/login");
    }
  }, []);

  // contract information
  const contractAddress = "0x737d8e139852d04e408F1DC4e415AFc335011273";
  const contract = new ethers.Contract(contractAddress, contractABI, address);

  const submitEvent = async () => {
    try {
      const data = {
        eventImage,
        title,
        description,
        date,
        time,
        eventCost,
        meetUrl,
        ticketLimit,
      };
      console.log(data);

      // Ensure the wallet is connected
      // if (!address || !address.isConnected()) {
      //   console.error("Wallet not connected");
      //   return;
      // }

      // const tx = await contract.createEvent(
      //   data.eventImage,
      //   data.title,
      //   data.description,
      //   data.date,
      //   data.time,
      //   data.eventCost,
      //   data.meetUrl,
      //   data.ticketLimit
      // );
      // await tx.wait();
    } catch (err) {
      console.error(err);
    }
  };

  const ImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setEventImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="max-w-screen min-h-screen py-10 overflow-hidden"
      style={{ backgroundColor: "#f4f5f6" }}
    >
      <div className="max-w-2xl mx-auto space-y-3 sm:text-center mb-5">
        <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
          Unleash Extraordinary Events
        </h2>
        <p>
          Empowering You to Craft Unforgettable Events, Every Step of the Way
        </p>
      </div>

      <div className="rounded-lg shadow-md min-h-[600px] max-w-[800px] m-auto p-5 flex flex-row flex-wrap justify-between bg-white">
        <div className="max-w-[400px] w-[100%] mr-3 mb-5">
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "30px",
              maxWidth: "250px",
              textAlign: "center",
              padding: "8px",
              margin: "20px 0",
            }}
          >
            <span className="font-bold mr-2">Address: </span>{" "}
            {address?.address?.substring(0, 8)}......
            {address?.address?.substring(address?.address?.length - 4)}
          </div>
          <Input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="font-bold text-xl text-gray-500"
            style={{ border: "1px solid #ccc" }}
            placeholder="Event Name"
            type="text"
          />
          <div className="flex justify-center items-center mt-7">
            <label className="mr-2 "> Event Date: </label>
            <input
              onChange={(e) => {
                setDate(e.target.value);
              }}
              style={{ border: "1px solid #ccc" }}
              className="w-[100%] p-2 flex-1"
              type="date"
              placeholder="Pick Event Date"
            />
          </div>
          <div className="flex justify-center items-center mt-7">
            <label className="mr-2 "> Event Time: </label>
            <input
              onChange={(e) => {
                setTime(e.target.value);
              }}
              style={{ border: "1px solid #ccc" }}
              className="w-[100%] p-2 flex-1"
              type="time"
              placeholder="Pick Event Time"
            />
          </div>
          <Tiptap description={description} setDescription={setDescription} />
        </div>
        <div className="max-w-[300px] h-[100%] relative flex justify-center">
          <div className="">
            {!eventImage ? (
              <>
                <Image
                  className="rounded-lg"
                  src={eventsbackground}
                  alt="events-background"
                  height={100} // Set the height property for the default image
                  width={300} // Set the width property for the default image
                />
                <div className="grid w-full max-w-sm items-center gap-1.5 pt-2">
                  <label
                    className="font-bold font-serif text-xl"
                    htmlFor="picture"
                  >
                    Upload Event Thumbnail
                  </label>
                  <Input
                    onChange={ImageUpload}
                    id="picture"
                    type="file"
                    accept="image/*"
                  />
                </div>
              </>
            ) : (
              <div className="relative">
                <Image
                  width={400}
                  height={500} // Set the height property for the uploaded image
                  className="rounded-lg"
                  src={eventImage}
                  alt="events-background"
                />
                <X
                  onClick={() => {
                    setEventImage(null);
                  }}
                  style={{
                    backgroundColor: "rgba(100, 0, 0,0.5)",
                    color: "#ffffff",
                    borderRadius: "50%",
                    padding: "4px",
                    top: "-14px",
                    right: "-14px",
                    cursor: "pointer",
                  }}
                  className="absolute"
                />
              </div>
            )}
            <div className="flex justify-center items-center mt-5">
              <label className="mr-2 "> Ticket Fee (eth): </label>
              <input
                onChange={(e) => {
                  setEventCost(e.target.value);
                }}
                style={{ border: "1px solid #ccc" }}
                className="w-[100%] p-2 flex-1"
                type="number"
                placeholder="cost"
              />
            </div>
            <div className="flex justify-center items-center mt-5">
              <label className="mr-2 "> Meeting Link: </label>
              <input
                onChange={(e) => {
                  setMeetUrl(e.target.value);
                }}
                style={{ border: "1px solid #ccc" }}
                className="w-[100%] p-2 flex-1"
                type="text"
                placeholder="meeting url"
              />
            </div>
            <Button
              disabled={
                !eventImage ||
                !title ||
                !description ||
                !date ||
                !title ||
                !eventCost
              }
              onClick={submitEvent}
              style={{
                backgroundColor: `${
                  !eventImage ||
                  !title ||
                  !description ||
                  !date ||
                  !title ||
                  !eventCost
                    ? "rgba(51, 53, 55, 0.6)"
                    : "rgb(51, 53, 55)"
                }`,
                width: "100%",
                borderRadius: "10px",
                color: "#ffffff",
                padding: "10px 0",
                margin: "20px 0",
                bottom: "0",
              }}
              className=""
            >
              Create Event <MoveRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
