<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
                title="商品详情"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
                />
        </div>
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" width="100%" />
        </div>
        <div class="goods-name">
            {{goodsInfo.NAME}}
        </div>
        <div class="goods-price">
            价格： {{goodsInfo.PRESENT_PRICE | moneyFilter}}
        </div>
        <div>
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsInfo.DETAIL"></div>
                </van-tab>
                <van-tab title="商品评价">
                    正在制作中
                </van-tab>
            </van-tabs>
        </div>
        <div class="goods-bottom">
            <div><van-button size="large" type="primary">加入购物车</van-button></div>
            <div><van-button size="large" type="primary">直接购买</van-button></div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import serverAPI from '@/serverAPI.config.js'
    import {toMoney} from '@/filter/moneyFilter.js'

    export default {
        data() {
            return {
                goodsId: '775e575ce28a4f89b1dfe2c99eb08ae7',
                goodsInfo: {}
            }
        },
        created(){
            console.log(this.$route)
            this.goodsId = this.$route.query.goodsId;
            console.log(this.goodsId);
            this.getInfo();
        },
        methods: {
            getInfo() {
                axios.post(serverAPI.getGoodsDetailInfo, {ID : this.goodsId})
                .then(res => {
                    if(res.data.code === 200 && res.data.message) {
                        this.goodsInfo = res.data.message[0];
                    } else {
                        Toast('服务器错误，数据获取失败');
                    }
                    console.log(this.goodsInfo);
                })
                .catch(error => {
                    console.log(error)
                })
            },
            onClickLeft() {
                this.$router.go(-1);
            }
        },
        filters: {
            moneyFilter(money) {
                return toMoney(money)
            }
        }
    }
</script>

<style scoped>
.detail {
    font-size: 0px;
}
.goods-name {
    background: #FFF;
}
.goods-price {
    background: #FFF;
}
.good-bottom {
    position: fixed;
    bottom: 0px;
    left:0px;
    background-color: #FFF;
    width: 100%;

    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
}

.goods-bottom>div {
    flex: 1;
    padding:5px;
}
</style>