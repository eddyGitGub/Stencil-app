import { Component, Prop, h, State, Watch } from "@stencil/core";
import {
  IUser,
} from "../../api/auth";
import AuthStore from "../../api/authStore";
import { IAPIErrors } from "../../api/utils";
import { MatchResults } from "@stencil/router";
import { RouterHistory } from "@stencil/router";

@Component({
  tag: "auth-page",
  styleUrl: "auth-page.css",
})
export class AuthPage {
  @Prop() setUser: (user: IUser) => void;
  @Prop() match: MatchResults;

  @State() displayName: string;
  @State() email: string;
  @State() password: string;
  @State() disabled: boolean = false;
  @State() errors?: IAPIErrors;
  @Prop() history: RouterHistory;

  changeUserState = async (res: IUser) => {
    if (res) {
      this.setUser(res);
      this.history.replace("/");
    } else {
      console.log('error')
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.disabled = true;
    const isRegister = this.match.url.match(/\/register/i);
    const { displayName, email, password } = this;

    if (!email || !password || (!displayName && isRegister)) {
      return;
    }
    if (isRegister) {
      let nickname = email.split("@")[0];
      let name = displayName;
      // const res = await registerUser({
      //   email,
      //   password,
      //   nickname,
      //   name,
      // });
      await AuthStore.registerUserAsync({
        email,
        password,
        nickname,
        name,
      })

    } else {
      let login = email.split("@")[0];
      await AuthStore.loginUserAsync({ login, password })
    
    }
    const userInfo = AuthStore.authData.userinfo  as IUser;
    const status = AuthStore.status;
    console.log('status',status);
   if(status === 'success'){
    this.changeUserState(userInfo);
   }
    this.disabled = false;
  };

  handleChange = (e) => {
    const name = e.target.getAttribute("data-auth-id");
    const value = e.target.value;
    if (name && value) {
      this[name] = value;
    }
  };

  setPageTitle = () => {
    const isRegister = this.match.url.match(/\/register/i);
    document.title = `${isRegister ? "Sign Up" : "Sign In"} - Stencil App`;
  };

  @Watch("match")
  updateTitle() {
    this.setPageTitle();
  }

  componentDidLoad() {
    this.setPageTitle();
  }

  render() {
    const isRegister = this.match.url.match(/\/register/i);
    const title = `Sign ${isRegister ? "up" : "in"}`;
    return (
      <main class="app-auth">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">{title}</h1>
              <p class="text-xs-center">
                <stencil-route-link url={isRegister ? "/login" : "/register"}>
                  {isRegister ? "Have an account?" : "Need an account?"}
                </stencil-route-link>
              </p>

              <error-display errors={this.errors} />

              <form onSubmit={this.handleSubmit}>
                {isRegister && (
                  <fieldset class="form-group" disabled={this.disabled}>
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      placeholder="Your Username"
                      value={this.displayName}
                      onInput={this.handleChange}
                      data-auth-id="displayName"
                      required={true}
                    />
                  </fieldset>
                )}
                <fieldset class="form-group" disabled={this.disabled}>
                  <input
                    class="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={this.email}
                    onInput={this.handleChange}
                    data-auth-id="email"
                    required={true}
                  />
                </fieldset>
                <fieldset class="form-group" disabled={this.disabled}>
                  <input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={this.password}
                    onInput={this.handleChange}
                    data-auth-id="password"
                    required={true}
                  />
                </fieldset>
                <button
                  class="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={this.disabled}
                >
                  {title}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
