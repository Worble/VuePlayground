<template>
    <div>
        <div>
            <clicker></clicker>
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
import Clicker from '@/components/Clicker'

export default {
  name: 'ClickerContainer',
  components: {
    'clicker': Clicker
  }
}
</script>
