import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Usage from './components/Usage';
import Dtnotice from './components/Dtnotice';
import CommuterPass from './components/CommuterPass';
import LpData2 from './data/Lp_data2';
import UsageDetails from './components/UsageDetails';
import { useState } from 'react';
import LpData from './data/Lp_data';
import PaymentDetail from './components/PaymentDetail';


function App() {

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/payment' element={<PaymentDetail />}/>
        <Route path='/usage' element={<Usage />}/>
        <Route path='/usage/details/:id' element={<UsageDetails />}/>
        <Route path='/commuterpass' element={<CommuterPass LpData2={LpData2}/>}/>
        <Route path='/notice' element={<Dtnotice />}/>
      </Routes>
    
      <Footer />
    </div>
  );
}

export default App;
