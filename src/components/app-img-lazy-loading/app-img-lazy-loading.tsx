import { Component, Element, Prop, h } from "@stencil/core";

@Component({
  tag: "lazy-loading",
  styleUrl: "app-img-lazy-loading.css",
  shadow: true,
})
export class AppImgLazyLoading {
  @Element() el: HTMLElement;

  @Prop() imgSrc: string;
  private observer: IntersectionObserver;
  componentDidLoad() {
    const img: HTMLImageElement = this.el.shadowRoot.querySelector("img");

    if (img) {
      this.observer = new IntersectionObserver(this.onIntersection);
      this.observer.observe(img);
    }
  }

  private onIntersection = async (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (this.observer) {
          this.observer.disconnect();
        }

        if (entry.target.getAttribute("data-src")) {
          entry.target.setAttribute(
            "src",
            entry.target.getAttribute("data-src")
          );
          entry.target.removeAttribute("data-src");
        }
      }
    }
  };

  render() {
    return (
      <div>
        <lazyloading-img img-src="https://madeby.google.com/static/images/google_g_logo.svg"></lazyloading-img>
        <lazyloading-img img-src="https://images.unsplash.com/photo-1481887328591-3e277f9473dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1060&q=80g"></lazyloading-img>
        <lazyloading-img img-src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"></lazyloading-img>
      </div>
    );
  }
}
