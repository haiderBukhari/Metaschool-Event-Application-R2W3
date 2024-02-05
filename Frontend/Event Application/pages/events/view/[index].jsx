import {useState} from "react"
import {useRouter} from "next/router"
import sameplepic from "../../../public/sample-picture.jpg";
import Image from 'next/image';
import AlertDialog from "components/ui/EmailDialog";
import axios from "axios"

const eventDetail = () => {
    const router = useRouter();
    const eventId = router.query.index;
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");

    const sendConfirmationEmail = () => {
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/send-email`, {
            email: email,
            name : "", 
            eventName: "", 
            date: "", 
            time: "", 
            meetingUrl: ""
        }).then(()=>{
            alert("Email sent successfully")
        }).catch((err) => {
            alert("Error in sending Email")
        })
    }
    return(
        <div>
            <div className="max-w-2xl mx-auto space-y-3 sm:text-center m-auto mb-5 mt-10">
                <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl text-center mx-3 underline underline-offset-8 mb-5"> MERN STACK BOOTCAMP </h2>
                <p className="text-center mx-3 mt-10">
                  Empowering You to Craft Unforgettable Events, Every Step of the Way
                </p>
            </div>
            <div className="flex justify-center">
                <div onClick={() => {setOpen(true)}} className="py-2 px-4 text-center rounded-3xl duration-150 text-white text-bold text-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-5 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 hover:ring ring-transparent ring-offset-2 transition flex justify-center w-[170px] cursor-pointer"> Join for 0.04 eth</div>
            </div>
            <div className="flex justify-center m-auto mt-7 flex-wrap">
                <div className="mr-20 mt-4 md:max-w-[50%] flex flex-col justify-center items-center">
                    <p className="font-serif text-xl"><span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">Date: </span> 12 January 2023</p>
                    <p className="font-serif text-xl mt-3"><span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mt-3">Time: </span> 20: 10</p>
                    <div style={{textAlign: "justify"}} className="leading-8">
                        <p className="mt-3"><span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mt-3">Event Description: </span> lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </p>
                        <p>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </p>
                        <ul>
                            <li>lorem lorem lorem </li>
                            <li>lorem lorem lorem </li>
                            <li>lorem lorem lorem lorem </li>
                            <li>lorem lorem lorem </li>
                        </ul>
                    </div>
                </div>
                <Image src={sameplepic} className="max-w-[400px] w-[100%] h-auto mt-4 rounded-lg" alt=''/>
            </div>
            <AlertDialog open={open} setOpen={setOpen} email={email} setEmail={setEmail}/>
        </div>
    )
}

export default eventDetail;