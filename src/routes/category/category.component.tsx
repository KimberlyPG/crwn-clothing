import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';
import {CategoryContainer, Title} from './category.styles'

type CategoryRouteParams = {
    category: string;
};

const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect (() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <>
            <Title>{category.toUpperCase()}</Title>
            {isLoading ? (
                <Spinner />
                ) : (
                    <CategoryContainer>
                        {products && //if products is undefined then don't render it
                        products.map((product) => ( //only render products i products is a value
                            <ProductCard  key={product.id} product={product}/>
                        ))}
                    </CategoryContainer>
            )}
        </>
    );
};

export default Category;