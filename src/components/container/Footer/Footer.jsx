import React from 'react';
import "./Footer.scss"
import { socialIcons } from '../../../Data';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{
        opacity:
          1
      }}
      transition={{ duration: 1.5 }}
      className='footer'
    >
      <div className="copyright">
        <p>Developed by <span>Amal Prakash</span></p>
      </div>
      <div className="followMe">
        <h4>Find me on</h4>
        <div className="stick"></div>
        <div className="social_icons">
          {socialIcons.map((socialIcon, index) => {
            return (
              <div key={index} >
                {socialIcon}
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default Footer