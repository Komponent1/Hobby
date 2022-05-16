import { addCategory } from '../controller';
import { Category } from '../model';

describe('post /category', () => {
  Category.get = jest.fn().mockReturnValue([]);
  Category.post = jest.fn().mockReturnValue({ category_id: 'test_id', category_name: 'test_name' });
  const category_name = 'test_category';
  const user = 'test_user';

  describe('controller Test', () => {
    test('Normal Test', async () => {
      const new_category = await addCategory(category_name, user);
      expect(new_category).toHaveProperty('category_id', 'test_id');
    });

    test('Already Category Name', async () => {
      Category.get = jest.fn().mockReturnValue([1]);
      try {
        await addCategory(category_name, user);
      } catch (err) {
        expect(err).toHaveProperty('msg', 'Already category name');
      }
    });
  });

  describe('router Test', () => {

  })
});