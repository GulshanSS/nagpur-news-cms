import config from "../config";

export const generatePassword = () => {
  let password = "";
  const characters = config.CHARACTERS;
  const length = config.PASSWORD_LENGTH;
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
};
