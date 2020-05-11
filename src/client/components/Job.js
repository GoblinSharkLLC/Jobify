import React, { useState } from 'react';
import Contact from './Contact';
import axios from 'axios';

export default function Job({ job, savedContainer }) {
  const {
    id,
    title,
    city,
    company,
    image,
    url,
    state,
    status,
    posted,
    description,
    contact,
    notes,
  } = job;
  const [saved, setSaved] = useState([false]);
  const updateButton = async () => {
    if (saved === true) {
      // if the user wants to delete Job
      // DELETE to /api/savedJobs
      try {
        await axios.delete('/api/savedJobs', {
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
        axios.post('/api/savedJobs', {
          data: job,
        });
        setSaved(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const formatUrl = (url) => {
    const noHttp = url.substr(url.indexOf('www.'));
    return noHttp.substr(0, noHttp.indexOf('/'));
  };
  return (
    <div className="job-container">
      <p className="job-header">{title}</p>
      <p className="text-muted">At: {company}</p>
      <img src={image} alt="company logo" className="logo-image" />
      <p>
        {city}, {state}
      </p>
      {savedContainer === true ? (
        <form>
          <label htmlFor="status">Status: </label>
          <select id="status" name="statusName">
            <option value="Need to Apply">Need to Apply</option>
            <option value="Applied">Applied</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </form>
      ) : null}
      <ul>
        <li>{description.slice(0, 100) + '...'}</li>
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
