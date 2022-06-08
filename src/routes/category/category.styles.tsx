import styled from 'styled-components';

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;
    @media only screen and (max-width: 800px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-grap: 15px;
      }
`;
export const Title = styled.h2`
    font-size: 20px;
    margin-bottom: 25px;
    cursor: pointer;
`;
