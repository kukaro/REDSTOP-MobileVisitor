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
                <ion-label>{{value}}</ion-label>
              </ion-item>
            </div>
          </ion-list>
      </ion-content>
    </ion-page>
  </ion-app>
</template>
<script>
export default {
  name: 'Main',
  data () {
    return {
      items: [{url: 0, name: 'Ahmed'}, {id: 1, name: 'Naima'}]
    }
  },
  methods:{
    mouseClick(value){
      console.log(value.name)
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
