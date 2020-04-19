const HOME = process.env.NVM_HOME;
const NVM_VERSION = process.env.NVM_VERSION;

module.exports = {
  apps: [
    {
      name: 'meeting-system',
      script: 'dist/server.js',
      interpreter: `${HOME}/.nvm/versions/node/v${NVM_VERSION}/bin/node`,
      env: {
        NODE_ENV: 'production',
        PORT: '4600'
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: '4600',
      },
    },
  ],
};
