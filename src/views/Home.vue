<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <GraphSearch></GraphSearch>
    <Graph></Graph>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Graph from '@/components/Graph.vue'
import GraphSearch from '@/components/GraphSearch.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Graph,
    GraphSearch
  }
}
</script>
