module.exports = {
  apps: [
    {
      name: "restaurant-admin",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        PORT: 5001
      }
    }
  ]
}