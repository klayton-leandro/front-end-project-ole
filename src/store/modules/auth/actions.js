export function signInRequest(cpf, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { cpf, password },
  };
}

export function signInSuccess(token,user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token ,user},
  };
}

export function signUpRequest(email, password, name, phone, cpf) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {email, password, name, phone, cpf },
  };
}

export function signUpCollaboration(name, password, email, cpf, phone){
  return {
    type: '@auth/SIGN_UP_COLLABORATION',
    payload: {name, password, email, cpf, phone},
  }
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
