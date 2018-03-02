<template>
  <div>
    <div id="cli" v-on:keypress="updateInput($event)" v-on:keydown.delete="remove($event)" v-on:keydown.enter="enter($event)" tabindex="0">
        <p>{{ title }}</p>
        <div class="messages" v-for="message in messages" v-bind:key="message.date">
        <span>{{ displayMessage(message) /* message.date + ': ' + message.message */ }}</span>
        </div>
        <div class="input flex"> <!-- flex to remove inline-block spacing between text and svg -->
        <span>{{ inputPre }}</span>
        <span class="input">{{ input }}</span>
        <svg class="cursor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="16" x2="0" y2="2" stroke-width="2" stroke="white"/>
            <animate attributeType="XML" attributeName="opacity" from="1" to="0" dur="0.7s" repeatCount="indefinite" />
        </svg>
        </div>
    </div>
    <a href="/test/" v-on:click.prevent="$router.push({ name: 'Test'})">Back to test page</a>
    <br/>
    <a href="/" v-on:click.prevent="$router.push({ name: 'HelloWorld'})">Back to home</a>
    <br/>
  </div>
</template>
<script>
export default {
  name: 'cli',
  data () {
    return {
      title: 'Console',
      messages: [],
      inputPre: '#>',
      input: ''
    }
  },
  methods: {
    updateInput: function (event) {
      event.preventDefault()
      this.input += String.fromCharCode(event.which)
    },

    remove: function (event) {
      event.preventDefault()
      this.input = this.input.slice(0, -1)
    },

    enter: function (event) {
      event.preventDefault()
      this.messages.push({ date: new Date().getTime(),
        message: this.input })
      this.input = ''
    },

    displayMessage: function (message) {
      return new Date(message.date).toLocaleTimeString('en-US', { hour12: false,
        hour: 'numeric',
        minute: 'numeric'}) + ': ' + message.message
    }
  },

  computed: { },
  mounted: function () {},
  updated: function () {
    var element = document.getElementById('cli')
    element.scrollTop = element.scrollHeight
  }
}
</script>
<style scoped>
#cli {
  height: 400px;
  background-color: black;
  color: white;
  word-wrap: break-word;
  overflow-y:scroll;
}
.flex{
  display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;      /* TWEENER - IE 10 */
  display: -webkit-flex;     /* NEW - Chrome */
  display: flex;
}
.messages{
  white-space: pre;
}
.input{
  white-space: pre;
}
</style>
