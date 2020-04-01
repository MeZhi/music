<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <img :src="item.imageUrl" alt="">
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in playList" :key="index" @click="toPlaylist(item.id)">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl+'?param=200y200'" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>

    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in newSongs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl+'?param=130y130'" alt="" />
            <span @click="playMusic(item.id)" class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>

   <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in mvs" :key="index" @click="toMv(item.id)">
          <div class="img-wrap">
            <img :src="item.picUrl+'?param=260y160'" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'discovery',
  data(){
    return{
      banners:[],//轮播图
      playList:[],//推荐歌单
      newSongs:[],//最新音乐
      mvs:[],//音乐mv
    }
  },
  created(){
    //轮播图
    axios({
      url:'/banner',
      method:'get',
      params:{}
    }).then(res=>{
      this.banners = res.data.banners
    })
    //推荐歌单
    axios({
      url:'/personalized',
      method:'get',
      params:{
        limit:10//数据个数
      }
    }).then(res=>{
      this.playList = res.data.result
    })
    //获取最新歌曲
      axios({
      url:'/personalized/newsong',
      method:'get',
    }).then(res=>{
      this.newSongs = res.data.result
    })
    //获取最新mv
      axios({
      url:'/personalized/mv',
      method:'get',
    }).then(res=>{
      this.mvs = res.data.result
    })
  },
  methods: {
   toPlaylist(id){
    this.$router.push(`/playlist?key=${id}`)
   },
   playMusic(id){
      axios({
      url:'/song/url',
      method:'get',
      params:{id},
    }).then(res=>{
      let url = res.data.data[0].url
      this.$parent.musicUrl=url
    })
   },
   toMv(id){
    alert(id)
   }
  }
};
</script>

<style>
</style>