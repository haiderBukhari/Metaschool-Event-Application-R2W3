import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import OrganizedEvents from "components/ui/OrganizedEvents";
import image from "../../public/sample-picture.jpg";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import contractABI from "../../artifacts/contractABI.json";
import dynamic from "next/dynamic";

const Dashboard = () => {
  const [address, setAddress] = useState(
    useSelector((state) => state.userCredentials)
  );
  const Navigate = useRouter();
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
          const data = await currentContract.getAllEvents();
          setAllEvents(data);
          console.log(data);
          setFetchData(false);
        } catch (err) {
          console.log(err);
        }
      };
      updateEthers();
    }
  }, [fetchData]);

  useEffect(() => {
    if (!address.address) {
      Navigate.push("/login");
    }
  }, []);
  return (
    <>
      <div className="max-w-2xl mx-auto space-y-3 sm:text-center mt-20 mb-5">
        <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
          Unleash Extraordinary Events
        </h2>
        <p>
          Empowering You to Craft Unforgettable Events, Every Step of the Way
        </p>
      </div>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "30px",
          maxWidth: "250px",
          textAlign: "center",
          padding: "8px",
          margin: "20px auto",
        }}
      >
        <span className="font-bold mr-2">Address: </span>{" "}
        {address?.address?.substring(0, 8)}......
        {address?.address?.substring(address?.address?.length - 4)}
      </div>
      <div className="max-w-2xl mx-auto space-y-3 sm:text-center mt-20 mb-5">
        <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
          Organized Events
        </h2>
        <hr style={{ width: "200px", margin: "10px auto", padding: "2px" }} />
      </div>
      <div className="max-w-[1000px] m-auto flex justify-center items-center flex-wrap">
        {allEvents
          .filter(
            (items) => items.eventOwner.toLowerCase() === address?.address
          )
          .map((filteredEvent, _idx) => (
            <OrganizedEvents
              image={filteredEvent.eventImage}
              title={filteredEvent.title}
              key={_idx}
            />
          ))}
      </div>{" "}
    </>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
