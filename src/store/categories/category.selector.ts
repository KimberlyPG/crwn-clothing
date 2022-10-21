import { createSelector } from 'reselect';
import { RootState } from '../store';
import { CategoriesState } from './category.reducer';
import { CategoryMap } from './category.types';

// Reselect to prevent running the reduce if categories had never changed
const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

export const selectCategories = createSelector(
        [selectCategoryReducer],
        (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
        [selectCategories],
        (categories): CategoryMap => 
        categories.reduce((acc, category) => {
                const { title, items } = category;
                acc[title.toLowerCase()] = items;
                return acc;
                }, {} as CategoryMap)     
);

export const selectCategoriesIsLoading = createSelector(
        [selectCategoryReducer],
        (categoriesSlice) => categoriesSlice.isLoading
);