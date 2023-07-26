const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());


const secret = 'S3cr3T';


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
});

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});


const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Book = mongoose.model('Book', bookSchema);


 mongoose.connect('mongodb+srv://elwinjoshua:8Ko2MCjIcnJpMkQx@cluster0.fbhyims.mongodb.net/mylibrary', {useNewUrlParser: true, useUnifiedTopology: true, dbname: 'mylibrary'}).then(() => {
    console.log('connected');
 });


 const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); 
    }
 }
 app.get('/admin/me',authenticateJwt, (req, res) => {
    res.json({
        username: req.user.username
    })
 })

 app.post('/admin/signup', async (req,res) => {
    const {username, password} = req.body;
    const admin = await Admin.findOne({username});
    if (admin) {
        res.status(403).json({message: 'Admin already exists.'});
    } else {
        const newAdmin = new Admin({username, password});
        await newAdmin.save();
        const token = jwt.sign({username, role: 'admin'}, secret, { expiresIn: '1h'});
        res.json({ message: 'Admin created successfully', token});;
    }
 })

 app.post('/admin/login', async (req, res) => {
    const {username, password} = req.body;
    const admin = await Admin.findOne({username, password});
    if (admin){
        const token = jwt.sign({username, role: 'admin'}, secret, { expiresIn: '1h'})
        res.json({message: 'logged in successfully', token});
    } else {
        res.status(403).json({message: 'Invalid username or password'});
    }
 })

 app.post('/admin/books', authenticateJwt, async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.json({ message: 'book created successfully', bookId: book.id});
 })

app.put('/admin/books/:bookId', authenticateJwt, async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {new: true});
    if (book) {
        res.json({message: 'Book updated successfully'});
    } else {
        res.status(404).json({message: 'Book not found'})
    }
})

app.get('/admin/book/:bookId', authenticateJwt, async (req, res) => {
    const book = await Book.findById(req.params.bookId);
    res.json({book})
})

app.get('/admin/books', authenticateJwt, async (req, res) => {
    const books = await Book.find({});
    res.json({ books })
})


app.post('/users/signup', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (user) {
        res.status(403).json({messgae: "user created successfully"});
    } else {
        const newUser = new User({username, password});
        await newUser.save();
        const token = jwt.sign({username, role: 'user'}, secret, {expiresIn: '1h'});
        res.json({message: 'user created successfuly'});
    }
});

app.post('/users/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username, password});
    if(user) {
        const token = jwt.sign({username, role:  'user'}, secret, {expiresIn: '1h'});
        res.json({message: 'user successfully loggedin', token});
    } else {
        res.status(403).json({message: 'Invalid username or password'});
    }
});

app.get('/users/books', authenticateJwt, async (req, res) => {
    const book = await Book.find({published: true});
    res.json({ courses });
});

app.post('/users/books/:bookId', authenticateJwt, async (req, res) => {
    const book = await Book.findById(req.params.bookId);
    if (book) {
        const user = await Book.findOne({username: req.user.username});
        if (user) {
            user.purchasedBooks.push(book);
            await book.save();
            res.json({message: 'book purchased successfully'});
        } else {
            res.status(403).json({message: 'user not found'});
        }
    } else {
        res.status(404).json({message: 'book not found'});
    }
});

app.get('/users/purchasedbooks', authenticateJwt, async (req, res) => {
    const user = await User.findOne({username: req.params.username}).populate('purchasedBooks');
    if (user) {
        res.json({purchasedBooks: user.purchasedBooks || [] });
    } else {
        res.status(403).json({message: 'user not found'});
    }
});

 app.listen((3000), () => {
    console.log('server is running.')
 })