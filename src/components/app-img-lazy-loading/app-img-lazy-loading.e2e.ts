import { newE2EPage } from '@stencil/core/testing';

describe('app-img-lazy-loading', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-img-lazy-loading></app-img-lazy-loading>');

    const element = await page.find('app-img-lazy-loading');
    expect(element).toHaveClass('hydrated');
  });
});
