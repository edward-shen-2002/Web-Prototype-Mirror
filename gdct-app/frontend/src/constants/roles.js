export const ROLE_USER_MANAGER = 'USER_MANAGER';
export const ROLE_TEMPLATE_MANAGER = 'TEMPLATE_MANAGER';
export const ROLE_BUNDLE_MANAGER = 'BUNDLE_MANAGER';
export const ROLE_ORGANIZATION_MANAGER = 'ORGANIZATION_MANAGER';
export const ROLE_SECTOR_MANAGER = 'SECTOR_MANAGER';
export const ROLE_EDIT_BUNDLE_MANAGER = 'EDIT_BUNDLE_MANAGER';
export const ROLE_REVIEW_BUNDLE_MANAGER = 'REVIEW_BUNDLE_MANAGER';
export const ROLE_APPROVE_BUNDLE_MANAGER = 'APPROVE_BUNDLE_MANAGER';
export const ROLE_BUSINESS_CONCEPT_MANAGER = 'BUSINESS_CONCEPT_MANAGER';
export const ROLE_DATA_ENTITY_MANAGER = 'DATA_ENTITY_MANAGER';

// Levels of role
export const ROLE_LEVEL_ADMIN = 'ADMIN';
export const ROLE_LEVEL_SECTOR = 'SECTOR';
export const ROLE_LEVEL_LHIN = 'LHIN';
export const ROLE_LEVEL_ORGANIZATION = 'ORGANIZATION';
export const ROLE_LEVEL_NOT_APPLICABLE = 'N/A';

const ROLE_NAMES = [
  ROLE_USER_MANAGER,
  ROLE_TEMPLATE_MANAGER,
  ROLE_BUNDLE_MANAGER,
  ROLE_ORGANIZATION_MANAGER,
  ROLE_DATA_ENTITY_MANAGER,
  ROLE_SECTOR_MANAGER,
  ROLE_EDIT_BUNDLE_MANAGER,
  ROLE_REVIEW_BUNDLE_MANAGER,
  ROLE_APPROVE_BUNDLE_MANAGER,
];

export const ROLE_SCOPES = [
  ROLE_LEVEL_ADMIN,
  // ROLE_LEVEL_LHIN,
  ROLE_LEVEL_SECTOR,
  ROLE_LEVEL_ORGANIZATION,
  ROLE_LEVEL_NOT_APPLICABLE,
];

const DEFAULT_GROUPS = { sectors: [], LHINs: [], organizations: [] };
const DEFAULT_ROLE_CONTROL_CONFIG = {
  scope: ROLE_LEVEL_NOT_APPLICABLE,
  ...DEFAULT_GROUPS,
};
const ADMIN_ROLE_CONTROL_CONFIG = { scope: ROLE_LEVEL_ADMIN, ...DEFAULT_GROUPS };

export const DEFAULT_ROLES = ROLE_NAMES.reduce(
  (prev, role) => ({ ...prev, [role]: DEFAULT_ROLE_CONTROL_CONFIG }),
  {},
);
export const ADMIN_ROLES = ROLE_NAMES.reduce(
  (prev, role) => ({ ...prev, [role]: ADMIN_ROLE_CONTROL_CONFIG }),
  {},
);
