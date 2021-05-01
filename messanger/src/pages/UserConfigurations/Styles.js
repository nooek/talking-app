import styled from "styled-components"
import { Button } from "@material-ui/core"

export const Container = styled.div`
    width: 100%;
    height: 100%;
`

export const Category = styled.h2`
    color: white;
    font-size: 23px;
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
`

export const InputImage = styled.input`
    width: 200px;
    height: 200px;
    margin-bottom: 0;
`

export const PreviewImageDiv = styled.div`
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    margin-top: 0px;    
`

export const PreviewImage = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
`

export const UploadImageButton = styled(Button)`
    width: 200px;
    height: 50px;
    text-transform: none;
`
