<template>
  <div id="container">
    <slot />
  </div>
</template>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top:50%;
  transform: translateY(-50%);
  height: 35em;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 4.5em;
}
</style>
