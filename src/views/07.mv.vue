<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="url" autoplay></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="icon+'?param=250y150'" alt />
          </div>
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ mvInfo.name }}</h2>
          <span class="date">发布：{{ mvInfo.publishTime }}</span>
          <span class="number">播放：{{ mvInfo.playCount }} 次</span>
          <p class="desc">{{ mvInfo.desc }}</p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap" v-if="hotComments !== undefined && hotComments.length !== 0">
        <p class="title">
          精彩评论
          <span class="number">({{ hotComments.length }})</span>
        </p>
        <div class="comments-wrap">
          <!-- 评论 -->
          <div class="item" v-for="(item, index) in hotComments" :key="index">
            <div class="icon-wrap">
              <!-- 头像 -->
              <img :src="item.user.avatarUrl+'?param=50y50'" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}</span>
                <span class="comment">：{{ item.content }}</span>
              </div>
              <!-- 回复 -->
              <div class="re-content" v-if="item.beReplied.length !== 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}</span>
                <span class="comment">：{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | dateFormat }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">
          最新评论
          <span class="number">({{ total }})</span>
        </p>
        <div class="comments-wrap">
          <!-- 评论 -->
          <div class="item" v-for="(item, index) in comments" :key="index">
            <div class="icon-wrap">
              <!-- 头像 -->
              <img :src="item.user.avatarUrl+'?param=50y50'" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}</span>
                <span class="comment">：{{ item.content }}</span>
              </div>
              <!-- 回复 -->
              <div class="re-content" v-if="item.beReplied.length !== 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}</span>
                <span class="comment">：{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | dateFormat }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="pageSize"
      ></el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item, index) in simiMvs" :key="index" @click="playMv(item.id)">
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mv",
  data() {
    return {
      id:'',
      total: 20, //总条数
      page: 1, //页码
      pageSize:10,//页容量
      limit: 10, //页容量
      url: '',//mv播放地址
      simiMvs:[],//相关mv
      mvInfo:{},//mv的信息
      icon:'',//头像
      hotComments: [],
      comments: []
    }
  },
   created() {
     this.id = this.$route.query.id
    //获取mv的播放地址
    this._getMvUrl()
    //获取相关的mv
    this._getSimiMvUrl()
    //获取mv的信息
    //获取歌手头像
     this._getMvDetail() 
    //获取评论数据
    this._getMvComment()
  },
  methods: {
    handleCurrentChange(val){
      this.page = val
      this._getMvComment()
    },
    // 获取MV播放地址
    async _getMvUrl() {
      axios({
        url: "/mv/url",
        method: "get",
        params: {
          id:this.id //获取url中的id
        }
      }).then(res => {
        // console.log(res)
        this.url = res.data.data.url;
      });
    },
    // 获取相关mv
    async _getSimiMvUrl() {
        await axios({
        url: "/simi/mv",
        method: "get",
        params: {
          mvid: this.id //获取url中的id
        }
      }).then(res => {
        // console.log(res)
        this.simiMvs = res.data.mvs
      });
    },
    // 获取MV详情
    async _getMvDetail() {
      await axios({
        url: "/mv/detail",
        method: "get",
        params: {
          mvid: this.id //获取url中的id
        }
      }).then(res => {
        this.mvInfo = res.data.data
        //获取歌手头像
        axios({
          url: "/artists",
          method: "get",
          params: {
            id:this.mvInfo.artists[0].id//获取url中的id
          }
        }).then(res => {
          this.icon = res.data.artist.picUrl
        })
      })
    },
    // 获取MV评论
    async _getMvComment() {
      await axios({
            url: "/comment/mv",
            method: "get",
            params: {
              id:this.id,//获取url中的id
              limit:10,
              //根据页码计算
              offset:(this.page-1)*10
            }
          }).then(res => {
            // console.log(res)
            this.hotComments = res.data.hotComments
            this.comments = res.data.comments
            this.total = res.data.total
        })
    },
    //播放视频
    playMv(id){
      this.pageNum = 1
      this.id = id
      this._getMvUrl()
      this._getMvDetail()
      this._getSimiMvUrl()
      this._getMvComment()
    }
  }
}
</script>

<style>
</style>
