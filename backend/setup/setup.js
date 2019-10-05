import { setupRouteGroups } from "./routes";

import { setupAuthentication } from "./authentication";

export const setup = (app, passport) => {
  const helpers = {  };

  setupAuthentication(passport, helpers);
  
  setupRouteGroups(app, passport, helpers);
};