import './App.css';
import CardContainer from './components/CardListing/cardContainer';
import Header from './components/Header/header';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="App">
      {/* <h1>Helloo</h1> */}
      <Header />
      <ToastContainer/>
      <CardContainer />
    </div>
  );
}

export default App;

