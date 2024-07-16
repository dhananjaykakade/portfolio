import React from 'react'
import Main from './components/main/Main.tsx'
import Nav from './components/nav/Nav.tsx'
import{ BorderBeam }from './components/magicui/borderBeam.tsx'
import About from './components/about/About.tsx'
import Project from './components/Project.tsx'
import Footer from './components/footer/Footer.tsx'

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