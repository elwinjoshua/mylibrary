import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return <div style={{display: 'flex', justifyContent: 'center', marginTop: 100}}>
                <Card varint={"outlined"} style={{display: 'flex', flexDirection: 'column', width: 250, height: 220, padding: 20, justifyContent: 'space-evenly'}}>
                <Typography textAlign={"center"}>Welcome Back! Log in below</Typography>
                <TextField onChange={(e) => {setEmail(e.target.value)}} fullWidth={true} label="Email" variant="outlined"/>
                <TextField onChange={(e) => {setPassword(e.target.value)}} fullWidth={true} label="Password" variant="outlined" type={"password"}/>
                <Button variant="contained"
                        onClick={async () => {
                            const res = await axios.post("https://mylibrary-tznt.onrender.com/admin/login", {
                                username: email,
                                password: password
                            }, {
                                headers: {
                                    "Content-type": "application/json"
                                }
                            });
                            const data = res.data;
                            
                            localStorage.setItem("token", data.token);
                            window.location = "/"
                            alert("you're logged in")
                        }}
                    > Log in</Button>
                </Card>
        </div>
    
}

export default Login;