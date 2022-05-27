import styled from 'styled-components';

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;
`;
export const Title = styled.h2`
    font-size: 20px;
    margin-bottom: 25px;
    cursor: pointer;
`;
// .category-container {
//     display: grid;
//     grid-template-columns: repeat(4, 1fr);
//     column-gap: 20px;
//     row-gap: 50px;

//     .title{
//         font-size: 20px;
//         margin-bottom: 25px;
//         cursor: pointer;
//     }
// }
