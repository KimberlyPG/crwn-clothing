import styled from 'styled-components'

export const AuthenticationContainer = styled.div`
    display: flex;
    width: 900px;
    justify-content: space-between;
    margin: 30px auto;

  @media only screen and (max-width: 800px) {
    display: grid;
    grid-grap: 15px;
    row-gap: 50px;
  }
`
