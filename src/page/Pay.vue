<template>
  <div class="body">
  <div>
    <!--<input type="text" class="input-style" placeholder="请输入电表号码"/><button class="button-style">查询</button>-->
    <div class="col-lg-4" style="margin-top: 50px">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="请输入电表号码">
      </div>
    </div>
    <button class="btn btn-info" style="margin-top: -60px; margin-left: -30%">搜索</button>
  </div>
  <div class="table-div">
    <table class="table table-striped">
      <thead>
      <tr>
        <th>编号</th>
        <th>电表编号</th>
        <th>电表余额</th>
        <th>缴费状态</th>
        <th>缴费方式</th>
        <th>缴费</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(payment,index) in paymentInfo">
        <td>{{index+1}}</td>
        <td>{{payment.electricId}}</td>
        <td>{{payment.money}}</td>
        <td>{{payment.paymentState == 0 ? '未缴费': '已缴费'}}</td>
        <td>{{payment.paymentMethod == 1 ? '现金' : '微信'}}</td>
        <td><button class="btn btn-info btn-lg" data-toggle="modal" style="height: 40px"
                    @click="dialogInfo = true, getelectricId(payment.electricId)">
          缴费
        </button></td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-show="dialogInfo" class="dialog">
    <div class="mask"></div>
    <div class="float_frame">
      <div class="modal-header">
        <span><strong>缴费</strong></span>
      </div>
      <div style="margin-top: 20px">
        <label>金额：</label><input style="border-radius: 5%" type="text" v-model="price"/>
      </div>
      <div style="margin-top: 20px">
        <button class="btn btn-info" @click="dialogInfo=false">取消</button>
        <button class="btn btn-info" style="margin-left: 80px" @click="payMoney()">微信缴费</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import {service} from '../js/api'
  export default {
    data(){
      return{
        paymentInfo: null,
        dialogInfo: false,
        price: null,
        paymentMethod: 1,
        eleId: null
      }
    },
    methods: {
      getPaymentInfo(){
        service('get','/user/query/payment', {

        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.paymentInfo = data.data.paymentInfo;
          console.log(this.paymentInfo)
        })
      },
      payMoney(){
        service('get','/user/payMoney',{
          paymentMethod: this.paymentMethod,
          money: this.price,
          electricId: this.eleId
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          alert("缴费成功！");
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
