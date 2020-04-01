<template>
  <div class="playlists-container">
    <!-- 头部 -->
    <div class="top-card">
      <!-- 封面 -->
      <div class="icon-wrap">
        <img :src="topList.coverImgUrl" alt />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 标题 -->
        <div class="title">{{ topList.name }}</div>
        <!-- 介绍 -->
        <div class="info">{{ topList.description }}</div>
      </div>
      <!-- 背景 -->
      <img :src="topList.coverImgUrl" alt class="bg" />
      <div class="bg-mask"></div>
    </div>

    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span class="item" @click="tag = '全部'" :class="{ active: tag === '全部' }">全部</span>
        <span class="item" @click="tag = '欧美'" :class="{ active: tag === '欧美' }">欧美</span>
        <span class="item" @click="tag = '华语'" :class="{ active: tag === '华语' }">华语</span>
        <span class="item" @click="tag = '流行'" :class="{ active: tag === '流行' }">流行</span>
        <span class="item" @click="tag = '说唱'" :class="{ active: tag === '说唱' }">说唱</span>
        <span class="item" @click="tag = '摇滚'" :class="{ active: tag === '摇滚' }">摇滚</span>
        <span class="item" @click="tag = '民谣'" :class="{ active: tag === '民谣' }">民谣</span>
        <span class="item" @click="tag = '电子'" :class="{ active: tag === '电子' }">电子</span>
        <span class="item" @click="tag = '轻音乐'" :class="{ active: tag === '轻音乐' }">轻音乐</span>
        <span class="item" @click="tag = '影视原声'" :class="{ active: tag === '影视原声' }">影视原声</span>
        <span class="item" @click="tag = 'ACG'" :class="{ active: tag === 'ACG' }">ACG</span>
        <span class="item" @click="tag = '怀旧'" :class="{ active: tag === '怀旧' }">怀旧</span>
        <span class="item" @click="tag = '治愈'" :class="{ active: tag === '治愈' }">治愈</span>
        <span class="item" @click="tag = '旅行'" :class="{ active: tag === '旅行' }">旅行</span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in playlists"
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
</template>

<script>
import axios from "axios";
export default {
  name: "recomend",
  data() {
    return {
      total: 0, //总条数
      page: 1,//页码
      pageSize:20,//页面总数
      topList:{},//顶部的推荐歌单
      playlists:[],//推荐歌单列表
      tag:"全部"
    };
  },
  created() {
    this._getTopList()
    this._getPlayLists()
  },
  methods:{
      toPlaylist(id){
        this.$router.push(`/playlist?key=${id}`)
      },
      //顶部精品歌单
      async _getTopList(limit){
        await axios({
        url: "/top/playlist/highquality",
        params: {
          limit: limit,
          cat: this.tag
        }
      }).then(res => {
        // console.log(res)
        this.topList = res.data.playlists[0]
      });
      },
      //歌单列表
      async _getPlayLists(limit) {
        await axios({
        url: "/top/playlist",
        params: {
          limit: this.pageSize,
          cat: this.tag,
          total: true,
          order: 'hot',
          offset: (this.page - 1) * this.pageSize,
        }
      }).then(res => {
        // console.log(res)
        this.total = res.data.total
        this.playlists = res.data.playlists
      });
    },
      //页码改变的回调
    handleCurrentChange(val){
      this.page = val
      this._getPlayLists()
    }
  },
  //　监听器
  watch: {
    tag() {
      // console.log(this.tag)
      this._getTopList()
      this._getPlayLists()
    }
  }
};
</script>

<style>
</style>