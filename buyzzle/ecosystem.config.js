module.exports = {
    apps: [
      {
        name: "vite-react-app",
        script: "yarn",
        args: "dev", 
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
  