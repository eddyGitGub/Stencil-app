import { observable, runInAction, decorate } from "mobx";
import AuthService from "./authService";

class AuthStore {
  authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  authData = {
      userinfo:{}
  };
  status = "initial";
  searchQuery = "";

  registerUserAsync = async (model) => {
    try {
      const response = await this.authService.register(model);
      console.log(response)
      if (response.userStatus === "ENABLED") {
        runInAction(() => {
          this.status = "success";
          this.authData.userinfo = response;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
  loginUserAsync = async (model) => {
    try {
      const response = await this.authService.login(model);
      if (response.userStatus === "ENABLED") {
        runInAction(() => {
          this.status = "success";
          this.authData.userinfo = response;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
 
}

decorate(AuthStore, {
  authData: observable,
  searchQuery: observable,
  status: observable,
});

export default new AuthStore();
