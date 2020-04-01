<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" :class="{ active: tag === 0 }" @click="tag = 0">全部</span>
      <span class="item" :class="{ active: tag === 7 }" @click="tag = 7">华语</span>
      <span class="item" :class="{ active: tag === 96 }" @click="tag = 96">欧美</span>
      <span class="item" :class="{ active: tag === 8 }" @click="tag = 8">日本</span>
      <span class="item" :class="{ active: tag === 16 }" @click="tag = 16">韩国</span>
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="el-table__row" v-for="(item, index) in songs" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl+'?param=130y130'" alt="" />
              <span @click="playMusic(item.id)" class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
            </div>
          </td>
          <td>{{ item.album.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'songs',
  data(){
    return{
      songs:[],//歌曲列表
      tag:'0'
    }
  },
  created(){
    this.getSongs()
  },
  watch:{
    tag(){
      this.getSongs()
    }
  },
  methods:{
    getSongs(){
      //获取最新音乐数据
        axios({
            url: "https://autumnfish.cn/top/song",
            method:'get',
            params: {
              type:this.tag
            }
          }).then(res => {
            // console.log(res)
            this.songs = res.data.data
            //处理时长 毫米转换为分钟
            for(let i=0;i<this.songs.length;i++){
              //获取总时长
              let duration = this.songs[i].duration
              let min = parseInt(duration/1000/60)
              if(min<10){
                min = '0' + min
              }
              let sec = parseInt(duration/1000%60)
              if(sec<10){
                sec = '0' + sec
              }
              // console.log(min+"==="+sec)
              this.songs[i].duration = `${min}:${sec}`
            }
          });
        },
    //播放音乐
    playMusic(id){
      axios({
        url:'https://autumnfish.cn/song/url',
        method:'get',
        params:{
          id:id
        }
      }).then(res=>{
        // console.log(res)
        let url = res.data.data[0].url
        this.$parent.musicUrl = url
      })
    }
    }
}
</script>

<style>

</style>