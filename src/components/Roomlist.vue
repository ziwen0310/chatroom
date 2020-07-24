<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Room List
        <br>
        <b-link href="#/add-room">(Add Room)</b-link>
      </h2>
       <button @click="getAllUserJointRooms">test</button>
       <button @click="testSetUserid">testSetUserid</button>

      <b-table striped hover :items="allRooms" :fields="fieldsarr">
        <template v-slot:cell(actions)="roomInfo" >
          <button size="sm" @click.stop="joinRoom(roomInfo)">Join</button>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
import { getUserid, setUserid } from './storage'
export default {
  name: 'RoomList',
  data () {
    return {
    
      fieldsarr: [
       'created_date','room_name','actions'
      ],
      allRooms: [],
      errors: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/api/room`)
    .then(response => {
        // console.log(response);
      this.allRooms = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    testSetUserid () {
      setUserid('wang')
    },
    getAllUserJointRooms() {
      const userid = 'wang'
      axios.get(`http://localhost:3000/api/room`, {
        params: {
          userid: userid
        }
      })
    },
    joinRoom (room) {
      console.log(room)
      const id=room.item._id
      const userid = 'wang'
      axios.post(`http://localhost:3000/api/room/join/${id}`, {}, {
        params: {
          userid: userid
        }
      }).then(data => {
        const roomInfo = data.data
        console.log('roomInfo', roomInfo)
        const roomId = roomInfo._id
        location.hash = `#/chat-room/${roomId}`
        // this.$router.push({
        //   name: 'Chatroom',
        // })
      })
      // this.$router.p.ush({
      //   name: 'Joinroom',
      //   params: { id: id }
      // })
    }
  }
}
import axios from 'axios'


</script>