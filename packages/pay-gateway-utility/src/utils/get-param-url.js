export const getParamUrl = (uri) => {
  const query = {};
  uri.replace(/([^?=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    query[$1] = $3;
  });
  return query;
};
