const Banner = ({ text, subtext, employer, employerURL, prompt }) => {
  return (
    <div className="banner-container" id="banner">
      <div className="banner-content">
        <h1>{text}</h1>
        <h3>
          {subtext}
          <a tabIndex={0} href={employerURL} target="_blank" rel="noreferrer">{employer}</a>
        </h3>
      </div>
      <div className="navigation-ish">
        <span>{prompt}</span>
        <a href="#bento" aria-label="Scroll down">
          <svg className="moving-element" xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 -960 960 960" width="48px" fill="#d3170dff"><title>Scroll down</title><path d="M480-238 276-442l16-16 188 189 188-189 16 16-204 204Zm0-242L276-684l16-16 188 189 188-189 16 16-204 204Z" /></svg>
        </a>
      </div>
    </div>
  );
};

export default Banner;
