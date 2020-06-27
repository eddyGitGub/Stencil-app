import { standardReq } from "./utils";


class AuthService {

  register = async (model: any) => {
    const response = await standardReq({
      path: "users/register",
      body: JSON.stringify(model),
      method: "POST",
    });
   
    return response;
  
  };
  login = async (model: any) => {
    const response = await standardReq({
      path: "users/login",
      body: JSON.stringify(model),
      method: "POST",
    });
   
    return response;
  };
}
export default AuthService;
