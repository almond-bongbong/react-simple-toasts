const fs = require('fs');
const path = require('path');

const config = ({ env }) => {
  const isThemeEnv = env === 'theme';

  if (!isThemeEnv) return {};

  return {
    map: false,
    plugins: [
      require('postcss-modules')({
        getJSON: (cssFileName, json) => {
          const path = require('path');
          const jsonFileName = path.resolve('./src/theme/themes.json');
          const savedJsonFile = fs.existsSync(jsonFileName)
            ? fs.readFileSync(jsonFileName, 'utf8')
            : null;
          const savedJson = JSON.parse(savedJsonFile);
          const newJson = {
            ...savedJson,
            ...json,
          };
          fs.writeFileSync(jsonFileName, JSON.stringify(newJson));
        },
      }),
    ],
  };
};

module.exports = config;
