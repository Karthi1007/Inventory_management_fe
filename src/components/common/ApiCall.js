const createRequest = async (
  url,
  data = null,
  method = "GET",
  headers = {}
) => {
  try {
    const token = localStorage.getItem("token");

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",

        ...(token && {
          Authorization: `Bearer ${token}`,
        }),

        ...headers,
      },
    };

    if (data && method !== "GET") {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    const result = await response.json();

    if (!response.ok) {
      throw {
        statusCode: response.status,
        ...result,
      };
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const Get = (url, data, headers) =>
  createRequest(url, data, "GET", headers);

export const Post = (url, data, headers) =>
  createRequest(url, data, "POST", headers);

export const Put = (url, data, headers) =>
  createRequest(url, data, "PUT", headers);

export const Delete = (url, data, headers) =>
  createRequest(url, data, "DELETE", headers);