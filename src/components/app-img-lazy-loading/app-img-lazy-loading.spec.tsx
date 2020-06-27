import { newSpecPage } from '@stencil/core/testing';
import { AppImgLazyLoading } from './app-img-lazy-loading';

describe('app-img-lazy-loading', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppImgLazyLoading],
      html: `<app-img-lazy-loading></app-img-lazy-loading>`,
    });
    expect(page.root).toEqualHtml(`
      <app-img-lazy-loading>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-img-lazy-loading>
    `);
  });
});
