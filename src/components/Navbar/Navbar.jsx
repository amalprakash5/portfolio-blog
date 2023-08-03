import React, { useState, useEffect } from 'react';
import "./Navbar.scss";
import { motion } from 'framer-motion';
import { HiMenuAlt4, HiX, HiOutlineLightBulb } from "react-icons/hi";
import { navLinks } from '../../Data';
import { SiAboutdotme } from "react-icons/si";
import me from '../../../src/assets/me.png';
const Navbar = () => {

    const [scroll, setScroll] = useState(false);
    const [toggle, setToggle] = useState(false)

    const menuVariants = {
        hidden: {
            scale: 0
        },
        visible: {
            scale: 50,
            transition: {
                type: "tween",
                duration: 0.5,
            }
        }
    }
    const navLinkVariants = {
        hidden: {
            display: "none",
            opacity: 0
        },
        visible: {
            opacity: 1,
            y: -30,
            transition: {
                delay: 0.7
            }
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 20)
        })
    }, [])
    return (
        <motion.div
            initial={{ y: -25 }}
            animate={{ y: -5 }}
            transition={{ duration: 0.5 }}
            className={scroll ? "header active" : "header"}>
            <div className="Nav_container">
                <div className="logo">
                    <a href={`#${navLinks.at(0)}`}><h2>Parkaas<HiOutlineLightBulb /></h2></a>
                </div>
                <div className="shot_description">
                    Ignite. <span> Explore. </span> Embrace.
                </div>
                <div className="about" >
                    <a href="https://amalprakash.vercel.app" target="_blank" rel="noopener noreferrer"><SiAboutdotme /></a>
                </div>
                <div className="menu" >
                    <HiMenuAlt4 onClick={() => { setToggle(true) }} />
                </div>
                <motion.div className="closeMenu"
                    variants={menuVariants}
                    initial="hidden" animate={toggle ? "visible" : "hidden"}
                >
                </motion.div>

                <motion.div
                    variants={navLinkVariants}
                    animate={toggle ? "visible" : "hidden"}
                    className="menuX"
                >
                    <HiX onClick={() => setToggle(false)} />
                    {navLinks.map((navlink, index) => {
                        return (
                            <div>
                                <div className='my-pic'>
                                    <img src={me} />
                                </div>
                                <li key={index}>
                                    <a href="https://amalprakash.vercel.app" onClick={() => setToggle(false)}>{navlink}</a>
                                </li>
                            </div>
                        )
                    })}
                </motion.div>
            </div >
        </motion.div >
    )
}

export default Navbar