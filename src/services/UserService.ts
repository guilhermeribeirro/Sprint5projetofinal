import axios, { AxiosResponse } from 'axios';
import { Grupo, Grupo2, User, User2 } from '../types/types';

const BASE_URL = 'https://localhost:7217/api/Usuarios/TodosUsuarios';
const apiUrl = 'https://localhost:7217/api/Grupos';
const cadastGrupoApi = 'https://localhost:7217/api/Grupos/AdicionarGrupo';
const apiUrlUsuario = 'https://localhost:7217/api';
const B_URL = 'https://localhost:7217/api';

class UserService {
  constructor() {
    // Se necessário, adicione inicializações aqui
  }

  
  async createGroup(groupData: Grupo2): Promise<boolean> {
    try {
        const formData = new FormData();
        formData.append('nomeGrupo', groupData.nomeGrupo);
        formData.append('participantesMax', groupData.participantesMax.toString());
        formData.append('valor', groupData.valor);
        formData.append('dataRevelacao', groupData.dataRevelacao);
        formData.append('descricao', groupData.descricao);
        formData.append('iD_Administrador', groupData.iD_Administrador.toString());
        formData.append('senhaUsuario', groupData.senhaUsuario);

        if (groupData.foto) {
            const response = await fetch(groupData.foto);
            const blob = await response.blob();
            formData.append('foto', blob, 'photo.jpg');
        }

        const response = await axios.post(cadastGrupoApi, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.status === 200;
    } catch (error) {
        console.error('Erro ao criar grupo:', error);
        return false;
    }
}


  async registerUser(user: User): Promise<boolean> {
    try {
      const formData = new FormData();
      const response = await axios.post(`${B_URL}/Usuarios/AdicionarUsuario`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.status === 201; // Retorna true se o usuário foi adicionado com sucesso
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      return false; // Retorna false em caso de erro
    }
  }

  async addUser(user: User2): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('senha', user.senha);
      formData.append('nome', user.nome);
      
      if (user.foto) {
        const response = await fetch(user.foto);
        const blob = await response.blob();
        formData.append('foto', blob, 'photo.jpg');
      }
  
      const response = await axios.post(`${B_URL}/Usuarios/AdicionarUsuario`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.status === 201;
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      return false;
    }
  }

  async validateUser(email: string, senha: string): Promise<boolean> {
    try {
      const response: AxiosResponse<User> = await axios.get(`${apiUrlUsuario}/Usuarios/Login`, {
        params: { email, senha },
      });

      return response.status === 200 && response.data != null;
    } catch (error) {
      console.error('Erro ao validar usuário:', error);
      return false;
    }
  }
  async getGrupoByNome(nomeGrupo: string): Promise<Grupo | null> {
    try {
      const response = await axios.get(`${apiUrl}/nome/${nomeGrupo}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar grupo por nome:', error);
      return null;
    }
  }
  async getUserById(userId: number): Promise<User> {
    try {
      const response: AxiosResponse<User> = await axios.get(`${BASE_URL}?id=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuário pelo ID:', error);
      return { usuariosID: 0, email: '', senha: '', nome: '', foto: '', idUsuario: 0 };
    }
  }

  async getAllUsers(): Promise<User[] | null> {
    try {
      const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todos os usuários:', error);
      return null;
    }
  }

  async getGruposDoUsuario(userId: number): Promise<Grupo[]> {
    try {
      const response = await axios.get(`${apiUrl}/TodosGrupos`);
      const grupos = response.data;

      const gruposComImagens = grupos.map((grupo: Grupo) => {
        if (grupo.foto) {
          const blob = this.base64ToBlob(grupo.foto);
          const imageUrl = URL.createObjectURL(blob);
          grupo.foto = imageUrl;
        }
        return grupo;
      });

      return gruposComImagens;
    } catch (error) {
      console.error('Erro ao obter grupos do usuário:', error);
      throw new Error('Erro ao obter grupos do usuário.');
    }
  }

  base64ToBlob(base64String: string): Blob {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray]);
  }

  async getUsuariosNoGrupo(grupoId: number): Promise<User[]> {
    try {
      const response = await axios.get(`${apiUrl}/${grupoId}/usuarios`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários no grupo:', error);
      throw error;
    }
  }
}

export default new UserService();
