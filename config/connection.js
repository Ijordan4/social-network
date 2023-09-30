const {connect, connection} = require('mongoose');

const Connection = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialmediaDB';

connect(Connection);
module.exports = connection;