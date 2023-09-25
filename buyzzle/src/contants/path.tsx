const path = {
  home: "/",
  register: "/register",
  login: "/login",
  forgotpassword: "/forgotpassword",
  resetpassword: "/buyzzle/auth/resetpassword/:token",
  confirmAccount: "buyzzle/auth/:id/verify/:token",
  changepassword: "/changepassword",
} as const;
export default path;
