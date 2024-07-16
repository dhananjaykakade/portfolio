import React from 'react'
import Main from './components/main/Main'
import Nav from './components/nav/Nav'
import{ BorderBeam }from './components/magicui/borderBeam'
import About from './components/about/About'
import Project from './components/Project'
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Main/>
      <About/>
      <Nav />
     <Project/>
     <Footer/>
    </div>
  )
}

export default App