import Vue from 'vue'
import Router from 'vue-router'
import Roomlist from '@/components/Roomlist'
import Addroom from '@/components/Addroom'
import Joinroom from '@/components/Joinroom'
import Chatroom from '@/components/Chatroom'

Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
    {
      path: '/',
      name: 'Roomlist',
      component: Roomlist
    },
    {
      path: '/add-room',
      name: 'Addroom',
      component: Addroom
    },
    {
      path: '/join-room/:id',
      name: 'Joinroom',
      component: Joinroom
    },
    {
      path: '/chat-room/:roomid',
      name: 'Chatroom',
      component: Chatroom
    },
  ]
})
