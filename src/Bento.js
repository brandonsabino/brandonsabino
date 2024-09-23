import React from "react";
import Resume from "./Resume";

const Bento = ({
  id,
  greeting,
  main,
  prompt
}) => {
  return (
    <div className="window-container">
      <div className="bento" id="bento">
        <div className="big-left">
          <div className="experience">
            <h3>Experience <sub>(simplified)</sub></h3>
            <p>
              I'm a Brooklyn based frontend developer, with nearly five years of experience in the eCommerce sector.
              Thus far I've spent most of my career at Rightpoint, formerly Something Digital, with prior experience coming as a freelancer shortly after graduating from the University of Vermont.
            </p>
            <Resume />
          </div>
        </div>
        <div className="right-top projects">
          <div>
            <h3>Interests & Projects</h3>
            <p>
              Web accessibility, linguistics, cycling, guitar, books about sports history, crafting the perfect Spotify playlist.
            </p>
            <ul className="links-list">
              {/* <li><a href="/" >Linguistic Genesis Tool</a></li>
              <li><a href="/" >'The Martian' Inspired NASA Communications Terminal (AI LLM)</a></li>
              <li><a href="/" >Hexadecimal Translator</a></li>
              <li><a href="/" >NBA Player Career Overlap Visualizer</a></li>
              <li><a href="/" >'Days Since the NY Rangers Won the Cup' Visualizer</a></li> */}
              <li>
                <span>Bit of a work in progress... check back soon!</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-bottom connect">
          <h3>Find me on...</h3>
          <p>I respond best on LinkedIn</p>
          <ul className="links-list">
            <li><a href="https://www.linkedin.com/in/brandon-sabino" aria-label="Link to Brandon Sabino's LinkedIn profile"><i className="fa fa-linkedin"></i></a></li>
            <li><a href="https://github.com/brandonsabino" aria-label="Link to Brandon Sabino's GitHub profile"><i className="fa fa-github"></i></a></li>
            <li><a href="mailto:brandonsabino1@gmail.com" aria-label="Email me"><i className="fa fa-envelope"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Bento;
