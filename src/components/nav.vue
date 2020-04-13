<template>
  <el-aside width="200px" style="   overflow-x: hidden">
    <div class="asideBox">
      <el-row class="tac">
        <el-col>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#d3dce6"
            text-color="#333"
          >
            <!-- v-if='power.indexOf(item[0].meta.power)!=-1' -->
            <el-submenu
              class="nycolor"
              v-for="(item,index) in menuList"
              :index="index+''"
              :key="index"
            >
              <template slot="title">
                <i :class="item[0].meta.icon"></i>
                <span>{{item[0].meta.rootTil}}</span>
              </template>
              <!-- :route="{path:v.path}" -->
              <router-link v-for="(v,i) in item" :to="v.path" :key="index+'-'+i">
                <el-menu-item :index="index+'-'+i">{{v.meta.til}}</el-menu-item>
              </router-link>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </el-aside>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  props: ["ary"],
  data() {
    return {
      menuList: [],
      power: localStorage.getItem("POWER")
    };
  },
  created() {
    this.menu();
  },
  methods: {
    menu() {
      let t = [this.ary[0]]; // 把6项拆成3项
      this.ary.reduce((prev, cur) => {
        if (prev.meta.type == cur.meta.type) {
          t.push(cur);
        } else {
          this.menuList.push(t);
          t = [cur];
        }
        return cur;
      });
      this.menuList.push(t);
      console.log(this.menuList);
      //权限效验
      this.menuList = this.menuList.filter(item => {
        if (!this.power) {
          return false; //若不存在，则数组为空
        }
        return this.power.includes(item[0].meta.power);
      });
      //权限效验之后，设置默认的跳转路径
      let url = this.menuList[0] && this.menuList[0][0].path;
      let ary = this.$route.path.split("/");
      if (ary.length > 2 && ary.pop().length > 0) {
        // 说明路径是在二级路径下，这时什么也不用做
        //ary.length>2 说明至少由两个 /
        // ary.pop().length>0 说明最后一项的长度不是0； 也就是第二个/后边有内容， 也就是当前是二级路径
      } else {
        this.$router.push(url);
        this.$forceUpdate();
      }
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.tac {
  overflow: hidden;
}
.asideBox {
  height: 100%;
  width: 110%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>