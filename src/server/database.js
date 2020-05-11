/* For Future Teams to recreate the database for this project:
Database tables:
  1. Users
  2. Jobs

User Schema:
  id: SERIAL PRIMARY KEY
  username: VARCHAR  NOT NULL
  password: VARCHAR  NOT NULL

Jobs Schema:
  id : SERIAL PRIMARY KEY
  title: VARCHAR  NOT NULL
  state: VARCHAR
  company: VARCHAR  NOT NULL
  posted: VARCHAR
  url: VARCHAR  NOT NULL
  status: VARCHAR  NOT NULL
  notes: VARCHAR
  user_id: INTEGER  NOT NULL
  image: VARCHAR
  description: VARCHAR
  contact: json

  Love, Dave S.
*/
const { Pool } = require('pg');

const PG_URI =
  'postgres://jbwsvxqc:8nndMS0UWljoVtgwDAiUzKPzdQ0bPfme@rajje.db.elephantsql.com:5432/jbwsvxqc';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
