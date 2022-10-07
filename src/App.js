import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {

  const apikey = process.env.REACT_APP_NEWS_API_KEY

    return (
      <BrowserRouter>
        <div>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<News apikey={apikey} key="general" category='general'/>} />
            <Route exact path="/business" element={<News apikey={apikey} key="business" category='business'/>} />
            <Route exact path="/entertainment" element={<News apikey={apikey} key="entertainment" category='entertainment'/>} />
            <Route exact path="/general" element={<News apikey={apikey} key="general" category='general'/>} />
            <Route exact path="/health" element={<News apikey={apikey} key="health" category='health'/>} />
            <Route exact path="/science" element={<News apikey={apikey} key="science" category='science'/>} />
            <Route exact path="/sports" element={<News apikey={apikey} key="sports" category='sports'/>} />
            <Route exact path="/technology" element={<News apikey={apikey} key="technology" category='technology'/>} />
          </Routes> 
        </div>
      </BrowserRouter>
    )
}

export default App
