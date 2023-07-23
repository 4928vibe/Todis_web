import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as GoBack } from '../../assets/icon/GoBack.svg';
import { ReactComponent as Search } from '../../assets/icon/Search.svg';
import FriendSearchComponent from './FriendSearchComponent';

const FriendSearch = () => {
  // 친구 검색 모달창 닫기
  const [modal, setmodal] = useState<boolean>(false);
  const closeModal = () => {
    setmodal(!modal);
  };
  if (modal === true) {
    return null;
  }

  return (
    <Container className='container'>
      <Box>
        <SearchBox>
          <FriendSearchBox style={FONT.M2} />
          <SearchInput
            style={FONT.L3}
            placeholder='친구 검색...'
            color='${(props) => props.theme.Gray_02}'
          />
          <span id='search'>
            <Search />
          </span>
          <span id='goBack' onClick={closeModal}>
            <GoBack />
          </span>
        </SearchBox>
        <span id='friends' style={FONT.M3}>
          전체 친구 : 00명
        </span>
        <ListBox>
          <FriendSearchComponent name='김우진' />
          <FriendSearchComponent name='이민하' />
          <FriendSearchComponent name='강민경' />
          <FriendSearchComponent name='우소정' />
          <FriendSearchComponent name='이민하' />
          <FriendSearchComponent name='김우진' />
          <FriendSearchComponent name='이민하' />
          <FriendSearchComponent name='강민경' />
          <FriendSearchComponent name='우소정' />
          <FriendSearchComponent name='이민하' />
        </ListBox>
      </Box>
    </Container>
  );
};
export default FriendSearch;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  border: none;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1;
`;
const Box = styled.div`
  background-color: #fff;
  width: 683px;
  height: 589px;
  border-radius: 47px;
  border: none;
  justify-content: center;
  text-align: center;
  padding: 30px 40px;
  z-index: 999;
  position: relative;
  #search {
    position: absolute;
    top: 58px;
    left: 153px;
  }
  #goBack {
    cursor: pointer;
    position: absolute;
    top: 55px;
    left: 45px;
  }
  #friends {
    color: ${(props) => props.theme.Blue_Main};
    position: absolute;
    top: 105px;
    left: 461px;
  }
`;
const FriendSearchBox = styled.div`
  width: 456px;
  height: 46px;
  border: none;
  border-radius: 49px;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  position: absolute;
  top: 45px;
  left: 113px;
  text-align: left;
  &:focus {
    outline: 3px solid ${(props) => props.theme.Blue_Main};
  }
`;
const SearchInput = styled.input`
  width: 350px;
  height: 25px;
  border: none;
  border-radius: 49px;
  background-color: ${(props) => props.theme.Sky_Blue_04};
  position: absolute;
  top: 58px;
  left: 185px;
  text-align: left;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.theme.Gray_02};
  }
`;
const SearchBox = styled.div``;
const ListBox = styled.div`
  width: 437px;
  height: 412px;
  position: absolute;
  top: 141px;
  left: 123px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    //display: none;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: hsla(0, 0%, 42%, 0.49);
    border-radius: 100px;
  }
`;
