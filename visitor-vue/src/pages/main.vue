<template>
  <ion-app>
    <ion-page class="show-page">

      <ion-header>
        <ion-toolbar>

          <ion-buttons slot="start">
            <ion-button><img src="../assets/logo.png"></ion-button>
          </ion-buttons>

          <ion-title class="toolbar-background"><span class="title-color">Red Stop</span></ion-title>

          <ion-buttons slot="end">
            <ion-button><img src="../assets/logo.png"></ion-button>
          </ion-buttons>

        </ion-toolbar>

      </ion-header>
      <ion-content>
        <ion-searchbar placeholder="URL을 검색해 주세요">

        </ion-searchbar>
        <ion-list>
          <div class="content-background">
            <ion-item v-for="(value, key) in items" :key="key" @click="mouseClick(value)">
              <ion-label>{{value.url}}</ion-label>
              <img src="../assets/logo.png">
            </ion-item>
          </div>
        </ion-list>
      </ion-content>
    </ion-page>
  </ion-app>
</template>
<script>
var DCL = console.log

export default {
  name: 'Main',
  data () {
    return {
      isConnected: false,
      debugHost: 'http://localhost:3000',
      items: [
        {url: '/api/json-test/single-json', method: 'get'},
        {url: '/', method: 'get'},
        {url: '/api/json-test/multi-json', method: 'get'}
      ]
    }
  },
  sockets: {
    connect () {
      this.isConnected = true
      DCL('connect success')
      this.$socket.emit('reqSignIn', {id: 'kukaro', pw: '1234'})
    }
  },
  created: function () {

  },
  methods: {
    mouseClick (value) {
      this.$http[value.method](this.debugHost + value.url).then((response) => {
        console.log(response.data)
      })
    }
  }
}
</script>

<style scoped>
  .title-color {
    color: white;
  }

  .toolbar-background {
    background-color: #526387;
  }

  .content-background {
    background-color: #F2F7FB;
    width: 100%;
    height: 100%;
  }
</style>
