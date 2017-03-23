import { WherehaveibeenPage } from './app.po';

describe('wherehaveibeen App', function() {
  let page: WherehaveibeenPage;

  beforeEach(() => {
    page = new WherehaveibeenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
