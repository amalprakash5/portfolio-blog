import React from 'react'
import portfolio1 from "../../../assets/portfolio1.png"
import "./Home.scss"
import { motion } from 'framer-motion'


const Home = () => {
  const moveVariants = {
    animation: {
      y: [0, -15],
      transition: {
        yoyo: Infinity,
        duration: 2,
        delay: 0
      }
    }
  }

  return (
    <motion.div className="container " id='home'
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={
        {
          duration: 2,
          delay: 0.5
        }
      }
    >
      <div className="profile">
        <img src={portfolio1} alt="portfolio" />
      </div>
      <div className="profile_text">
        <h3 className='name'>Hey, 👋  I'm <span>Amal Prakash</span> </h3>
        <span className='job'>Web Developer | AI Enthusiast | DevOps Intern</span>
        <span className='text'>Crafting<br /> awesomeness that<br />capture users.</span>
        <div className='connect'>
          <motion.div
            whileHover={{ scale: 1.1 }}
            variants={moveVariants}
            animate="animation"
          ><a href="#contact">connect with me</a></motion.div>
        </div>
        {/* <div
          className="web"

        >
          Web Developer
        </div>
        <div
          className="ui"
        >
          UI/UX Designer
        </div>
        <div
          className="freelance"
        >
          Freelancer
        </div> */}
      </div>
    </motion.div>
  )
}

export default Home