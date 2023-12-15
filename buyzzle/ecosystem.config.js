module.exports = {
    apps: [
      {
        name: "vite-react-app",
        script: "npm",
        args: "run dev", 
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
  