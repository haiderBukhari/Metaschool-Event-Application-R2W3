import React from 'react'
import Image from "next/image"
import sameplepic from "../../../public/sample-picture.jpg"

const TimeLine = () => {
    const events = [
        {
            date: "20 January 2024",
            Datedevents: [
                {
                    time: "18:00",
                    image: sameplepic,
                    title: "FrontEnd Developer BOOTCAMP",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit excepturi accusamus minus totam",
                    eventId: 10001,
                },
                {
                    time: "12:00",
                    image: sameplepic,
                    title: "DevOps Developer COURSE",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit excepturi accusamus minus totam",
                    eventId: 10002,
                },
                {
                    time: "14:00",
                    image: sameplepic,
                    title: "MERN STACK Developer CHEALLENGE",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit excepturi accusamus minus totam",
                    eventId: 10003,
                },
            ]
        },
        {
            date: "28 January 2021",
            Datedevents: [
                {
                    time: "19:00",
                    image: sameplepic,
                    title: "FrontEnd Developer",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit excepturi accusamus minus totam",
                    eventId: 10004,
                },
            ]
        },
        {
            date: "30 January 2024",
            Datedevents: [
                {
                    time: "20:00",
                    image: sameplepic,
                    title: "FrontEnd Developer",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit excepturi accusamus minus totam",
                    eventId: 10005,
                },
                {
                    time: "12:00",
                    image: sameplepic,
                    title: "Backend Developer",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit excepturi accusamus minus totam",
                    eventId: 10006,
                },
            ]
        }
    ]
    return (
        <div>
            <div className="main">
                <h3 className="head">Upcomming Events</h3>
                <div className="container">
                    <ul>
                        {
                            events.map((Items, _idx) => (
                                <li key={_idx}>
                                    <span className="date">{Items.date}</span>
                                    <span className="circle"></span>
                                    {
                                        Items.Datedevents.map((item, idx) => (
                                            <div key={idx + 100} className="list-item-box my-4">
                                                <span className="bg-blue-500 rouded-md px-3 py-1 text-white rounded-3xl">{item.time}</span>
                                                <div className="flex my-2">
                                                    <span className="circle"></span>
                                                    <Image className="hidden sm:block" src={item.image} alt='' />
                                                    <div className='ml-2 relative'>
                                                        <h3 className="heading font-bold text-xl">{item.title}</h3>
                                                        <p>{item.desc} </p>
                                                        <a href={`/events/${item.eventId}`} className='absolute bottom-0 right-0 pt-5 mt-5'>Read More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TimeLine