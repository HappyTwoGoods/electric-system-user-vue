<template>
  <div>
    <div class="float-div" id="toLeft">
    </div>
    <label>请输入编号</label><input type="text" v-model="eleNum"/><button @click="getChars()">确定</button>
    <div id="box" class="box-style"></div>
    <table class="table table-hover" style="margin-top: 100px; width: 45%; margin-left: 3%">
      <caption style="margin-top: -200px">国家统一用电价格表</caption>
      <thead>
      <tr>
        <th>序号</th>
        <th>用电类型</th>
        <th>价格/°</th>
        <th>确定时间</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(types,index) in typeData">
        <td>{{index+1}}</td>
        <td>{{types.typeNum}}</td>
        <td>￥{{types.price}}</td>
        <td>{{types.updateTime}}</td>
      </tr>
      </tbody>
    </table>
    <div class="text-div">
      <hr/>
      <span class="text-warning" style="font-size: 20px">用电管理系统根据各电力部门对电力用户的管理与电力收费的实际情况设计开发完成。通过对电力局（电力公司）近一年的系统分析研究，在充分了解熟悉供电局业务需求和使用习惯的基础上，完全从供电局使用的角度出发开发完成了一套完整的解决方案--《用电管理系统》。该系统经过一年多的使用，并通过在网上发布试用软件，以更加充分收集了解用户需求。通过上千用户下载使用，多次修改完善，实现了本软件在适用性、
        易用性与强大的功能完美结合，完全满足了供电局对下级供电所的管理以及供电所对日常工作处理。
        是各供电部门对电力用户管理、收费以及经营分析统计不可缺少的管理工具软件。通过本软件，
        可以轻松实现对用供电管理科技化、 系统化、信息化、实现无纸办公。</span>
      <hr/>
    </div>
  </div>
</template>
<script>
  import {service} from '../js/api'
  import Chart from 'echarts'
  export default {
    data(){
      return{
        typeData: null,
        eleNum: 0,
        eleData: null,
      }
    },
    methods: {
      getTypeInfo(){
        service('get','/user/queryType',{
        }).then(data => {
          if (data.code !== 200){
            alert(data.message);
            return
          }
          this.typeData = data.data;
          console.log(this.typeData)
        })
      },
      getSendMessage(){
        service('get','/user/send/remind',{
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return
          }
          for(let i = 0; i < data.data.length; i++){
            let colors = ["red","green","pink","hostpink","cyan","purple","deepskyblue","yellowgreen"];
            let randomcolor = parseInt(Math.random()*(colors.length));
            let randomY = parseInt(Math.random()*50);
            let span = $("<span></span>");//创建span
            span.text("***您有欠费电表:"+data.data[i]+",请及时缴费***");//设置内容
            span.css("font-size","18px");
            span.css("color",colors[randomcolor]);
            $(".float-div").append(span);
            $(".float-div").animate({left:1400},10000,"linear",function(){
              //到了终点，需要删除内容
              $(this).remove();
            })//添加动画
            span.appendTo(".float-div");
            $(".float-div").val("");
          }
        })
      },
      getChars(){
        service('get','/user/getEachars',{
          num: this.eleNum
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.eleData = data.data;
          let seriesData = [];
          this.eleData.forEach(function (item) {
            let outObj = {};
            outObj.name = item.updateTime;
            outObj.value = item.copyData;
            seriesData.push(outObj);
          });
          let myChart = Chart.init(document.getElementById("box"));
          let option = {
            title: {
              text: '过去7次用电量记录统计',
            },
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: seriesData.map(function (times) {
                return times.name;
              }),
              axisLine:{
                lineStyle:{
                  color:'red'
                }
              },
              axisLabel:{
                rotate:30,
                interval:0
              },
            },
            yAxis : [
              {
                type : 'value',
                axisLabel : {
                  formatter: '{value} °'
                }
              }
            ],
            series: [
              {
                name:'电表记录',
                type:'line',
                symbolSize:4,
                color:['red'],
                data: seriesData.map(function (data) {
                  return data.value;
                }),
                smooth:false,
                itemStyle:{
                  normal:{
                    lineStyle:{
                      width:2,
                      type:'dotted'
                    }
                  }
                }
              },
            ]
          };
          myChart.setOption(option);
        });
      }
    },
    mounted(){
      this.getTypeInfo();
      this.getSendMessage();
    }
  }


</script>
<style scoped>
  .text-div {
    width: 45%;
    height: 500px;
    margin-left: 55%;
    margin-top: -50px;
  }

  .float-div {
    width: 100%;
    height: 50px;
    background-color: yellow;
    margin-top: 50px;
  }

  .box-style {
    width: 800px;
    height: 400px;
    margin-left: 25%;
    margin-top: 100px;
  }
</style>
