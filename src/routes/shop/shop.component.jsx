import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { fetchCategoriesStartAsync } from '../../store/categories/category.action';

const Shop = () => {
    const dispatch = useDispatch();

    // dispatch that triggers the moment this component mounts
    useEffect(() => {
            dispatch(fetchCategoriesStartAsync());
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path=":category" element={<Category />} />        
        </Routes>
    );
};

export default Shop;