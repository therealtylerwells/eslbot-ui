module.exports = {
  apps : [{
    name      : 'ui',
    script    : 'npm start',
    env: {
      NODE_ENV: 'production'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }],
};
