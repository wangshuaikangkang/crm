<template>
  <div style="padding:10px">
      <my-loop v-for="item in ary" :data='item' :key="item.til"></my-loop>
  </div>
</template>
<script>
// @ is an alias to /src
import qqq from './index'
export default {
  name: "XXX",
  data() {
    return {
      ary: [
        {
          til: "1",
          children: [
            {
              til: "1-1",
              children: [
                {
                  til: "1-1-1"
                }
              ]
            },
            {
              til: "1-2"
            }
          ]
        },
        {
          til: "2",
          children: [
            {
              til: "2-1"
            },
            {
              til: "2-2",
              children: [
                {
                  til: "1-1-1"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  components: {
      'my-loop':qqq
  }
};
</script>
<style lang="less">
</style>