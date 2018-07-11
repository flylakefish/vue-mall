<template>
    <div>
        <!-- 上部搜索栏 -->
        <div class="search-bar">
            <van-row>
                <van-col :span="3">
                    <img :src="locationIcon"  class="location-icon" />
                </van-col>
                <van-col :span="16">
                    <input type="text" class="search-input" />
                </van-col>
                <van-col :span="5">
                    <van-button type="primary" size="small">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <!--轮播器 -->
        <div class="swipe-area">
            <van-swipe :autoplay="2000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.image" width="100%" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 商品类型栏 -->
        <div class="type-bar">
            <div v-for="(cate , index2) in category" :key="index2">
                <img v-lazy="cate.image" width="90%" />
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!-- 广告栏 -->
        <div class="ad-banner">
            <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" />
        </div>
        <!-- 推荐商品栏 -->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%" />
                            <div> {{item.goodsName}}</div>
                            <div>￥{{item.price}}(￥{{item.mallPrice}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div> 
        <!-- 商品列表 -->
        <floor :floorData="floor1" :floorTitle="floorName.floor1" />
        <floor :floorData="floor2" :floorTitle="floorName.floor2" />
        <floor :floorData="floor3" :floorTitle="floorName.floor3" />
        <!-- {{price || moneyFilter }} -->
    </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'

import {swiper, swiperSlide} from 'vue-awesome-swiper'
import swiperDefault from '@/components/swiper/swiperDefault'
import serverAPI from '@/serverAPI.config'
import floor from '@/components/component/floor'
import {toMoney} from '@/filter/moneyFilter'

export default {
    data() {
        return {
            locationIcon:  require('../assets/images/location.png'),
            bannerPicArray: [
            ],
            category: {},
            adBanner: {},
            recommendGoods: [],
            swiperOption: {
                pagination: {
                   
                }
            },
            floor1: [],
            floor2: [],
            floor3: [],
            floorName: {},
            price: 3.5565357
        }
    },
    created(){
        // 获得初始数据
        axios.get(serverAPI.base)
        .then(res => {
            console.log(res);
            this.bannerPicArray = res.data.data.slides;
            this.category = res.data.data.category;
            this.adBanner = res.data.data.advertesPicture;
            this.recommendGoods = res.data.data.recommend;
            this.floor1 = res.data.data.floor1;
            this.floor2 = res.data.data.floor2;
            this.floor3 = res.data.data.floor3;
            this.floorName = res.data.data.floorName;
        })
        .catch(error => {

        })
    },
    methods: {
    },
    filters: {
        moneyFilter(money) {
            return toMoney(money);
        }
    },
    components: {
        swiper,
        swiperSlide,
        swiperDefault,
        floor
    }
}
</script>

<style scoped>
    .search-bar {
        height: 2.2rem;
        background: orange;
        line-height: 2.2rem;
    }
    .location-icon {
        padding-left: 0.3rem;
        padding-top: .2rem;
    }
    .search-input {
        width: 90%;
        border:none;
        border-bottom: 1px solid silver !important;
        margin-left: 5px;
        background: #FFF;
    }
    .swipe-area {
        width: 20rem;
        clear: both;
        max-height: 172px;
    }
    .type-bar {
        background: #FFF;
        margin: 0 .3rem .3rem;
        border-radius: .3rem;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .recommend-area {
        background: #FFF;
        margin-top: .3rem;
    }
    .recommend-title {
        border-bottom: 1px solid #eee;
        font-size: 14px;
        padding: .2rem;
        color: orange;
    }
    .recommend-body {
        border-bottom: 1px solid silver;
    }
    .recommend-item {
        width: 99%;
        border-right: 1px solid silver;
        font-size: 12px;
        text-align: center;
    }
    
</style>