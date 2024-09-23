import React from "react";

const Resume = () => {
  return (
    <div className="resume-container">
      <ol className="resume">
        <li>
          <header>January 2020 - September 2024</header>
          <div className="content">
            <a className="employer-link" target="_blank" rel="noreferrer" href="https://www.rightpoint.com">
              <h4>
                Frontend Developer · Something Digital / Rightpoint
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2E0219"><title>external link icon</title><path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h252.3v60h-252.3q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-252.3h60v252.3Q820-182 799-161q-21 21-51.31 21H212.31Zm176.46-206.62-42.15-42.15L717.85-760H560v-60h260v260h-60v-157.85L388.77-346.62Z"/></svg>
              </h4>
              <p>
                Worked closely with clients, mentored and managed junior developers, participated in code review, and lead the charge on a number of initiatives for our Shopify Plus clients.
              </p>
              <ul>
                <li><span>JavaScript</span></li>
                <li><span>HTML & CSS</span></li>
                <li><span>SCSS</span></li>
                <li><span>Liquid</span></li>
                <li><span>React</span></li>
                <li><span>Vue.js</span></li>
              </ul>
            </a>
          </div>
        </li>
        <li>
          <header>May 2019 - January 2020</header>
          <div className="content">
            <a className="employer-link" target="_blank" rel="noreferrer" href="https://localmusclemovers.com/">
              <h4>
                Digital Marketing Manager · Local Muscle Movers
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2E0219"><title>external link icon</title><path d="M212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h252.3v60h-252.3q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-252.3h60v252.3Q820-182 799-161q-21 21-51.31 21H212.31Zm176.46-206.62-42.15-42.15L717.85-760H560v-60h260v260h-60v-157.85L388.77-346.62Z"/></svg>
              </h4>
              <p>
                Designed, estimated, and built new websites for Local Muscle Movers and franchise storage solution, Mi-Box Maine. Collaborated closely with ownership to determine needs and opportunities for imporovement in customer engagement.
              </p>
              <ul>
                <li><span aria-label="JavaScript">JavaScript</span></li>
                <li><span aria-label="HTML & CSS">HTML & CSS</span></li>
                <li><span aria-label="PHP">PHP</span></li>
              </ul>
            </a>
          </div>
        </li>
      </ol>
      <div className="resume-cta__container">
        <a href="/BrandonSabino_FrontendDeveloper2024.pdf" target="_blank" rel="noreferrer" className="resume-cta">
          View full résumé
          <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><title>PDF download icon</title><path d="M333-457h27v-81h55q11.58 0 19.29-7.71Q442-553.43 442-565v-55q0-11.57-7.71-19.29Q426.58-647 415-647h-82v190Zm27-108v-55h55v55h-55Zm125 108h77q12 0 19.5-8.14 7.5-8.13 7.5-18.86v-136q0-11.57-7.5-19.29Q574-647 562-647h-77v190Zm27-27v-136h50v136h-50Zm132 27h27v-81h63v-27h-63v-55h63v-27h-90v190ZM308-280q-22.77 0-38.39-15.61Q254-311.23 254-334v-440q0-22.78 15.61-38.39Q285.23-828 308-828h440q22.78 0 38.39 15.61T802-774v440q0 22.77-15.61 38.39Q770.78-280 748-280H308Zm0-22h440q12 0 22-10t10-22v-440q0-12-10-22t-22-10H308q-12 0-22 10t-10 22v440q0 12 10 22t22 10Zm-96 118q-22.77 0-38.39-15.61Q158-215.23 158-238v-462h22v462q0 12 10 22t22 10h462v22H212Zm64-622v504-504Z" /></svg>
        </a>
      </div>
    </div>

  );
};

export default Resume;