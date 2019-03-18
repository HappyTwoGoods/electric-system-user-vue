<template>
  <div>
    <table class="table table-hover" style="margin-top: 100px;width: 90%; margin-left: 5%">
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
  export default {
    data(){
      return{
        typeData: null,
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
      }
    },
    mounted(){
      this.getTypeInfo();
    }
  }


</script>
<style scoped>
  .text-div {
    width: 50%;
    height: 500px;
    /*background-color: darksalmon;*/
    margin-left: 20%;
    margin-top: 300px;
  }
</style>
