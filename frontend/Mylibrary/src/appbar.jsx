import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

function Appbar() {
    const navigate = useNavigate()
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/admin/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setUserEmail(data.username)
        })
    }, []);

    if (userEmail) {
        return (
            <div style={{display: 'flex', height: 60, justifyContent: 'space-between', boxShadow: '10px 8px 8px #5a5a5a', backgroundColor: '#fff'}}>
                <Typography variant={"h4"} style={{fontFamily: 'sans-serif', fontWeight: 'bold', padding: 10}}>My Library</Typography>
                <div style={{display: 'flex', width: 300, justifyContent: 'space-evenly', padding: 10}}>
                    <Button variant={"outlined"} onClick={() => { navigate("/addbook")}}>Add Book</Button>
                    <Button variant={"outlined"} onClick={() => { navigate("/books")}}>Books</Button>
                    <Button variant={"contained"}onClick={() => {
                                localStorage.setItem("token", null);
                                window.location = "/";
                            }}
                        >Logout</Button>
                </div>
            </div>
        )
      
    } else {
        return (
            <div style={{display: 'flex', height: 60, justifyContent: 'space-between', boxShadow: '10px 8px 8px #5a5a5a', backgroundColor: '#fff'}}>
                <Typography variant={"h4"} style={{fontFamily: 'sans-serif', fontWeight: 'bold', padding: 10}}>My Library</Typography>
                <div style={{display: 'flex', width: 300, justifyContent: 'space-evenly', padding: 10}}>
                    <Button variant={"contained"} onClick={() => {navigate("/signup")}}>Signup</Button>
                    <Button variant={"contained"} onClick={() => {navigate("/login")}}>Login</Button>
                </div>
            </div>
        )
    }
}

export default Appbar;