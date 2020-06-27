export const endpoint =
  "https://api.backendless.com/0B2760A2-4756-05F0-FF90-DE690D1CE900/181F09BB-3566-4919-9864-B19C7571B9D2";

export interface IAPIErrors {
  [key: string]: string[];
}

export interface IBaseAPIReq {
  errors?: IAPIErrors;
}

export interface IStandardReq {
  path: string;
  method: "GET" | "PUT" | "POST" | "DELETE";
  body?: string;
  token?: string;
}

export const standardReq = async ({
  path,
  method,
  body,
  token,
}: IStandardReq) => {
  const reqPath = `${endpoint}/${path}`;
  let headers: { [key: string]: string } = {
    "content-type": "application/json",
  };
  if (token) {
    headers = { ...headers, authorization: `Token ${token}` };
  }
  try {
    const req = await fetch(reqPath, {
      credentials: "omit",
      headers,
      method,
      body,
      mode: "cors",
    });
    const data = await req.json();
    return data;
  } catch (errors) {
    console.error(errors);
    return { errors };
  }
};
