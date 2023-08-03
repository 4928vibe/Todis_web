import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import ModalContainer from './modal/ModalContainer';
import useOutSideClick from './modal/useOutSideClick';

interface ModalProps {
  name: string;
  open: boolean;
  onClose: () => void;
}

const FriendDelete = ({ name, onClose }: ModalProps) => {
  // 친구 삭제 모달창 닫기
  const handleClose = () => {
    onClose?.();
  };

  // 모달창 외부 클릭시 닫기
  const modalRef = useRef<HTMLDivElement>(null);
  useOutSideClick(modalRef, handleClose);

  return (
    <Container className='container'>
      <Box ref={modalRef}>
        <Profile></Profile>
        <Name style={FONT.M2}>
          <span>{name}</span>님을
        </Name>
        <Message style={FONT.M2}>친구 목록에서 삭제하시겠습니까?</Message>
        <Cancel style={FONT.L4} onClick={handleClose}>
          취소
        </Cancel>
        <Delete style={FONT.L4}>삭제</Delete>
      </Box>
    </Container>
  );
};
export default FriendDelete;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); /*까만색(0,0,0) 20% 불투명도*/
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
  width: 362px;
  height: 225px;
  background-color: ${(props) => props.theme.Sky_Blue_03};
  border-radius: 47px;
  border: 1px solid black;
  position: relative;
  border: none;
  justify-content: center;
  text-align: center;
  z-index: 999;
`;
const Profile = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.theme.BlueBray_01};
  border-radius: 50%;
  border: 1px solid black;
  position: absolute;
  top: -52.5px;
  left: 128.5px;
  border: none;
`;
const Name = styled.div`
  margin-top: 70px;
  span {
    color: ${(props) => props.theme.Blue_Main};
  }
`;
const Message = styled.div`
  margin-bottom: 30px;
`;
const Cancel = styled.button`
  width: 137px;
  height: 37px;
  border-radius: 14px;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.Blue_Main};
  color: ${(props) => props.theme.Blue_Main};
  cursor: pointer;
  margin-right: 5px;
`;
const Delete = styled.button`
  width: 137px;
  height: 37px;
  background-color: ${(props) => props.theme.Blue_Main};
  border-radius: 14px;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-left: 5px;
`;
