import { GroclistPage } from './app.po';

describe('groclist App', () => {
  let page: GroclistPage;

  beforeEach(() => {
    page = new GroclistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
