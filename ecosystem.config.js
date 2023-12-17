module.exports = {
  apps: [
    {
      name: "server",
      script: "npm",
      args: "start",
      watch: false,
      cwd: "./server",
    },
    {
      name: "client",
      script: "npm",
      args: "run preview",
      watch: ["dist"],
      cwd: "./buyzzle",
    },
  ],
};

//File cua Haidev
