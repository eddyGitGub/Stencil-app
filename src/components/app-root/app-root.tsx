import { Component, h, State } from "@stencil/core";

import { getUser, IUser } from "../../api/auth";
import { IAPIErrors } from "../../api/utils";
import AuthStore from "../../api/authStore";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css",
  shadow: true,
})
export class AppRoot {
  @State() user: IUser;
  @State() errors?: IAPIErrors;

  setUser = (user: IUser) => {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  };

  signOut = () => {
    localStorage.removeItem("user");
    this.user = undefined;
  };

  getUser = async () => {
    const userInfo = AuthStore.authData.userinfo as IUser;
    if (userInfo.userStatus === "ENABLED") {
      this.user = userInfo;
      localStorage.setItem("user", JSON.stringify(userInfo));
    } else {
      //this.errors = ;
      this.signOut();
    }
  };

  componentWillLoad() {
    const user = localStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  // To make sure we have the user's latest info, we fetch their profile
  // when the app loads
  async componentDidLoad() {
    if (this.user && this.user.nickname) {
      this.getUser();
    }
  }

  render() {
    const { user } = this;
    const isLogged = user && user.nickname ? true : false;
    return (
      <div>
        <header>
          <h1>Stencil App with routing, image lazy loading</h1>
          <p>Admin login/registration is implemented with mobx,</p>
          <p> &nbsp; Could not implement loading bar</p>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/lazy-loading" component="lazy-loading" />
              <stencil-route
                url="/profile/:username"
                component="app-profile"
                exact={true}
                componentProps={{ user }}
              />
              <stencil-route
                url={["/login", "/register"]}
                component={isLogged ? "not-found" : "auth-page"}
                componentProps={{ setUser: this.setUser }}
                exact={true}
              />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
