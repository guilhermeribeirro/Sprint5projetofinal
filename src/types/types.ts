import { ImageSourcePropType } from 'react-native';
import axios from 'axios';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { ParamListBase } from '@react-navigation/native';

export type RootStackParamList = {
  DetalhesGrupo: { group: Grupo }; // 'DetalhesGrupo' é o nome da tela e 'group' é o parâmetro que esta tela espera
  // Outras telas e parâmetros podem ser definidos aqui conforme necessário
};


export interface User {
  usuariosID: number;
    email: string;
    senha: string;
    foto: string| null ;
    nome:string;
    idUsuario: number;
  }

  export interface User2 {
    usuariosID: number;
      email: string;
      senha: string;
      foto: string;
      nome:string;
      idUsuario: number;
    }
  

  
  export interface Grupo {
    gruposID: number; 
    nomeGrupo: string;
    participantesMax: string;
    valor: string;
    dataRevelacao: string;
    foto: string;
    senhaUsuario: string;
    descricao: string;
    iD_Administrador: number;
    idUsuario: number;
    usuarios?: GroupUser[];
    participantesGrupo: ParticipanteGrupo[];


  }


  export interface Grupo2 {
    gruposID: number; 
    nomeGrupo: string;
    participantesMax: string;
    valor: string;
    dataRevelacao: string;
    foto: string;
    senhaUsuario: string;
    descricao: string;
    iD_Administrador: number;
    idUsuario: number;
    usuarios?: GroupUser[];
  
  }
  

  export interface ParticipanteGrupo {
    grupoID: number;
    usuarioID: number;
    nome: string;
    foto: string ;
    email: string;
  }

  export interface GroupUser {
    nome: string;
  }
  
  export interface GroupListProps {
    item: Grupo; 
  }
  
  