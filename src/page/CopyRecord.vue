<template>
  <div class="body">
    <div>
      <div class="col-lg-4" style="margin-top: 50px">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="请输入电表号码" v-model="electricNum">
        </div>
      </div>
      <button class="btn btn-info" style="margin-top: -60px; margin-left: -30%" @click="selectByNums()">搜索</button>
    </div>
    <div class="table-div">
      <table class="table table-striped">
        <thead>
        <tr>
          <th>编号</th>
          <th>电表编号</th>
          <th>用户名</th>
          <th>用户电话</th>
          <th>抄表数据</th>
          <th>时间</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(record,index) in recordInfo">
          <td>{{index+1}}</td>
          <td>{{record.electricNum}}</td>
          <td>{{record.userName}}</td>
          <td>{{record.userPhone}}</td>
          <td>{{record.copyData}}</td>
          <td>{{record.addTime}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import {service} from '../js/api'

  export default {
    data(){
      return{
        dialogInfo: false,
        recordInfo: null,
        total:0,
        pagesize:9,
        currentPage:1,
        electricNum: null
      }
    },
    methods: {
      getRecordInfo(){
        service('get','/reader/queryAll',{
        }).then(data => {
          if (data.code !== 200){
            alert(data.message);
            return;
          }
          this.recordInfo = data.data;
          console.log(this.recordInfo)
        })
      },
      selectByNums(){
        service('get','/reader/selectByNum',{
          num : this.electricNum
        }).then(data => {
          if (data.code !== 200){
            alert(data.message);
            return
          }
          this.recordInfo = data.data;
        })
      }
    },
    mounted(){
      this.getRecordInfo();
    }
  }
</script>
<style scoped>
  .body {
    width: 100%;
    height: 100%;
  }

  .table-div {
    overflow:scroll;
    width: 90%;
    height: 700px;
    margin-top: 50px;
    background-color: cadetblue;
  }

  .dialog {

  }

  .mask {
    position: fixed;
    width: 110%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .float_frame {
    width: 20%;
    height: 200px;
    background-color: white;
    top: 300px;
    position: fixed;
    border-radius: 5%;
    margin-left: 30%;
  }
</style>
