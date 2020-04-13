<template>
    <el-container>
            <my-aside :ary="option"  width="200px"></my-aside>
            <el-main><router-view></router-view></el-main>
            </el-container>
</template>
<script>
// @ is an alias to /src
import nav from '@/components/nav.vue'
import option from '@/router/customter.js'
export default {
    name: 'XXX',
    data() {
        return {
             option:option
        }
    },
    components: {
          'my-aside':nav
    }
}
</script>
<style lang="less">

</style>