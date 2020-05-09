import React, { useState } from 'react';
import Contact from './Contact';
import axios from 'axios';

export default function Job({ job }) {
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
  const [saved, setSaved] = useState([false]);
  const updateButton = () => {
    if (saved) {
      // if the user wants to delete Job
      // DELETE to /api/savedJobs
      axios
        .delete('/api/savedJobs', {
          data: { title, company, url },
        })
        .then((response) => {
          console.log(response.data);
          setSaved(false);
        });
    } else {
      // if the user wants to save Job
      // POST to /api/savedJobs
      axios
        .post('/api/savedJobs', {
          data: job,
        })
        .then((response) => {
          console.log(response.data);
          setSaved(true);
        });
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
