import {types} from '../types';

const initial_state = {
  timeZone: '',
};
const actionMap = {
  [types.setTimeZone]: (state, act) => {
    return {
      timeZone: act.payload,
    };
  },
  [types.RemoveTimeZone]: () => initial_state,
};
export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
