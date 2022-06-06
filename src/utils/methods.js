const baseURL = "https://629c9e2e3798759975d88b54.mockapi.io/";

const callApi = async (endpoint, method, body) => {
  const res = await fetch(`${baseURL}${endpoint}`, {
    body: JSON.stringify(body),
    method: method,
  });

  return res;
};

callApi("user", "GET");

export default callApi;
