import React, { useState } from 'react';
import Contact from './Contact';
import axios from 'axios';

// Presentation component for displaying the information of a job
export default function Job({ job, savedContainer, saveJob, deleteJob }) {
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
  // state hook to denote whether a job has been saved or not
  const [saved, setSaved] = useState(false);

  const formatUrl = (url) => {
    const noHttp = url.substr(url.indexOf('www.'));
    return noHttp.substr(0, noHttp.indexOf('/'));
  };

  return (
    <div className="job-container">
      <p className="job-header">{title}</p>
      <p className="text-muted">At: {company}</p>
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
      {/* {savedContainer ? (
        <div>
          <Contact contact={contact} />
        </div>
      ) : null} */}
      {savedContainer ? <textarea defaultValue={notes} /> : null}

      {/* Logic to determine whether to display the save  r delee button*/}
      {localStorage.getItem('jwt') && !savedContainer ? (
        <input
          type="button"
          value="Save Job"
          onClick={() => {
            saveJob();
            setSaved(true);
          }}
        />
      ) : localStorage.getItem('jwt') && savedContainer ? (
        <input
          type="button"
          value="Delete Job"
          onClick={() => {
            deleteJob();
            setSaved(false);
          }}
        />
      ) : null}
    </div>
  );
}
