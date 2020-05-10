import React, { useState } from "react";
import Contact from "./Contact";
import axios from "axios";

export default function Job({ job, savedContainer }) {
  const {
    id,
    title,
    city,
    company,
    url,
    state,
    status,
    posted,
    description,
    contact,
    notes,
  } = job;
  console.log(savedContainer);
  const [saved, setSaved] = useState([false]);
  const updateButton = async () => {
    if (saved) {
      // if the user wants to delete Job
      // DELETE to /api/savedJobs
      try {
        await axios.delete("/api/savedJobs", {
          data: { title, company, url },
        });
        setSaved(false);
      } catch (err) {
        console.log(err);
      }
      setSaved(false);
    } else {
      // if the user wants to save Job
      // POST to /api/savedJobs
      try {
        axios.post("/api/savedJobs", {
          data: job,
        });
        setSaved(true);
      } catch (err) {
        console.log(err);
      }
      setSaved(true);
    }
  };

  const formatUrl = (url) => {
    const noHttp = url.substr(url.indexOf("www."));
    return noHttp.substr(0, noHttp.indexOf("/"));
  };
  return (
    <div className="job-container">
      <p className="job-header">{title}</p>
      <p className="text-muted">At: {company}</p>
      <p>
        {city}, {state}
      </p>
      <p>
        <b>Status: </b>
        {status}
      </p>
      <ul>
        <li>{description.slice(0, 100) + "..."}</li>
      </ul>
      <a href={url}>{formatUrl(url)}</a>
      <aside>{posted}</aside>
      {savedContainer === true ? (
        <div>
          <Contact contact={contact} />
        </div>
      ) : null}
      {savedContainer === true ? <textarea defaultValue={notes} /> : null}
      {saved === true || savedContainer === true ? (
        <input type="button" value="Delete Job" onClick={updateButton} />
      ) : (
        <input type="button" value="Save Job" onClick={updateButton} />
      )}
    </div>
  );
}
