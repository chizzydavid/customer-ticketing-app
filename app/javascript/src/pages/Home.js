import React from 'react';
import Navbar from '../shared/Navbar';
import Landing from '../components/Landing';
import Footer from '../shared/Footer';

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