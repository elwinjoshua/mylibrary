import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";

function Book() {
    let { bookId } = useParams();
    const [book, setBook] = useState(null);
    
    useEffect(() => {
        axios.get("http://localhost:3000/admin/book/" + bookId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setBook(res.data.book);
        });
    }, []);

    if (!book) {
        return <div style={{height: "100vh", justifyContent: "center", flexDirection: "column"}}>
            Loading....
        </div>
    }

    return <div>
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard book={book} setBook={setBook} />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <BookCard book={book} />
            </Grid>
        </Grid>
    </div>
}

function UpdateCard({book, setBook}) {
    const [title, setTitle] = useState(book.title);
    const [description, setDescription] = useState(book.description);
    const [image, setImage] = useState(book.imageLink);
    const [price, setPrice] = useState(book.price);

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card varint={"outlined"} style={{display: 'flex', width: 600, height: 400, marginTop: 200, flexDirection: 'column', justifyContent: 'space-evenly'}}>
                <Typography textAlign={"center"}>Update book details</Typography>
                <TextField value={title} onChange={(e) => {setTitle(e.target.value)}} fullWidth={true} label="Title" variant="outlined"/>
                <TextField value={description}onChange={(e) => {setDescription(e.target.value)}} fullWidth={true} label="Description" variant="outlined" />
                <TextField value={image} onChange={(e) => { setImage(e.target.value)}} fullWidth={true} label="Image link" variant="outlined" />
                <TextField value={price} onChange={(e) => { setPrice(e.target.value)}} fullWidth={true} label="Price" variant="outlined" />
                <Button variant="contained" 
                    onClick={async () => {
                        axios.put("http://localhost:3000/admin/books/" + book._id, {
                            title: title,
                            description: description,
                            imageLink: image,
                            published: true,
                            price
                        }, {
                            headers: {
                                "Content-type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        let updatedBook = {
                            _id: book._id,
                            title: title,
                            description: description,
                            imageLink: image,
                            price
                        };
                        setBook(updatedBook);
                    }}
                > Update Book</Button>
    </Card>
</div>
    )
}

function BookCard(props) {
    const book = props.book;
    return ( 
        <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
            <Card style={{margin: 10, width: 350, minHeight: 200, borderRadius: 20, marginRight: 50, paddingBottom: 15}}>
                <img src={book.imageLink} style={{width: 350}} ></img>
                <div style={{marginLeft: 10}}>
                    <Typography variant="h5">{book.title}</Typography>
                    <Typography variant="subtitle2" style={{color: "gray"}}>Price</Typography>
                    <Typography variant="subtitle1"> <b>Rs {book.price} </b></Typography>
                </div>
            </Card>
        </div>
    )
}

export default Book;