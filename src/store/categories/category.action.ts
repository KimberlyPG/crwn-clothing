import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import { 
    createAction, 
    Action, 
    ActionWithPayload,
    withMatcher 
} from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utills";
import { Dispatch } from "react";

export type FetchCategoriesStart = 
Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>
export type FetchCategoriesSuccess = 
ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>
export type FetchCategoriesFailed = 
ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart =>
createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess =>
createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray));

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed =>
createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));

export const fetchCategoriesStartAsync = () => {
    return async (dispatch: Dispatch<FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed>) => {
        dispatch(fetchCategoriesStart());

        try{
            const categoriesArray = await getCategoriesAndDocuments();
            dispatch(fetchCategoriesSuccess(categoriesArray));
        }catch(error) {
            dispatch(fetchCategoriesFailed(error as Error));
        }
    };
}
