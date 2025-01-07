import {all} from 'redux-saga/effects';
import Auth_Saga from './AuthSaga';
// import RecentLocationSaga from './QuestionSaga';
// import questionSaga from './QuestionSaga';

function* rootSaga() {
  yield all([Auth_Saga()]);
  // yield all([Auth_Saga(), questionSaga()]);
}

export default rootSaga;
