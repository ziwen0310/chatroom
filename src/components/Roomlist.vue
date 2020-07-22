<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Room List
        <br>
        <b-link href="#/add-room">(Add Room)</b-link>
      </h2>
      <b-table striped hover :items="rooms" :fields="fieldsarr">
        <template v-slot:cell(actions)="data" >
          <button size="sm" @click.stop="join(data)">Join</button>
        </template>
      </b-table>
      <!-- <ul v-if="errors && errors.length">
        <li v-for="(error,index) of errors" :key="index">
          {{error.message}}
        </li>
      </ul> -->
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'RoomList',
  data () {
    return {
    
      fieldsarr: [
       'created_date','room_name','actions'
      ],
      rooms: [],
      errors: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/api/room`)
    .then(response => {
        // console.log(response);
      this.rooms = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    join (data) {
      const id=data._id
      this.$router.push({
        name: 'Joinroom',
        params: { id: id }
      })
    }
  }
}
import axios from 'axios'


</script>