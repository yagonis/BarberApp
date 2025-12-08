import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { useSelector } from 'react-redux';
import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');
  const profile = useSelector(state => state.user.profile);

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview || `https://ui-avatars.com/api/?name=${encodeURIComponent((profile && profile.name) || 'User')}&background=699aee&color=fff&bold=true&size=250`
          }
          alt={(profile && profile.name) || 'Usuário'}
          onError={e => {
            e.target.onerror = null;
            e.target.src = 'https://ui-avatars.com/api/?name=User&background=699aee&color=fff&bold=true&size=250';
          }}
        />
        <span className="caption">Alterar imagem</span>

        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleChange}
          data-file={file}
        />
      </label>
    </Container>
  );
}
