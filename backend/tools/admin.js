import { ROLE_LEVEL_ADMIN, ROLE_LEVEL_LHIN } from "../constants/roles";

const organizationsFilter = (organizations) => organizations.map((organization) => {
  let filter = {};

  filter[`organizations.${organization}`] = { $exists: true };

  return filter;
});

const LHINsFilter = (LHINs) => LHINs.map((LHIN) => {
  let filter = {};

  filter[`LHINs.${LHIN}`] = { $exists: true };

  return filter;
});

export const calculateRoleFilter = ({ scope, LHINs, organizations }) => {
  let filter;

  if(scope === ROLE_LEVEL_ADMIN) {
    filter = {};
  } else if(scope === ROLE_LEVEL_LHIN) {
    if(LHINs || organizations) filter = { $or: [ ...LHINsFilter(LHINs), ...organizationsFilter(organizations) ] };
  } else {
    if(organizations) filter = { $or: [ ...organizationsFilter(organizations) ] };
  }

  return filter;
};