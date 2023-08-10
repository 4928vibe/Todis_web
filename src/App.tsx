import React from 'react';
import Login from './pages/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Friend from './pages/Friend';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './component/common/Nav/Nav';
import NavLogin from './component/common/Nav/NavLogin';
import SignUpBeforePage from './pages/signup/SignUpBefore';
import SignUpEmailPage from './pages/signup/SignUpEmail';
import Footer from './component/common/Footer/Footer';
import TermsPage from './component/common/Footer/TermsPage';
import SignUpInfoPage from './pages/signup/SignUpInfo';
import SignUpAfterPage from './pages/signup/SignUpAfter';
import EditProfilePage from './pages/user/EditProfile';
import PasswordResetPage from './pages/password/PasswordReset';
import PasswordSearchPage from './pages/password/PasswordSearch';
import FriendInvite from './pages/FriendInvite';
import WithdrawalPage from './pages/Withdrawal';

function App() {
  const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // client_id가 설정되어 있는지 확인
  if (!client_id) {
    console.error(
      'Google Client ID가 설정되지 않았습니다. .env 파일에 REACT_APP_GOOGLE_CLIENT_ID를 설정하세요.'
    );
    return null;
  }
  const noLayout =
    window.location.pathname === '/login' ||
    window.location.pathname.startsWith('/signup') ||
    window.location.pathname.startsWith('/user') ||
    window.location.pathname === '/friend/invite';

  return (
    <>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={client_id}>
          <div className='App'>
            {!noLayout && <Nav />}
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUpBeforePage />} />
              <Route path='/signup/email' element={<SignUpEmailPage />} />
              <Route path='/signup/info' element={<SignUpInfoPage />} />
              <Route path='/signup/complete' element={<SignUpAfterPage />} />
              <Route path='/user/edit' element={<EditProfilePage />} />
              <Route path='/friend' element={<Friend />} />
              <Route path='/friend/invite' element={<FriendInvite />} />
              <Route
                path='/user/edit/password'
                element={<PasswordResetPage />}
              />
              <Route path='/login/password' element={<PasswordSearchPage />} />
              <Route path='/user/delete' element={<WithdrawalPage />} />
              <Route path='/terms/:id' Component={TermsPage} />
            </Routes>
            {!noLayout && <Footer />}
          </div>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
