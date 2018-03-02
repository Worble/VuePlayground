<template>
    <div>
        <div>
            <cli></cli>
        </div>
        <div>
            <a href="/test" v-on:click.prevent="$router.push({ name: 'Test'})">Back to test page</a>
            <br/>
            <a href="/" v-on:click.prevent="$router.push({ name: 'HelloWorld'})">Back to home</a>
            <br/>
        </div>
    </div>
</template>
<script>
import Cli from '@/components/Cli'

export default {
  name: 'CliContainer',
  components: {
    'cli': Cli
  }
}
</script>
