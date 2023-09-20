const path = {
  home: "/",
  register: "/register",
  login: "/login",
  forgotpassword: "/forgotpassword",
  changepassword: "/buyzzle/auth/resetpassword/:token",
  confirmAccount: "buyzzle/auth/:id/verify/:token",
  
} as const;
export default path;
