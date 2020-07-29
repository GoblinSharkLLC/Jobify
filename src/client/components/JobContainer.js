import React, { useState, useEffect } from 'react';
import Job from './Job';
import axios from 'axios';

// display for a user's saved jobs
export default function JobContainer() {
  const [savedJobs, setSavedJobs] = useState([
    {
      title: 'Engineering',
      company: 'Tech Corp',
      url: 'url',
      city: 'city',
      state: 'state',
      status: 'status',
      posted: 'posted',
      description: 'description',
      contact: { name: 'John', email: 'John@email', number: '8398080' },
      notes: 'Whats up',
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.post('api/users/savedJobs', {
        accessToken: localStorage.getItem('jwt'),
      });
      setSavedJobs(result.data);
    }
    fetchData();
  }, []);

  const deleteJob = async (id) => {
    try {
      await axios.delete('/api/users/jobs', {
        data: {
          accessToken: localStorage.getItem('jwt'),
          id: id,
        },
      });
      const element = document.getElementById(`job-container-${id}`);
      element.classList.add('hide');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="find-jobs-display">
      {savedJobs.map((savedJob, idx) => {
        return (
          <Job
            key={`savedJob${idx}`}
            job={savedJob}
            savedContainer={true}
            deleteJob={deleteJob}
          />
        );
      })}
    </div>
  );
}
