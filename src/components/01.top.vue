<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home" @click="toHomeClick()"></span>
        <!-- <span class="iconfont icon-sami-select"></span> -->
        <span class="iconfont icon-full-screen" @click="handleFullScreen()"></span>
      </div>
      <!-- <div class="history-wrapper">
        <span class="iconfont icon-arrow-lift"></span>
        <span class="iconfont icon-arrow-right"></span>
      </div> -->
      
      <h2 class="title">听音乐，用这个</h2>
      
    </div>
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <input type="text" autocomplete="off" placeholder="请输入搜索内容" class="el-input__inner" 
        v-model="inputValue"
        @keyup.enter="toResult"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            inputValue:""
        }
    },
    methods:{
        toResult(){
          if(this.inputValue===''){
            this.$message({
            message: '请输入内容',
            type: 'warning'
        });
          }else{
              //路由传参
              this.$router.push(`/result?keywords=${this.inputValue}`)
          }
        },
      toHomeClick() {
        if ('/discovery' === this.$route.path) {
          return
        }
        this.$router.push(`/discovery`)
      },
      //点击实现全屏和退出全屏
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
    }
    
}
</script>

<style>
</style>