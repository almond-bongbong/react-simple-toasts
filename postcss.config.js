const config = ({ env }) => {
  const isThemeEnv = env === 'theme';

  if (!isThemeEnv) return {};

  return {
    map: false,
  };
};

module.exports = config;
