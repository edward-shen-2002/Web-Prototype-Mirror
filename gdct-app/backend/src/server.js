import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const port = app.get('port');

const server = app.listen(port, () => {
  console.log('Listening on port', port);
});

export default server;
