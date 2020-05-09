import React, { useState } from "react";
import Contact from "./Contact";
import axios from "axios";

export default function Job({ job }) {
  const {
    title,
    company,
    url,
    city,
    state,
    status,
    posted,
    description,
    contact,
    notes,
  } = job;
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
    } else {
      // if the user wants to save Job
      // POST to /api/savedJobs
      try {
        axios
        .post("/api/savedJobs", {
          data: job,
        });
        setSaved(true);
      } catch (err) {
        console.log(err)
      }
  };
  return (
    <div>
      <b>{title}</b>
      <p>{company}</p>
      <p>
        {city}, <b>{state}</b>
      </p>
      <p>
        <b>Status: </b>
        {status}
      </p>
      <ul>
        <li>{description}</li>
      </ul>
      <p>{url}</p>
      <aside>{posted}</aside>
      {saved === true ? (
        <div>
          <Contact contact={contact} />
        </div>
      ) : null}
      {saved === true ? <textarea defaultValue={notes} /> : null}
      {saved === true ? (
        <input type="button" value="Delete Job" onClick={updateButton} />
      ) : (
        <input type="button" value="Save Job" onClick={updateButton} />
      )}
    </div>
  );
}
