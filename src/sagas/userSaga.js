import { call, put, takeLatest, all, take } from "redux-saga/effects";


import {
    FETCH_USER,
    FETCHING_USER,
    USER_FETCHED,
    FETCH_USER_FAILED,
    UPDATE_USER_FAILED,
    UPDATING_USER,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    CREATE_USER,
    CREATING_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILED,
    DELETE_USER,
    DELETE_USER_FAILED,
    DELETE_USER_SUCCESS
} from "../types";


import Api from "../lib/api";

function createUserApi(data) {
 
  const { email, password, name, signature } = data
  return Api.post(`/Users`, {
    email,
    password,
    name,
    signature
  })
}

function updateUserApi(data) {
  const { email, password, name, signature } = data
  return Api.put(`/Users/${data.id}`, {
    email,
    password,
    name,
    signature
  })
}

function fetchUserApi() {

  return Api.get(`/Users`);
}

function deleteUserApi(id) {
  return Api.delete(`/Users/${id}`);
}


function* getUserFlow(action) {
  try {
    yield put({type: FETCHING_USER})
    const resp = yield call(fetchUserApi);
    // const resp = [{
    //     "id": 1,
    //     "email" : "someone@somewhere.com",
    //     "password": "password",
    //     "name": "John Doe",
    //     "signature": "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"
    //   },
    //   {
    //     "id": 2,
    //     "email" : "someone2@somewhere.com",
    //     "password": "password",
    //     "name": "John Doe",
    //     "signature": "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"
    //   }
    //  ]
    if(resp) {
      yield put({type: USER_FETCHED, users: resp})
    } else {
      yield put({type: FETCH_USER_FAILED, error: 'Something went wrong'})
    }
  } catch(e) {
    console.log('Something went wrong');
    yield put({type: FETCH_USER_FAILED, error: 'Something went wrong'});
  }  
  
} 

function* createUserFlow(action) {
  try {
    yield put({type: CREATING_USER});
    const resp = yield call(createUserApi, action.data)
    // const resp = {
    //   "id": 10,
    //   "email" : action.data.email,
    //   "password": action.data.password,
    //   "name": action.data.name,
    //   "signature": action.data.signature
    // }
    if(resp) {
      yield put({type: CREATE_USER_SUCCESS, user: resp})
    } else {
      yield put({type: CREATE_USER_FAILED, error: 'Something went wrong'})
    }
  } catch(e) {
    console.log('Something went wrong');
    yield put({type: CREATE_USER_FAILED, error: 'Something went wrong'});
  }
}

function* updateUserFlow(action) {
  try {
    yield put({type: UPDATING_USER});
    const resp = yield call(updateUserApi, action.data)
    // const resp = {
    //   "id": action.data.id,
    //   "email" : action.data.email,
    //   "password": action.data.password,
    //   "name": action.data.name,
    //   "signature": action.data.signature
    // }
    if(resp) {
      yield put({type: UPDATE_USER_SUCCESS, user: resp})
    } else {
      yield put({type: UPDATE_USER_FAILED, error: 'Something went wrong'})
    }
  } catch(e) {
    console.log('Something went wrong');
    yield put({type: UPDATE_USER_FAILED, error: 'Something went wrong'})
  }
}

function* deleteUserFlow(action) {
  try {
    const { id } = action
    const resp = yield call(deleteUserApi, id);
    yield put({ type: DELETE_USER_SUCCESS, user_id: id})
  } catch(e) {
    console.log('Something went wrong');
    yield put({type: DELETE_USER_FAILED, error: 'Something went wrong'})
  }
}


// Our watcher (saga).  It will watch for many things.
function* userWatcher() {
  yield all([
    takeLatest(FETCH_USER, getUserFlow),
    takeLatest(UPDATE_USER, updateUserFlow),
    takeLatest(CREATE_USER, createUserFlow),
    takeLatest(DELETE_USER, deleteUserFlow)
  ])
}

export default userWatcher;
