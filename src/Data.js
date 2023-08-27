import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import React from 'react'
import Lottie from 'react-lottie';
import loading from './lotties/loading.json'
import error404 from './lotties/error404.json'

export const navLinks = ["More about me"]

export const socialIcons = [
  <a href="https://www.linkedin.com/in/amalprakash5/" target="_blank" rel="noopener noreferrer"><FaLinkedin title="LinkedIn" /></a>,
  <a href="https://www.instagram.com/_amalprakash/" target="_blank" rel="noopener noreferrer"><FaInstagram title="Instagram" /></a>,
  <a href="https://twitter.com/_amalprakash" target="_blank" rel="noopener noreferrer"><FaTwitter title="Twitter" /></a>
]

export const workNavs = [
  "Tech Buzz", "Web Technologies", "Achievenments & Experience", "Travel", "ALL"
]

export class LoadingLottie extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: loading,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return <div>
      <Lottie options={defaultOptions}
        isClickToPauseDisabled={true} />
    </div>
  }
}

export class ErrorLottie extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: error404,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return <div>
      <Lottie options={defaultOptions}
        isClickToPauseDisabled={true} />
    </div>
  }
}
