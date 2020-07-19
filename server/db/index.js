const { Client } = require('pg');
const connectionString = "postgres://hgpekfip:TCT4IFjkM-iroqNak882wcRL-RS8D-aN@ruby.db.elephantsql.com:5432/hgpekfip";
const client = new Client({
    connectionString: connectionString,
});
client.connect().then(() => console.log('PostgreSQL Connected...')).catch(err => console.log(err));

module.exports = {
    query: (text, params, callback) => {
      return client.query(text, params, callback)
    }
  }
