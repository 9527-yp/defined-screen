import axios from '@/utils/axios.js'

export const getSongPlayUrl = (params => {
    return axios.request({
        url: '/song/url',
        method: 'get',
        params
    })
})