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
