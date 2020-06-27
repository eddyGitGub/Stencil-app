import { Component, h } from "@stencil/core";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <p>Here i implement image lazing loading and a login page</p>

        <stencil-route-link url="/lazy-loading" activeClass="link-active">
          <button>Image Lazy Loading</button>
        </stencil-route-link>
        <stencil-route-link url="/login" activeClass="link-active">
          <button>Admin Login/Register</button>
        </stencil-route-link>
      </div>
    );
  }
}
