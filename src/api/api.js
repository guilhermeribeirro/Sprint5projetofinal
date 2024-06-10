import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7217', 
});

export const getUsuario = async () => {
    try {
        const response = await api.get('Usuario');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados: ', error);
        throw error;
    }
};

export const getGrupo = async () => {
    try {
        const response = await api.get('Grupo');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados: ', error);
        throw error;
    }
};
