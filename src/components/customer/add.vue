<template>
  <div>
    <div ref="box1" style="width:300px;height:300px"></div>
  </div>
</template>
<script>
// @ is an alias to /src
import echarts from "echarts";
import option1 from "./echartsOption/1.js";
export default {
  name: "add",
  data() {
    return {};
  },
  mounted() {
    this.initBox1();
  },
  methods: {
    initBox1() {
      var myChart = echarts.init(this.$refs.box1);
      // 绘制图表
      $.get(ROOT_PATH + "data/asset/data/lines-bus.json", function(data) {
        var busLines = [].concat.apply(
          [],
          data.map(function(busLine, idx) {
            var prevPt;
            var points = [];
            for (var i = 0; i < busLine.length; i += 2) {
              var pt = [busLine[i], busLine[i + 1]];
              if (i > 0) {
                pt = [prevPt[0] + pt[0], prevPt[1] + pt[1]];
              }
              prevPt = pt;

              points.push([pt[0] / 1e4, pt[1] / 1e4]);
            }
            return {
              coords: points
            };
          })
        );
      });
      myChart.setOption(option1);
    }
  },
  components: {}
};
</script>
<style lang="less">
</style>