import HttpUtils from '@/utils/HttpUtils';

export default class Service {
  static fetchList(params) {
    // 获取待办列表
    return HttpUtils.post('/rest/getDoneProcessList', params);
  }
}
