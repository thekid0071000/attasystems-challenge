const baseUrl = "https://629c9e2e3798759975d88b54.mockapi.io/";

// A function that makes a fetch request to the api. It can be used to GET or POST information to the api, depending on the parameteres that are sent.
const callApi = async (endpoint, method, body) => {
  const res = await fetch(`${baseUrl}${endpoint}`, {
    body: JSON.stringify(body),
    method: method,
  });

  return res;
};

export default callApi;
