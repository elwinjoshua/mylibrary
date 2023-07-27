import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

function Books() {
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        fetch("https://mylibrary-tznt.onrender.com/admin/books", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setBooks(data.books)
            console.log(data.books)
        })
    }, []);

    return (
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", margin: 10}}>
            {books.map(book => {
                return <Book book={book} />}
            )}
        </div>
    )
}

export function Book({book}) {
    const navigate = useNavigate();

    return (
            <Card style={{width: 200, minHeight: 200, padding: 20, margin: 10}}>
                <Typography textAlign={"center"} variant="h5">{book.title}</Typography>
                <Typography textAlign={"center"} variant="subtitle1">{book.description}</Typography>
                <img src={book.imageLink} style={{width: 200}} ></img>
                <Typography textAlign={"center"} variant="subtitle1">Rs {book.price}/-</Typography>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button variant="contained" size="large" onClick={() => {navigate("/book/" + book._id);}}>Edit</Button>
                </div>
            </Card>
    )

}



export default Books;