const baseUrl = "https://629c9e2e3798759975d88b54.mockapi.io/";

// A function that makes a fetch request to the api. It can be used to GET or POST information to the api, depending on the parameteres that are sent.
// Also uses the access token for security.
const callApi = async (endpoint, method, body) => {
  const access_token = localStorage.getItem("access_token");
  const res = await fetch(`${baseUrl}${endpoint}`, {
    body: JSON.stringify(body),
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  return res;
};

export default callApi;
