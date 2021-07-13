import styled from 'styled-components'

export const MainGrid = styled.main`
  width: 100%;
  max-width: 500px;

  gap: 10px;
  padding: 16px;
  margin: 0 auto;

  .profileArea {
    display: none;

    @media(min-width: 860px) {
      display: block;
    }
  }

  @media(min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-columns: 160px 1fr 312px;
  }
`;