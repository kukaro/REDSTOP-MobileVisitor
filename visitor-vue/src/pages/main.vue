<template>
  <ion-app>
    <ion-page class="show-page">
      <ion-header>
        <ion-toolbar>
          <ion-buttons start>
            <button ion-button icon-only>
              <ion-icon name="search"></ion-icon>
            </button>
          </ion-buttons>
          <ion-title class="toolbar-background"><span class="title-color">Red Stop</span></ion-title>
          <ion-buttons end>
            <button ion-button icon-only color="royal">
              <ion-icon name="person-add"></ion-icon>
            </button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="content" padding>
        <ion-list>
          <ion-item v-for="item of items" v-bind:key="item.id">
            <ion-label full></ion-label>
          </ion-item>
        </ion-list>
      </ion-content>

    </ion-page>
  </ion-app>
</template>
<script>
  export default {
    name: 'Main',
    data() {
      return {
        items: [{id: 0, name: 'Ahmed'}, {id: 1, name: 'Naima'}]
      }
    }
  }
</script>

<style scoped>
  .toolbar-background {
    background-color: #526387;
  }

  .title-color {
    color: white;
  }

  .logo{
    width: 15px;
    height: 15px;
    font-weight: left;
  }
</style>
