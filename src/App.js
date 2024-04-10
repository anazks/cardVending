import logo from './logo.svg';
import './App.css';
import Headder from './Components/Headder/Headder';
import Footer from './Components/Footer/Footer';
import Card from './Components/Card/Card';
import Icons from './Components/Icons/Icons';


function App() {
  return (
    <div className="App">
      <Headder/>
      <Card/>
        <Icons/>
      <Footer/>
      
    </div>
  );
}

export default App;
