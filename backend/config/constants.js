
export const DEV_PORT = 3000;
export const SECRET_KEY = "}edr42{sZUhG)-#7v5eDlZWhuR)U{g@aNjoo\Xiav\o`1uGVpncE-Ul";

// export const DATABASE_TEST_KEY;
// export const DATABASE_KEY;

// Router groups - separated by auth or security
export const ROUTE_GROUP_PUBLIC = "/default";
export const ROUTE_GROUP_PRIVATE = "/auth";

// Routes
export const ROUTE_POST_LOGIN = "/login";
export const ROUTE_POST_REGISTER = "/register";

// Passport 
export const PASSPORT_JWT = "jwt";

// ? Unsure if these are required!
export const PASSPORT_REGISTER = "register";
export const PASSPORT_LOGIN = "login";

/**
 * HTTP Error messages
 */
export const ERROR_CREDENTIALS = "Incorrect username or password";
export const ERROR_PASSWORD = "Incorrect password";
export const ERROR_CONFLICT_PARAMS = "One or more params is/are already taken";
export const ERROR_CONFLICT_USERNAME = "Username is already taken";
export const ERROR_CONFLICT_EMAIL = "Email is already taken";
export const ERROR_AUTH_FAIL = "User unauthorized";
export const ERROR_DATABASE = "Unable to access database";
export const ERROR_SYNTAX_PARAMS = "Invalid params syntax";
export const ERROR_AUTH_PROCESS = "Error occured during authentication";

/**
 * HTTP response status codes
 */
//Success codes
export const HTTP_SUCCESS = 200;
//Error codes
export const HTTP_ERROR_SYNTAX = 400;
export const HTTP_ERROR_AUTH_FAIL = 401;
export const HTTP_ERROR_CONFLICT = 409;
export const HTTP_ERROR_DATABASE = 500;