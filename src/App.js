import './App.css';
import { BrowserRouter, Route, Routes } 
from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Currencies from './Currencies';
import Transactions from './Transactions';
import Categories from './Categories';
import Wallets from './Wallets';
import User from './User';
import Home from './Home';
import NoPage from './NoPage';

// import Navbar from './Navbar';
function App() {
  return (
    <div className="App">

      

      <BrowserRouter>
      
      
            <Routes>


        <Route path='login' element={<Login/>}/>
        <Route path='/' element={<Register/>}/>
       <Route path="/home" element={<Home />}>
  <Route path="user" element={<User />} />
  <Route path="currencies" element={<Currencies />} />
  <Route path="categories" element={<Categories />} />
  <Route path="wallets" element={<Wallets />} />
  <Route path="transactions" element={<Transactions />} />
</Route>
          <Route path='*' element={<NoPage/>}/>
      </Routes>
      
    
      </BrowserRouter>
    </div>
  );
}

export default App;
