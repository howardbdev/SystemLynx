module.exports = function loadConnectionData(
  httpClient,
  url,
  { limit = 3, wait = 1000 } = {}
) {
  const errors = [];

  return new Promise(function getData(resolve) {
    httpClient.request({ method: "GET", url }, (err, results) => {
      if (err) {
        errors.push(err);

        if (errors.length < limit)
          setTimeout(() => getData(resolve), errors.length * wait);
        else
          console.error(
            `[SystemLynx][Client][Error]: Failed to load Service @${url} after ${errors.length} attempts.`
          );
      } else resolve(results);
    });
  });
};
