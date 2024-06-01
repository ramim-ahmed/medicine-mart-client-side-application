const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
export const passwordValidator = (password) => {
  return passwordRegex.test(password);
};
