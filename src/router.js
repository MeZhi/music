import Vue from 'vue'
import VueRouter from 'vue-router'
import discovery from './views/01.discovery.vue'
import playlists from './views/02.playlists.vue'
import songs from './views/03.songs.vue'
import mvs from './views/04.mvs.vue'
import result from './views/05.result.vue'
import playlist from './views/06.playlist.vue'
import mv from './views/07.mv.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
    path: '/discovery',
    component: discovery
    },
    {
      path: '/',
      component: discovery
    },
    {
      path: '/playlists',
      component: playlists
    },
    {
      path: '/songs',
      component: songs
      },
    {
      path: '/mvs',
      component: mvs
    },
    {
      path: '/result',
      component: result
    },
    {
      path: '/playlist',
      component: playlist
    },
    {
      path: '/mv',
      component: mv
    }
  ]
})
export default router;