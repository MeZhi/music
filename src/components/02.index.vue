<template>
  <div class="index-container">
    <!-- 左侧的导航 -->
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery">
          <span class="iconfont icon-find-music"></span>
          发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
          <span class="iconfont icon-music-list"></span>
          推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
          <span class="iconfont icon-music"></span>
          最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/mvs">
          <span class="iconfont icon-mv"></span>          
          最新MV
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 右侧容器 -->
    <div class="main">
      <!-- <discovery></discovery> -->
      <router-view></router-view>
    </div>
    <!-- 播放标签 -->
    <div class="player">
      <audio :src="musicUrl" controls autoplay></audio>
    </div>
  </div>
</template>

<script>
// import discovery from './03.discovery.vue'
export default {
  name:'index',
  data(){
    return{
      musicUrl:''
    }
  },
  components: {
    // discovery
  }
};
</script>

<style scoped>
.index {
  display: flex;
  height: 830px;
}
.index .nav {
  width: 200px;
  background-color: #ededed;
}
.index .nav ul li{
  list-style: none;
  text-align: center;
  margin: 10px;
}
.index .nav ul li a{
  text-decoration: none;
}
a.router-link-active{
  color: white;
  background-color: orange;
}
.main {
  flex: 1;
}
</style>