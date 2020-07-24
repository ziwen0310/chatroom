<template>
  <b-row class="chatroom">
    <b-col cols="12">
      <h2>
        Chat Room
      </h2>
      <b-list-group class="panel-body v-chat-scroll">
        <b-list-group-item v-for="(item, index) in chats" class="chat">
          <div class="left clearfix" v-if="item.nickname === nickname">
            <b-img left src="http://placehold.it/50/55C1E7/fff&text=ME" rounded="circle" width="74" height="74" alt="img" class="m-1" />
            <div class="chat-body clearfix">
              <div class="header">
                <strong class="primary-font">{{ item.nickname }}</strong> <small class="pull-right text-muted">
                <span class="glyphicon glyphicon-time"></span>{{ item.created_date }}</small>
              </div>
              <p>{{ item.message }}</p>
            </div>
          </div>
          <div class="right clearfix" v-else>
            <b-img right src="http://placehold.it/50/55C1E7/fff&text=U" rounded="circle" width="74" height="74" alt="img" class="m-1" />
            <div class="chat-body clearfix">
              <div class="header">
                <strong class="primary-font">{{ item.nickname }}</strong> <small class="pull-right text-muted">
                <span class="glyphicon glyphicon-time"></span>{{ item.created_date }}</small>
              </div>
              <p>{{ item.message }}</p>
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors">
          {{error.message}}
        </li>
      </ul>
      <!-- bind input data -->
      <b-form @submit="onSubmit" class="chat-form">
        <b-input-group prepend="Message">
          <b-form-input id="message" :state="state" v-model.trim="chat.message"></b-form-input>
          <b-input-group-append>
            <b-btn type="submit" variant="info">Send</b-btn>
          </b-input-group-append>
        </b-input-group>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { getUserid, setUserid } from './storage'
import axios from 'axios'
import Vue from 'vue'
import * as io from 'socket.io-client'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
export default {
  name: 'Chatroom',
data () {
  return {
    state:"",
    chats: [],
    errors: [],
    nickname: this.$route.params.nickname,
    chat: {

    },
    socket: io('http://localhost:4000')
  }
},
//fetch chat message and display
created () {
  const hash = location.hash
  const roomId = hash.substr(12)
  axios.get(`http://localhost:3000/api/chat/${roomId}` )
  .then(response => {
    this.chats = response.data
  })
  .catch(e => {
    this.errors.push(e)
  })

  this.socket.on('new-message', function (data) {
    if(data.message.room === roomId) {
      this.chats.push(data.message)
    }
  }.bind(this))
},
methods: {
  logout () {
    this.socket.emit('save-message', { room: this.chat.room, nickname: this.chat.nickname, message: this.chat.nickname + ' left this room', created_date: new Date() });
    this.$router.push({
      name: 'RoomList'
    })
  },
  onSubmit (evt) {
    evt.preventDefault()
    const hash = location.hash
    const roomId = hash.substr(12)
    this.chat.room = roomId
    this.chat.nickname = getUserid()
    this.socket.emit('save-message', this.chat)
    this.chat.message = ''
    // axios.post(`http://localhost:3000/api/chat`, this.chat)
    // .then(response => {
    //   this.socket.emit('save-message', response.data)
    //   this.chat.message = ''
    // })
    // .catch(e => {
    //   this.errors.push(e)
    // })
  }
}
}
</script>

<style>
   .chatroom {
     /* height:100vh; */
   }
  .chat .chat-body p {
    margin: 0;
    color: #777777;
  }
  .chat .left .chat-body {
    text-align: left;
    margin-left: 95px;
  }

  .chat .right .chat-body {
    text-align: right;
    margin-right: 95px;
  }


  .panel-body {
    overflow-y: scroll;
    height: calc(100vh - 200px);
  }

  .chat-form {
    margin: 19px auto;
    width: 79%;
  }
</style>