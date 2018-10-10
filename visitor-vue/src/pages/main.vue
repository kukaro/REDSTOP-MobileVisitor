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
        <form>
          <ion-item>
            <ion-label>Platform</ion-label>
            <ion-input type="text" :value="deviceInformation.myPlatform" ref="inputPlatfrom"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>ISP</ion-label>
            <ion-input type="text" :value="deviceInformation.myISP"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Region</ion-label>
            <ion-input type="text" :value="deviceInformation.myRegion"></ion-input>
          </ion-item>
        </form>


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
  /* eslint-disable */
  import schedule from 'node-schedule'
  import os from 'os'
  import whois from 'whois-ux'
  import axios from 'axios'

  var DCL = console.log

  // function sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  //
  // async function asyncSleep(ms) {
  //   await sleep(ms)
  // }

  export default {
    name: 'Main',
    data() {
      return {
        isConnected: false,
        items: [
          {url: '/api/json-test/single-json', method: 'get'},
          {url: '/', method: 'get'},
          {url: '/api/json-test/multi-json', method: 'get'}
        ],
        userAuth: null,
        scenario: null,
        lastTime: null,
        count: 0,
        deviceInformation: {
          myPlatform: 'Android',
          myISP: 'kt',
          myRegion: '대한민국 서울시 강남구 대치동'
        }
      }
    },
    watch: {
      myPlatform: function () {
        console.log('change')
      }
    },
    sockets: {
      connect() {
        this.isConnected = true
        DCL('connect success')
        this.$socket.emit('reqSignIn', {username: 'kukaro', password: '1234'})
      },
      getAuth(data) {
        let userAuth = data
        DCL(data)
        if (userAuth['success']) {
          this.userAuth = userAuth
          this.$socket.emit('reqUrls', {username: this.userAuth['username']})
        }
      },
      getUrls(data) {
        DCL(data)
        this.items = data
        this.$socket.emit('reqScenarios', {username: this.userAuth['username']})
      },
      getScenarios(data) {
        this.scenario = data

        for (let atom in this.scenario) {
          // DCL(this.scenario[atom])
          if (this.scenario[atom].type === 'A') {
            let date = new Date()
            let tdate = this.scenario[atom]['iterate_period'].split(':')
            date.setSeconds(date.getSeconds() + 60 - date.getSeconds())
            // tdate = Number(tdate[0]) * 60 * 60 + Number(tdate[1]) * 60 + Number(tdate[2])
            this.lastTime = date
            let ts = Number(tdate[2]) !== 0 ? '/' + Number(tdate[2]) : ''
            let tm = Number(tdate[1]) !== 0 ? '/' + Number(tdate[1]) : ''
            let th = Number(tdate[0]) !== 0 ? '/' + Number(tdate[0]) : ''
            DCL(ts, tm, th)
            let cronScedule = '*' + ts + ' *' + tm + ' *' + th + ' * * *'
            DCL(cronScedule)
            let scheduledJob = schedule.scheduleJob(cronScedule, () => {
              // console.log('hihih')
              DCL(this.count++)
              for (let atom in this.items) {
                let start_ms = new Date().getMilliseconds()
                this.$http[this.items[atom].method](this.items[atom].url).then((response) => {
                  let end_ms = new Date().getMilliseconds()
                  DCL(new Date())
                  let responsetime = end_ms - start_ms
                  DCL(response.data)
                  DCL(this.items[atom])
                  this.$socket.emit('sendVisitData', {
                    username: this.userAuth['username'],
                    url: this.items[atom].url,
                    method: this.items[atom].method,
                    name: this.items[atom].name,
                    data: response.data,
                    deviceInformation: this.deviceInformation,
                    responsetime,
                    status: response.status
                  })
                }).catch((err) => {
                  let end_ms = new Date().getMilliseconds()
                  let responsetime = end_ms - start_ms
                  DCL(new Date())
                  DCL(err.response)
                  this.$socket.emit('sendVisitData', {
                    username: this.userAuth['username'],
                    url: this.items[atom].url,
                    method: this.items[atom].method,
                    name: this.items[atom].name,
                    data: err.response.data,
                    deviceInformation: this.deviceInformation,
                    responsetime,
                    status: err.response.status
                  })
                })
              }
            })


            // date.setHours(date.getHours() + Math.floor(Number(tdate[0])))
            // date.setMinutes(date.getMinutes() + Math.floor(Number(tdate[1])))
            // date.setSeconds(date.getSeconds() + Math.floor(Number(tdate[2])))
          }
        }
      }
    },
    mounted: function () {
      DCL(this.$refs)
      axios.get('http://ip-api.com/json').then(response => {
        console.log(response.data)
        this.deviceInformation = {
          myPlatform: navigator.appVersion,
          myISP: response.data['isp'],
          myRegion: response.data['country'] + ' ' + response.data['regionName'],
        }
      })
    },
    methods: {
      mouseClick(value) {
        this.$http[value.method](value.url).then((response) => {
          console.log(response.data)
        })
      },
      valueChange(value) {
        console.log(value)
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
