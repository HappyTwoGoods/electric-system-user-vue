<template>
  <div class="body">
    <div class="center-style">
      <h1>绑定电表</h1>
      <label style="margin-top: 20px">电表编号:</label><input class="col-sm-10 form-control" v-model="electricNum" style="margin-left: 10%;"/>
      <button class="btn btn-info" style="margin-top: 100px;" @click="BandElec()">确定</button>
    </div>
  </div>
</template>
<script>
  import {service} from '../js/api'
  export default {
    data(){
      return{
        electricNum: null
      }
    },
    methods:{
      BandElec(){
        service('get','/user/band/userInfo',{
          electricNum: this.electricNum
        }).then(data => {
          if (data.code !== 200){
            alert(data.message);
            return;
          }
          alert("绑定成功！")
        })
      }
    }
  }
</script>
<style scoped>
  .center-style {
    width: 30%;
    height: 400px;
    background-color: cadetblue;
    opacity: 0.8;
    margin-left: 30%;
    border-radius: 5%;
    margin-top: 100px;
  }
</style>
