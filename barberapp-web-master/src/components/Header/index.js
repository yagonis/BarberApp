import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Notification from '~/components/Notifications';

import logo from '~/assets/logo-small.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  function handleWip(label) {
    return e => {
      e.preventDefault();
      toast.info(`${label}: Estamos trabalhando nisso`);
    };
  }

  //fazer um toast para quando clicar em histórico e planos

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
          <a href="#" onClick={handleWip('Histórico')}>HISTÓRICO</a>
          <a href="#" onClick={handleWip('Planos')}>PLANOS</a>
        </nav>

        <aside>
          {/* <Notification /> */}

          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                (profile.avatar && profile.avatar.url) ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'User')}&background=699aee&color=fff&bold=true&size=250`
              }
              alt={profile.name || 'Usuário'}
              onError={e => {
                e.target.onerror = null;
                e.target.src = 'https://ui-avatars.com/api/?name=User&background=699aee&color=fff&bold=true&size=250';
              }}
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
