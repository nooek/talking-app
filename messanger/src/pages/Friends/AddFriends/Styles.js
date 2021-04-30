import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

export const FindFriend = styled.h2`
    font-size: 38px;
    color: white;
    margin-top: 50px;
`

export const SearchBar = styled.input`
    width: 90%;
    height: 70px;
    font-size: 18px;
    color: black;
    border-radius: 25px;
    border: none;
    :focus{
        outline: none;
    }
`

export const PeopleList = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 50px;
`

export const PersonContainer = styled.div`
    width: 100%;
    height: 60px;
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    position: relative;
    margin-top: 10px;
`

export const PersonName = styled.h2`
    font-size: 20px;
    color: white;
    margin-left: 20px;
`

export const PersonPfp = styled.img`
    width: auto;
    height: 100%;
    border-right: 1px solid black;
`

export const AddFriendContainer = styled.div`
    position: absolute;
    right: 2px;
    height: 100%;
    width: auto;
`

export const AddFriendButton = styled.button`
    width: 40px;
    height: 100%;
    border: none;
    :focus{
        outline: none;
    }
`