module.exports = {
  apps: [
    {
      name: "bodo",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env_production: {
        NODE_ENV: "production",
      },
      max_memory_restart: "512M",
      autorestart: true,
      restart_delay: 5000,
    },
  ],
}
