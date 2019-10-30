import { stringContainsSpace } from "./misc";

import { MESSAGE_ERROR_CONFLICT_USERNAME, MESSAGE_ERROR_CONFLICT_EMAIL } from "../constants/messages";

export const usernameValidator = (username) => {
  let error;

  const containsSpace = stringContainsSpace(username);
  const isGreaterThanOrEqualMinLength = username.length > 3;
  const isLessOrEqualThanMaxLength = username.length < 21;

  if(containsSpace) {
    error = "Username cannot have spaces";
  } else if(!isLessOrEqualThanMaxLength) {
    error = "Username has to be at least 4 characters long";
  } else if(!isGreaterThanOrEqualMinLength) {
    error = "Username has to be no more than 20 characters long";
  }

  return { valid: !error, error };
};

export const emailValidator = (email) => {
  let error;

  // https://www.regular-expressions.info/email.html
  const isValidFormatRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if(!isValidFormatRegex.test(email)) {
    error = "Invalid email format!";
  }

  return { valid: !error, error };
};

export const passwordValidator = (password) => {
  let error;

  // Symbols by ASCII ranges (http://www.asciitable.com/)
  const isGreaterThanOrEqualMinLength = password.length > 7;
  const isLessOrEqualThanMaxLength = password.length < 26;
  const containsSymbolRegex = /[$-/:-@{-~!"^_`\[\]]/;
  const containsCapitalRegex = /[A-Z]/;


  if(!isLessOrEqualThanMaxLength) {
    error = "Password has to be at least 8 characters long";
  } else if(!isGreaterThanOrEqualMinLength) {
    error = "Password has to be no more than 28 characters long";
  } else if(!containsSymbolRegex.test(password)) {
    error = "Password has to contain at least one symbol";
  } else if(!containsCapitalRegex) {
    error = "Password has to contain at least one capital character";
  }

  return { valid: !error, error };
};

export const existingUsersValidator = (existingUsers, newUsername, newEmail) => {
  let error;

  if(existingUsers.length) {
    existingUsers.forEach(({ username: existingUserUsername, email: existingUserEmail }) => {
      if(existingUserUsername === newUsername) error = { ...error, username: MESSAGE_ERROR_CONFLICT_USERNAME };
      if(existingUserEmail === newEmail) error = { ...error, email: MESSAGE_ERROR_CONFLICT_EMAIL };
    });
  } 

  return { valid: !error, error };
};