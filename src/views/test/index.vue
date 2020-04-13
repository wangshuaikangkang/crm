<template>
    <div>
        <h1>{{data.til}}</h1>
        <loop v-for="i in data.children" :data='i' :key='i.til'></loop>
    </div>
</template>
<script>
// @ is an alias to /src
export default {
    name: 'loop',
    props:['data'],
    data() {
        return {
             ary:[
                {
                    til:'1',
                    children:[
                        {
                            til:'1-1',
                            children:[
                                {
                                    til:'1-1-1'
                                }
                            ]
                        },
                        {
                            til:'1-2'
                        }
                    ]
                },
                {
                    til:'2',
                    children:[
                        {
                            til:'2-1'
                        },
                        {
                            til:'2-2',
                            children:[
                                {
                                    til:'1-1-1'
                                }
                            ]
                        }
                    ]
                }
            ]

        }
    },
    components: {
        
    }
}
</script>
<style lang="less">

</style>