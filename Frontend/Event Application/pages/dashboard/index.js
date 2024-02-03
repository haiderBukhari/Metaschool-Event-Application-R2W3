import {useSelector} from "react-redux"
import {useState, useEffect} from "react"
import OrganizedEvents from "components/ui/OrganizedEvents";
import image from "../../public/sample-picture.jpg"
import { useRouter } from "next/router"

const Dashboard = () => {
    const [address, setAddress] = useState(useSelector(state=> state.userCredentials));
    const Navigate = useRouter();
    const eventDetails = [
        {
            name: "MERN STACK DEVELOPER BOOTCAMP",
            image: image
        },
        {
            name: "CLOUD Course",
            image: image
        },
        {
            name: "Full Stack bootcamp",
            image: image
        }
    ]
    useEffect(() => {
        if(!address.address){
            Navigate.push('/login')
        }
    }, [])
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
                <div style={{border: "1px solid #ccc", borderRadius: "30px", maxWidth: "250px", textAlign: "center", padding: "8px", margin: "20px auto"}}>
                    <span  className="font-bold mr-2">Address: </span> {address?.address?.substring(0, 8)}......{address?.address?.substring(address?.address?.length - 4)}
                </div>
                <div className="max-w-2xl mx-auto space-y-3 sm:text-center mt-20 mb-5">
                    <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                    Organized Events
                    </h2>
                    <hr style={{width: "200px", margin: "10px auto", padding: "2px"}}/>
                </div>
                <div className="max-w-[1000px] m-auto flex justify-center items-center flex-wrap">
                    {
                    eventDetails.map((Items, _idx) => (
                        <OrganizedEvents image={Items.image} title={Items.name} key={_idx}/>
                    ))  
                    }

                </div>
        </>
    )
}

export default Dashboard;