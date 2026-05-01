import './App.css';
import { BrowserRouter, Route, Routes } 
from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Currencies from './Currencies';
import Transactions from './Transactions';
import Categories from './Categories';
import Wallets from './Wallets';
import User from './User';
import NoPage from './NoPage';

// import Navbar from './Navbar';
function App() {
  return (
    <div className="App">

      

      <BrowserRouter>
       <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">

     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
       <span className="navbar-toggler-icon"></span>
     </button>
     <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
         <a href="/" className='m-2'>Register</a>
    <a href="/login" className='m-2'>Login</a>

  <a href="/user"  className='m-2' >User</a> 
  <a href="/currencies" className='m-2'>Currencies</a> 
  <a href="/wallets"className='m-2'>Wallets</a> 
  <a href="/categories" className='m-2'>Categories</a> 
  <a href="/transactions" className='m-2'>Transactions</a> 
  </div>
</div>
  </div>
</nav>
      
            <Routes>


        <Route path='/' element={<Login/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='user' element={<User/>}/>
        <Route path='currencies' element={<Currencies/>}/>
          <Route path='wallets' element={<Wallets/>}/> 
            <Route path='categories' element={<Categories/>}/>
            <Route path='transactions' element={<Transactions/>}/>
          <Route path='*' element={<NoPage/>}/>
      </Routes>
      
    
      </BrowserRouter>
    </div>
  );
}

export default App;
