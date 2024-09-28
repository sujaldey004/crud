import React, { useState } from "react";
import axios from "axios";



export default function CreateUser() {
    const [data, setData] = useState(0)
    const [username, setUsername] = useState(0);
    const [password, setPassword] = useState(0);
    return <div className="flex justify-start">
        <div className="w-4/12 py-20 flex-column bg-zinc-300 items-center">
            <div className="flex my-4 bg-zinc-300 justify-center font-medium text-3xl font-san tracking-extra-wide">
                Create User
            </div>
            <div className="flex my-4 justify-center">
                <input className="border-slate-700 border-2 rounded-md" type="text" placeholder="Enter email or username" onChange={
                    (e) => {
                        setUsername(e.target.value)
                    }
                } />
            </div>
            <div className="flex my-2 justify-center">
                <input className="border-slate-700 border-2 rounded-md" type="password" placeholder="Enter your password" onChange={
                    (e) => {
                        setPassword(e.target.value)
                    }
                } />
            </div>
            <div className="flex my-2 justify-center">
                <button className="bg-red-500 rounded-md px-1.5" onClick={ async() => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        username,
                        password
                    });
                    console.log(response)
                    setData(response.data);
                }}>Create</button>
            </div>
        </div>
    </div>
}