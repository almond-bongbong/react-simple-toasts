const fs = require('fs');

const config = ({ env }) => {
  const isThemeEnv = env === 'theme';

  if (!isThemeEnv) return {};

  return {
    map: false,
    plugins: [
      require('postcss-modules')({
        getJSON: (cssFileName, json) => {
          const path = require('path');
          const jsonFile = path.resolve('./src/theme/theme-classnames.json');
          const savedJsonFile = fs.existsSync(jsonFile) ? fs.readFileSync(jsonFile, 'utf8') : null;
          const savedJson = JSON.parse(savedJsonFile);
          const newJson = {
            ...savedJson,
            ...json,
          };
          fs.writeFileSync(jsonFile, JSON.stringify(newJson));
        },
      }),
    ],
  };
};

module.exports = config;
