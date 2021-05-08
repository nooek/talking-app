import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    height: 100%;
`

export const Category = styled.h2`
    color: white;
    font-size: 23px;
    margin-left: 10px;
`

export const PrivacyOptionsContainer = styled.div`
    width: 500px;
    height: 400px;
    border: 2px solid white;
    border-radius: 10px;
    box-shadow: 5px 5px 5px rgb(0, 0, 0); 
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 20px;
`

export const PrivacyOption = styled.h2`
    color: white;
    font-size: 20px;
    margin-left: 10px;
`

export const BlocksList = styled.div`
    width: 500px;
    height: 650px;
    color: white;
    border: 2px solid white;
    border-radius: 10px;
    box-shadow: 5px 5px 5px rgb(0, 0, 0);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-x: auto;
    margin-left: 20px;
`
