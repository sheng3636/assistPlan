import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/incomingTelegram/matchImgList',
    method: 'get',
    params
  })
}
