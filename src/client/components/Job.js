import React, { useState } from 'react';
import Contact from './Contact';
import axios from 'axios';

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
<<<<<<< HEAD
      axios
        .delete('/api/savedJobs', {
=======
      try {
        await axios.delete("/api/savedJobs", {
>>>>>>> 0e89c94112f9326c71a814187011f6dc6dda426b
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
<<<<<<< HEAD
      axios
        .post('/api/savedJobs', {
=======
      try {
        axios.post("/api/savedJobs", {
>>>>>>> 0e89c94112f9326c71a814187011f6dc6dda426b
          data: job,
        });
        setSaved(true);
      } catch (err) {
        console.log(err);
      }
      setSaved(true);
    }
  };
  return (
    <div className="job-container">
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
