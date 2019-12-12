<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-globe" style="padding: 3px"></i>{{messagetitle}}</h3>
    <p>Check how many vending machines we have deployed and where they are!</p>
    <p>
    <GmapMap
      :center="{lat:53.1424, lng:-7.6921}"
      :zoom="6"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
      class="center"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'Map',
    data () {
      return {
        messagetitle: ' Google Map ',
        markers: [
          {
            position: {
              lat:52.2593,
              lng: -7.1101
            },
            infoText: 'Waterford'
          },
          {
            position: {
              lat:53.3498,
              lng:-6.2603
            },
            infoText: 'Dublin'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
</style>
