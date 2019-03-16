<template>
  <div class="body">
    <div>
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
          <!--<th>电表编号</th>-->
          <!--<th>电表余额</th>-->
          <!--<th>缴费状态</th>-->
          <!--<th>缴费方式</th>-->
          <!--<th>缴费</th>-->
        </tr>
        </thead>
        <tbody>
        <!--<tr v-for="(payment,index) in paymentInfo">-->
          <!--<td>{{index+1}}</td>-->
          <!--<td>{{payment.electricId}}</td>-->
          <!--<td>{{payment.money}}</td>-->
          <!--<td>{{payment.paymentState == 0 ? '未缴费': '已缴费'}}</td>-->
          <!--<td>{{payment.paymentMethod == 1 ? '现金' : '微信'}}</td>-->
          <!--<td><button class="btn btn-info btn-lg" data-toggle="modal" style="height: 40px"-->
                      <!--@click="dialogInfo = true, getelectricId(payment.electricId)">-->
            <!--缴费-->
          <!--</button></td>-->
        <!--</tr>-->
        </tbody>
      </table>
    </div>
    <div v-show="dialogInfo" class="dialog">
      <div class="mask"></div>
      <div class="float_frame">
        <div class="modal-header">
          <span><strong>缴费</strong></span>
        </div>
        <!--<div style="margin-top: 20px">-->
          <!--<label>金额：</label><input style="border-radius: 5%" type="text" v-model="price"/>-->
        <!--</div>-->
        <div style="margin-top: 20px">
          <button class="btn btn-info" @click="dialogInfo=false">取消</button>
          <button class="btn btn-info" style="margin-left: 80px" @click="payMoney()">微信缴费</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        dialogInfo: false
      }
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
</style>
