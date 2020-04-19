<template>
  <div class="home">
    <Graph></Graph>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Graph from '@/components/Graph.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Graph,
  }
}
</script>
