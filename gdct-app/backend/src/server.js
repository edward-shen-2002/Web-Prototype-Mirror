import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const port = app.get('port');

const server = app.listen(port, () => {
  console.log('Listening on port', port);
});

export default server;
