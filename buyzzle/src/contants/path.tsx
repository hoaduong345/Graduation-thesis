const path = {
  home: "/",
  register: "/register",
  login: "/login",
  forgotpassword: "/forgotpassword",
  resetpassword: "/buyzzle/auth/resetpassword/:token",
  confirmAccount: "buyzzle/auth/:id/verify/:token",
  // userManager: "/buyzzle/auth/usermanager"
} as const;
export default path;
