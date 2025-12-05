import React, { useState, useEffect } from 'react';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';
import {
  Container,
  Title,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  ActionButtons,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
  Label,
  CheckboxLabel,
} from './styles';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    provider: false,
    admin: false,
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (err) {
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        provider: user.provider,
        admin: user.admin,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        provider: false,
        admin: false,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUser) {
        await api.put(`/admin/users/${editingUser.id}`, formData);
        toast.success('Usuário atualizado com sucesso');
      } else {
        await api.post('/admin/users', formData);
        toast.success('Usuário criado com sucesso');
      }
      handleCloseModal();
      loadUsers();
    } catch (err) {
      const errorMessage = err.response && err.response.data && err.response.data.error
        ? err.response.data.error
        : 'Erro ao salvar usuário';
      toast.error(errorMessage);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        toast.success('Usuário deletado com sucesso');
        loadUsers();
      } catch (err) {
        toast.error('Erro ao deletar usuário');
      }
    }
  };

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Title>Gerenciar Usuários</Title>
        <Button onClick={() => handleOpenModal()}>
          <MdAdd size={20} /> Novo Usuário
        </Button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Table>
          <TableHeader>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Provider</th>
              <th>Admin</th>
              <th>Ações</th>
            </tr>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.provider ? 'Sim' : 'Não'}</td>
                <td>{user.admin ? 'Sim' : 'Não'}</td>
                <td>
                  <ActionButtons>
                    <button onClick={() => handleOpenModal(user)} title="Editar">
                      <MdEdit size={18} />
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)} title="Deletar">
                      <MdDelete size={18} />
                    </button>
                  </ActionButtons>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {showModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h2>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</h2>
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <div>
                  <Label>Nome</Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {!editingUser && (
                  <div>
                    <Label>Senha</Label>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

                <div style={{ marginTop: '15px' }}>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      name="provider"
                      checked={formData.provider}
                      onChange={handleInputChange}
                    />
                    Barbeiro (Provider)
                  </CheckboxLabel>
                </div>

                <div>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      name="admin"
                      checked={formData.admin}
                      onChange={handleInputChange}
                    />
                    Administrador
                  </CheckboxLabel>
                </div>

                <ModalFooter>
                  <button type="button" onClick={handleCloseModal}>
                    Cancelar
                  </button>
                  <button type="submit">
                    {editingUser ? 'Atualizar' : 'Criar'}
                  </button>
                </ModalFooter>
              </Form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}
