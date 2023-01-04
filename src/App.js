import './App.scss';
import Header from './components/Header';
import Home from './components/Home';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Link } from "react-router-dom";

function App() {


  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/users" element={<TableUsers />}></Route>
          </Routes>
        </Container>

      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}


export default App;
