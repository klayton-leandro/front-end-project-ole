import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import { signInSuccess, signFailure  } from './actions';

export function* signIn({ payload }) {
  try {
      const { cpf, password } = payload;
      const response = yield call(api.post, 'sessions', {
        cpf,
        password,
      });

      const { token, user} = response.data;
     
      if(user.collaborator === true){
        api.defaults.headers.Authorization = `Bearer ${token}`;
        yield put(signInSuccess(token, user));
        history.push('/dashboard')
      }

      if(user.admin === true){
        api.defaults.headers.Authorization = `Bearer ${token}`;
        yield put(signInSuccess(token, user));
        history.push('/dashboard')
      }

      if(user.admin === false) {
        yield put(signFailure());
      }

      if (user.collaborator === false ) {
        yield put(signFailure());
      }


    }catch (error) {
      toast.error('Falha na autenticaçao, verifique seus dados');
      yield put(signFailure());
    }
}

export function* signUp({ payload }) {
  try {
    const {email, password, name, phone, cpf } = payload;

    yield call(api.post, '/users', {
      email,
      password,
      name,
      phone,
      cpf
    });

    history.push('/');
  } catch (error) {
    toast.error('Falha no cadastro, verifique seus dados');
    yield put(signFailure());
  }
}


export function* signUpColla({ payload }) {
  try {
    const {name, password, email, cpf, phone } = payload;

    yield call(api.post, '/users', {
      name,
      password,
      email,
      cpf,
      phone,
      collaborator: true
    });

    toast.success('Colaborador Adicionado!');

  } catch (error) {
    toast.error('Falha no cadastro, verifique seus dados');
    yield put(signFailure());
  }
}



export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_UP_COLLABORATION', signUpColla),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
