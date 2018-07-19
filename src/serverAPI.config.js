const BASEURL = "https://www.easy-mock.com/mock/5b44637c990dfa4736f4d264/example/smilevue"
const LOCALURL = 'http://192.168.15.136:3000/'

const URL = {
    getShoppingMallInfo: BASEURL + 'index',
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    base: BASEURL,
    registerUser: LOCALURL + 'user/register',
    loginUser: LOCALURL + 'user/login',
    getGoodsDetailInfo: LOCALURL + 'goods/getDetailGoodsInfo'
}

module.exports = URL