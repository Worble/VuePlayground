<template>
    <div>
        <div>
            <clicker class="test-element"></clicker>
            <cli class="test-element"></cli>
        </div>
        <div>
        <a href="/test/clicker" v-on:click.prevent="$router.push({ name: 'Clicker'})">Clicker only</a>
        <br/>
        <a href="/test/cli" v-on:click.prevent="$router.push({ name: 'Cli'})">CLI only</a>
        <br/>
        <a href="/" v-on:click.prevent="$router.push({ name: 'HelloWorld'})">Back to home</a>
        </div>
    </div>
</template>
<script>
import Cli from '@/components/Cli'
import Clicker from '@/components/Clicker'

export default {
  name: 'Test',
  components: {
    'clicker': Clicker,
    'cli': Cli
  }
}
</script>
<style scoped>
.test-element{
    float:left;
    width:50%;
}
</style>
