module.exports = {
    apps: [
      {
        name: "your-node-app",
        script: "nodemon",
        args: "--inspect ./index.js",
        watch: true,
        ignore_watch: ["node_modules"],
        instances: 1,
        exec_mode: "fork",
        env: {
          NODE_ENV: "development",
        },
      },
    ],
  };