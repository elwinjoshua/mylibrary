import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";

function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 100}}>
        <Card varint={"outlined"} style={{display: 'flex', flexDirection: 'column', width: 250, height: 220, padding: 20, justifyContent: 'space-evenly'}}>
        <Typography textAlign={"center"}>Sign up to access!</Typography>
        <TextField onChange={(e) => {setEmail(e.target.value)}} fullWidth={true} label="Email" variant="outlined"/>
        <TextField onChange={(e) => {setPassword(e.target.value)}} fullWidth={true} label="Password" variant="outlined" type={"password"}/>
                <Button size={"large"} variant="contained"
                    onClick={async() => {
                        const response = await axios.post("http://localhost:3000/admin/signup", {
                            username: email,
                            password: password
                        })
                        let data = response.data;
                        localStorage.setItem("token", data.token);
                        window.location = "/"
                        alert("account created successfully")
                    }}

                > Signup</Button>
            </Card>
        </div>

    )
}
     

export default Signup;