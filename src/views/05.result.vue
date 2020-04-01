<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title" :keywords="(keywords = $route.query.keywords)">{{ $route.query.keywords }}</h2>
      <!-- <h2 class="title">{{ keywords }}</h2> -->
      <span class="sub-title">找到{{ count }}结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in songList"
              :key="index"
              @click="playMusic(item.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 名称 -->
                    <span>{{ item.name }}</span>
                    <!-- mv图标 -->
                    <span v-if="item.mvid !== 0" class="iconfont icon-mv"></span>
                  </div>
                  <!-- 二级标题 -->
                  <span v-if="item.alias.length !== 0">{{ item.alias[0] }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in playLists"
            :key="index"
            @click="toPlaylist(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl+'?param=200y200'" alt />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item, index) in mvs" :key="index" @click="toMv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover+'?param=250y150'" alt />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount }}</div>
              </div>
              <span class="time">{{ item.duration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="pageNum"
      :page-size="pageSize"
    ></el-pagination>
  </div>
</template>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activeIndex: 'songs',
      songList: [], //查询歌曲
      playLists:[],//保存查询的歌单
      count:0,//搜索总数
      type:1,
      limit:20,//显示数量
      mvs:[],//mv的数据
      total: 0,// 总条数
      pageNum:1,//页码
      pageSize:10,
    };
  },
  watch:{
    activeIndex(){
      //songs 歌曲
      //lists 歌单
      //mv mv
      let type = 1
      switch (this.activeIndex) {
        case 'songs':
          this.type = 1
          this.pageNum = 1
          break
        case 'lists':
          this.type = 1000
          this.pageNum = 1
          break
        case 'mv':
          this.type = 1004
          this.pageNum = 1
          break
        default:
          break
      }
      this._search()
    }
  },
  //生命周期钩子created 回调函数，添加后自动执行 内部可以通过this访问vue的实例
  created() {
    // console.log(this.$route.query.keywords);
    this._search()
  },
  methods:{
      // 页码改变事件
      handleCurrentChange(val) {
        // 保存页码
        this.pageNum = val
        // 重新获取数据
        this._search()
      },

     async _search() {
      await axios({
        url:'https://autumnfish.cn/search',
        method:'get',
        params:{
          keywords:this.$route.query.keywords,
          type: this.type,
          limit: this.type === 1004 ? 15 : 20,
          offset: (this.pageNum - 1) * (this.type === 1004 ? 15 : 20)
        }
      }).then(res=>{
        if(this.type === 1){
          // console.log(res);
          this.songList = res.data.result.songs
          //计算歌曲时间
          for(let i=0;i<this.songList.length;i++){
            let min = parseInt(this.songList[i].duration/1000/60)
            if(min<10){min = '0' + min}
            let sec = parseInt(this.songList[i].duration/1000%60)
            if(sec<10){sec = '0' + sec}
            this.songList[i].duration = min+":"+sec
          }
          //保存总数
          this.count = res.data.result.songCount
        }else if(this.type===1000){
            // console.log(res)
            //歌单逻辑
            this.playLists = res.data.result.playlists
            //总数
            this.count = res.data.result.playlistCount
            //处理播放次数
            for(let i=0;i<this.playLists.length;i++){
              if(this.playLists[i].playCount>100000){
                this.playLists[i].playCount = parseInt( this.playLists[i].playCount/10000)+'w'
              }
            }
          }else{
            //保存mv
            this.mvs = res.data.result.mvs
            //mv总数
            this.count = res.data.result.mvCount
            //处理数据
            for(let i=0;i<this.mvs.length;i++){
              //时间
              let min = parseInt(this.mvs[i].duration/1000/60)
              let sec = parseInt(this.mvs[i].duration/1000%60)
              if(min<10){
                min = '0' + min
              }
               if(sec<10){
                sec = '0' + sec
              }
              this.mvs[i].duration = this.min+':'+sec

              //播放次数
              if(this.mvs[i].playCount>100000){
                this.mvs[i].playCount = parseInt(this.mvs[i].playCount/10000)+'w'
              }
            }
          }
          this.total = this.count
      })
    },
    //去歌单详情
    toPlaylist(id){
        this.$router.push(`/playlist?key=${id}`)
      },
    //去mv页面
    toMv(id){
      this.$router.push(`/mv?id=${id}`)
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
};
</script>

<style>
</style>