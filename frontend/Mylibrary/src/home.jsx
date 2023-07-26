import { Typography } from "@mui/material";
import Image from "./img/mylibrary.jpg"

function HomePage() {

    return (
        <div style={{ height: 600, margin: 50, color: '#24555d'}}>
            <Typography variant="h1">Welcome to My Library</Typography>
            <div style={{display: 'flex', height: 400, margin: 50, justifyContent: 'space-evenly'}}>
                <img src={Image} style={{minHeight: 400, marginRight: 10}}/>
                <Typography variant={"h4"}style={{marginTop: 50, maxWidth: 300, borderRadius: 20}}>A place to sell and purchase your Books</Typography>
            </div>
        </div>
    )
}

export default HomePage;