import React from 'react';
import Navbar from '../components/shared/Navbar';
import Landing from '../components/Landing';
import Footer from '../components/shared/Footer';

const Home = () => {
  return (
    <div id="home">
      <Navbar home={true}/>
      <Landing/>
      <Footer />
    </div>
  )
}

export default Home;