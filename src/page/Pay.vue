<template>
  <div class="body">
  <div>
    <div class="col-lg-4" style="margin-top: 50px">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="请输入电表号码" v-model="electricNum">
      </div>
    </div>
    <button class="btn btn-info" style="margin-top: -60px; margin-left: -30%" @click="selectByNum()">搜索</button>
  </div>
  <div class="table-div">
    <table class="table table-striped">
      <thead>
      <tr>
        <th>编号</th>
        <th>电表编号</th>
        <th>缴费金额</th>
        <th>电表状态</th>
        <th>缴费方式</th>
        <th>缴费时间</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(record,index) in paymentInfo">
        <td>{{index+1}}</td>
        <td>{{record.electricNum}}</td>
        <td>{{record.money}}</td>
        <td>{{record.payEleState == 1 ? '正常' : '停电'}}</td>
        <td>{{record.payMethod == 0 ? '现金' : '微信'}}</td>
        <td>{{record.updateTime}}</td>
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
        electricNum: null,
        paymentInfo: null,
        dialogInfo: false,
        price: null,
        paymentMethod: 1,
        eleId: null
      }
    },
    methods: {
      getPaymentInfo(){
        service('get','/user/pay/record', {

        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.paymentInfo = data.data;
          console.log(this.paymentInfo)
        })
      },
      selectByNum(){
        service('get','/user/selectByNum',{
          num: this.electricNum
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.paymentInfo = data.data;
        })
      },
      getelectricId(id){
        this.eleId = id;
        console.log(this.eleId)
      }
    },
    mounted(){
      this.getPaymentInfo()
    }
  }
</script>
<style scoped>
  .body {
    width: 100%;
    height: 100%;
  }

  .table-div {
    width: 90%;
    height: 600px;
    margin-top: 50px;
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

  .pay-div {
      width: 150px;
    height: 200px;
    background: #000;
  }
</style>
