import { setupRouteGroups } from "./routes";

import { setupAuthentication } from "./authentication";

const serverSetup = (app, passport) => {
  const helpers = {  };

  setupAuthentication(passport, helpers);
  
  setupRouteGroups(app, passport, helpers);
};

export default serverSetup;