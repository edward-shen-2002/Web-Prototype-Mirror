import { ROLE_LEVEL_ADMIN, ROLE_LEVEL_SECTOR, ROLE_LEVEL_LHIN } from "../constants/roles";

const hierarchyFilter = (dataType, dataList) => dataList.map((data) => {
  let filter = {};

  filter[`${dataType}.${data}`] = { $exists: true };

  return filter;
});

export const calculateRoleFilter = ({ scope, sectors, LHINs, organizations }) => {
  let filter;

  if(scope === ROLE_LEVEL_ADMIN) {
    filter = {};
  } else if(scope === ROLE_LEVEL_SECTOR) {
    filter = { $or: [ ...hierarchyFilter("sectors", sectors), ...hierarchyFilter("LHINs", LHINs), ...hierarchyFilter("organizations", organizations) ] }
  } else if(scope === ROLE_LEVEL_LHIN) {
    if(LHINs || organizations) filter = { $or: [ ...hierarchyFilter("LHINs", LHINs), ...hierarchyFilter("organizations", organizations) ] };
  } else {
    if(organizations) filter = { $or: [ ...hierarchyFilter("organizations", organizations) ] };
  }

  return filter;
};