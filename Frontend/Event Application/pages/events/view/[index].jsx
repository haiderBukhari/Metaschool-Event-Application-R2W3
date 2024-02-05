import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import sameplepic from "../../../public/sample-picture.jpg";
import Image from "next/image";
import AlertDialog from "components/ui/EmailDialog";
import contractABI from "../../../artifacts/contractABI.json";
import { ethers } from "ethers";

const eventDetail = () => {
  const router = useRouter();
  const [eventId, setEventID] = useState(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [fetchData, setFetchData] = useState(true);
  const [event, setEvent] = useState({});

  // contract information
  const contractAddress = "0xd1AD17276D587827eE3170263b84fe494a6FeB99";

  useEffect(() => {
    if (router.isReady) {
      const urlPath = router.query.index;
      setEventID(urlPath);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (fetchData && eventId !== null) {
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
        await getEvent(contract);
      };

      const getEvent = async (currentContract) => {
        try {
          const eventId = router.query.index;
          let data = await currentContract.allEvents(eventId);
          // Create a new object with the same properties as data[0]
          setEvent(data);
          setFetchData(false);
        } catch (err) {
          console.log(err);
        }
      };
      updateEthers();
    }
  }, [fetchData, eventId]);
  return (
    <div>
      <div className="max-w-2xl mx-auto space-y-3 sm:text-center m-auto mb-5 mt-10">
        <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl text-center mx-3 underline underline-offset-8 mb-5">
          {event.title}
        </h2>
        <p className="text-center mx-3 mt-10">{event.description}</p>
      </div>
      <div className="flex justify-center">
        <div
          onClick={() => {
            setOpen(true);
          }}
          className="py-2 px-4 text-center rounded-3xl duration-150 text-white text-bold text-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-5 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 hover:ring ring-transparent ring-offset-2 transition flex justify-center w-[170px] cursor-pointer"
        >
          {" "}
          Join for {Number(event.eventCost)} eth
        </div>
      </div>
      <div className="flex justify-center m-auto mt-7 flex-wrap">
        <div className="mr-20 mt-4 md:max-w-[50%] flex flex-col justify-center items-center">
          <p className="font-serif text-xl">
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              Date:{" "}
            </span>{" "}
            {event.date}
          </p>
          <p className="font-serif text-xl mt-3">
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mt-3">
              Time:{" "}
            </span>{" "}
            {event.time}
          </p>
          <div style={{ textAlign: "justify" }} className="leading-8">
            <p className="mt-3">
              <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mt-3">
                Event Description:{" "}
              </span>{" "}
              {event.description}
            </p>
          </div>
        </div>
        <Image
          // src={event.eventImage}
          width={400} // Adjust the width as needed
          height={300}
          className="max-w-[400px] w-[100%] h-auto mt-4 rounded-lg"
          alt=""
        />
      </div>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        email={email}
        setEmail={setEmail}
      />
    </div>
  );
};

export default eventDetail;
