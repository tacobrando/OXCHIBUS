<template>
  <div id="app">
    <div id="title">
      <h1>牛津華商</h1>
      <h1>Oxford Chinese Businesses</h1>
      <h3>1910 to 1980</h3>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
html, body{
  margin: 0;
  padding: 0;
}
</style>
