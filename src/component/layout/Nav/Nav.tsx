import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../../styles/Font';
import { ReactComponent as Logo } from '../../../assets/icon/SmallLogo.svg';
import DropDown from './DropDown';
import { SignUpButton, SignInButton, LanguageButton } from './Button';
import { toast, ToastContainer } from 'react-toastify';

const Nav: React.FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>('');

  const token = localStorage.getItem('token');
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const changeLanguage = () => {
    toast('열심히 개발중인 기능입니다!', {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: true,
      pauseOnHover: false,
      progress: undefined,
      className: 'custom-toast'
    });
  };
  return (
    <NavBarContainer style={FONT.M3}>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <NavBar>
        <NavLink
          to={token ? '/home' : '/login'}
          style={activeLink === '/home' ? { color: '#437df6' } : {}}
        >
          홈
        </NavLink>
        <NavLink
          to={token ? '/mypage' : '/login'}
          style={activeLink === '/mypage' ? { color: '#437df6' } : {}}
        >
          마이페이지
        </NavLink>
        <NavLink
          to={token ? '/friend' : '/login'}
          style={activeLink === '/friend' ? { color: '#437df6' } : {}}
        >
          친구
        </NavLink>
        <NavLink
          to={token ? '/lank' : '/login'}
          style={activeLink === '/lank' ? { color: '#437df6' } : {}}
        >
          더보기
        </NavLink>
      </NavBar>
      <LanguageButtonContainer onClick={() => changeLanguage()}>
        <LanguageButton />
      </LanguageButtonContainer>
      {!token ? (
        <ButtonContainer1>
          <SignUpButton />
          <ButtonSpacer />
          <SignInButton />
        </ButtonContainer1>
      ) : (
        <DropDownContainer>
          <DropDown />
        </DropDownContainer>
      )}
      <ToastContainer />
    </NavBarContainer>
  );
};

export default Nav;

const LogoContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  margin-left: 5.5rem;
  display: flex;
  justify-content: center;
`;

const NavBarContainer = styled.div`
  padding: 1rem;
  background-color: #f3f6fc;
  display: flex;
  justify-content: space-between;
`;

const NavBar = styled.div`
  max-width: 800px;
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 4rem;
  flex: 1;
  margin-left: 5rem;
  padding: 0 6rem;
  display: flex;
  justify-content: space-between;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.Black_Main};
  width: fit-content;
  padding-right: min(5rem, 10px);
`;

const DropDownContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  margin-right: 5.5rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const ButtonContainer1 = styled.div`
  margin-right: 5.5rem;
  display: flex;
  align-items: center;
`;

const ButtonSpacer = styled.div`
  margin-right: 0.5rem;
`;
const LanguageButtonContainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
