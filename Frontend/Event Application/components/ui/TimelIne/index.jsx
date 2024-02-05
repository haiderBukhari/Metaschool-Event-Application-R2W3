import React, { useEffect, useState } from "react";
import Image from "next/image";
import sameplepic from "../../../public/sample-picture.jpg";
import { ethers } from "ethers";
import contractABI from "../../../artifacts/contractABI.json";

const TimeLine = () => {
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [fetchData, setFetchData] = useState(true);
  // contract information
  const contractAddress = "0xd1AD17276D587827eE3170263b84fe494a6FeB99";

  useEffect(() => {
    if (fetchData) {
      const updateEthers = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        const signer = await provider.getSigner();
        setSigner(signer);

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setContract(contract);
        await getAllEvents(contract);
      };

      const getAllEvents = async (currentContract) => {
        try {
          let data = await currentContract.getAllEvents();
          // Create a new object with the same properties as data[0]
          setAllEvents(data);
          setFetchData(false);
        } catch (err) {
          console.log(err);
        }
      };
      updateEthers();
    }
  }, [fetchData]);

  return (
    <div>
      <div className="main">
        <h3 className="head">Upcomming Events</h3>
        <div className="container">
          <ul>
            {allEvents.map((item, _idx) => (
              <li key={_idx} className="relative">
                <span className="date">{item.date}</span>
                <span className="circle"></span>
                <div key={_idx + 100} className="list-item-box my-4">
                  <span className="bg-blue-500 rouded-md px-3 py-1 text-white rounded-3xl">
                    {item.time}
                  </span>
                  <div className="flex my-2">
                    <span className="circle"></span>
                    <img
                      className="hidden sm:block w-[170px] mr-2"
                      src={item.eventImage}
                      alt=""
                    />
                    <div className="ml-2  mt-1 pb-10">
                      <h3 className="heading font-bold text-xl">
                        {item.title}
                      </h3>
                      {/* <div className="pb-7" dangerouslySetInnerHTML={{ __html: item.description }} /> */}
                      <a
                        href={`/events/view/${_idx}`}
                        className="py-2 px-4 text-center rounded-3xl duration-150 text-white text-bold text-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-5 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 hover:ring ring-transparent ring-offset-2 transition mr-2 absolute bottom-3 right-2"
                      >
                        Read More
                      </a>
                      {/* <a
                          href={`/events/${item.eventId}`}
                          className="absolute bottom-0 right-0 pt-5 mt-5"
                        >
                          Read More
                        </a> */}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
