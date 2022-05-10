import { Category } from "../model";

const postCategory = async (user_email, category_name) => {
  try {
    await Category.post(user_email, category_name);
  } catch(err) {
    throw ({
      code: 500,
      msg: 'DB upload error'
    });
  }
};

export default postCategory;