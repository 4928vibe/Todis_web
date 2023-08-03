import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SmallLogo } from '../assets/icon/SmallLogo.svg';
import Input from '../component/common/InputComponent';
import SocialGoogle from '../component/login/SocialGoogle';
import SocialKakao from '../component/login/SocialKakao';
import FONT from '../styles/Font';
import { ReactComponent as SmallUnCheck } from '../assets/icon/SmallUnCheck.svg';
import { ReactComponent as SmallCheck } from '../assets/icon/SmallCheck.svg';
import { LoginProps } from '../types/User';
import AuthContainer from '../component/login/AuthContainer';

const LoginPage = () => <AuthContainer title='로그인' component={<Login />} />;

export default LoginPage;

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [memory, setMemory] = useState<boolean>(false);
  const [login, setLogin] = useState<LoginProps>({
    email: '',
    password: ''
  });
  // 컴포넌트가 마운트될 때 로컬스토리지의 값으로 초기화
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);
  const handleLoginBtn = () => {
    if (memory) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    }
    setLogin({ email: email, password: password });
    console.log(login);
  };
  return (
    <>
      <Input
        label='이메일'
        type='email'
        placeholder='이메일 주소 입력'
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <div style={{ height: 15 }} />
      <Input
        label='비밀번호'
        type='password'
        placeholder='비밀번호 입력'
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <Button onClick={() => handleLoginBtn()}>로그인</Button>
      <Setting>
        <div style={FONT.L6} onClick={() => setMemory(!memory)}>
          {memory ? <SmallCheck /> : <SmallUnCheck />}
          로그인 정보 기억하기
        </div>
        <div style={FONT.L6}>비밀번호 찾기</div>
      </Setting>
      <SocialGoogle />
      <SocialKakao />
      <SignUp style={FONT.L6}>
        계정이 없으신가요?
        <a href='/signup'> 회원가입</a>
      </SignUp>
    </>
  );
};

const SignUp = styled.div`
  margin-top: 22px;
  color: ${(props) => props.theme.Typo_Black};
  a {
    color: ${(props) => props.theme.Blue_Main};
  }
`;
const Setting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 38px;
  div {
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${(props) => props.theme.Gray_01};
    span {
      color: ${(props) => props.theme.Gray_01};
      margin-left: 10px;
    }
  }
`;
const Button = styled.button`
  width: 100%;
  height: 55px;
  margin-top: 58px;
  border: none;
  border-radius: 14px;
  background-color: ${(props) => props.theme.Blue_Main};
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;
