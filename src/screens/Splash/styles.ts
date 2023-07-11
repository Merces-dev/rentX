import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 100%;
    flex: 1;

    background-color: ${({ theme }) => theme.colors.header};

    justify-content: center;
    align-items: center;
`