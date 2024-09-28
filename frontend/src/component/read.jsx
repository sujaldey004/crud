import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ReadUser(){
    const [user, setUser] = useState(0);
    useEffect(()=>{
        setInterval(async()=>{
            const response = await axios.get("http://localhost:3000/api/v1/users");
            console.log(response.data.allUsers[user]);
            setUser(user + 1);
        }, 2000)
        return <div>
        <h2>
            Username = {response.username}
        </h2>
        <h3>
            Password = {response.password}
        </h3>
    </div>
    })
}