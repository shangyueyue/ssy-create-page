import { Toast } from 'antd-mobile';
import Service from './service';

export default {
  namespace: 'archive',
  state: {},
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *setupByMailItem({ payload }, { call, put }) {
      try {
        const responseDatas = yield call(Service.fetchList, payload);
        yield put({
          type: 'save',
          payload: { responseDatas },
        });
      } catch (err) {
        Toast.info(err.message, 1);
      }
    },
  },
  subscriptions: {},
};
