import { postCategory } from '../controller';
import { Category } from '../model';

describe('Category Test ', () => {
  const user_email = 'seo2im6492@gmail.com';
  const category_name = 'test category';

  test('Post Cateogory', async () => {
    Category.post = jest.fn().mockReturnValue(null);
    await postCategory(user_email, category_name);
  });
})