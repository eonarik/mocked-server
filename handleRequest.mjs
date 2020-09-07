import fs from 'fs';
import path from 'path';

const MOCKS_FOLDER = './__mocks__';

export default function (request, response) {
  const {
    method,
    _parsedUrl: {
      pathname: url,
    },
    params,
    query,
  } = request;

  console.log(method, url, params);

  let filePath = url;
  if (Object.keys(params).length) {
    for (let key in params) {
      filePath = filePath.replace(new RegExp(params[key], 'g'), `:${key}`);
    }
  }
  const jsonFile = path.join(filePath, method + '.json');
  const jsFile = path.join(filePath, method + '.mjs');

  fs.access(jsonFile, async function (error) {
    try {
      const isJSON = Boolean(error);
      const { default: processor } = await import(MOCKS_FOLDER + (isJSON ? jsonFile : jsFile));
      const result = (
        typeof processor === 'function'
          ? await processor(request, response)
          : processor
      );
      if (result !== undefined) {
        return isJSON
          ? response.status(result.code === 'ok' ? 200 : 400).json(result)
          : result;
      }
    } catch (err) {
      console.error(err);
      return response.status(500);
    }
  });
}
