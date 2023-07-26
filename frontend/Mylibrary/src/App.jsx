import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./signup.jsx";
import Login from "./login.jsx";
import Appbar from "./appbar.jsx";
import AddBook from './addbook.jsx';
import Book from "./book.jsx";
import Books from "./books.jsx"
import HomePage from './home.jsx';






function App() {

    return (
        <div style={{width: "100vw", height: "100vh",backgroundColor: '#ecf3ec'}}>
                <Router>
                    <Appbar />
                    <Routes>
                        <Route path={"/"} element={<HomePage />} />
                        <Route path={"/Login"} element={<Login />} />
                        <Route path={"/signup"} element={<Signup />} />
                        <Route path={"/addbook"} element={<AddBook />} />
                        <Route path={"/book/:bookId"} element={<Book />} />
                        <Route path={"/books"} element={<Books />} />
                    </Routes>
                </Router>

        </div>
    );
}

export default App;