import { Category } from '../models';

export default function getCategoriesIds(categories: Category[]) {
  const ids: string[] = [];

  function getIds(category: Category) {
    ids.push(category.id);
    if (category.children && category.children.length > 0) {
      category.children.forEach((child) => {
        getIds(child);
      });
    }
  }
  categories.forEach((category) => {
    getIds(category);
  });

  return ids;
}
