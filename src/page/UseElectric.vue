<template>
  <div class="body">
    <div>
      <div class="col-lg-4" style="margin-top: 50px">
        <div class="input-group">
          <input type="text" class="form-control col-md-4" placeholder="请输入电表号码" v-model="electricNum">
        </div>
        <select class="form-control col-md-4" v-model="type" title="请选择用电类型" style=" margin-top: -38px; margin-left: 35%; z-index: 10050 !important;">
          <option value="1">公用电</option>
          <option value="2">民用电</option>
        </select>
        <select class="form-control col-md-4" v-model="state" title="请选择用电类型" style=" margin-top: -38px; margin-left:70%; z-index: 10050 !important;">
          <option value="0" selected>停电</option>
          <option value="1">正常</option>
        </select>
      </div>
      <button class="btn btn-info" style="margin-top: -60px; margin-left: -20%" @click="selectBy()">搜索</button>
    </div>

    <div class="table-div">
      <table class="table table-striped">
        <thead>
        <tr>
          <th>编号</th>
          <th>电表编号</th>
          <th>用电类型</th>
          <th>电表状态</th>
          <th>上一次抄表数据</th>
          <th>账户余额</th>
          <th>缴费</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(electric,index) in electricInfo">
          <td>{{index+1}}</td>
          <td>{{electric.num}}</td>
          <td>{{electric.type == 1 ? '公用电' : '民用电'}}</td>
          <td>{{electric.state == 1 ? '正常' : '停电'}}</td>
          <td>{{electric.lastData}}</td>
          <td>{{electric.money}}</td>
          <td><button class="btn btn-info btn-lg" data-toggle="modal" style="height: 40px"
                      @click="dialogInfo = true, getelectricId(electric.electricId)">
            缴费
          </button>
          </td>
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
        electricInfo: null,
        dialogInfo: false,
        price: null,
        paymentMethod: 1,
        electricNum: null,
        type: null,
        state: null
      }
    },
    methods: {
      getElectricInfo(){
        service('get','/user/queryElectric/userId',{
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.electricInfo = data.data;
          console.log(this.electricInfo)
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
          this.dialogInfo = false;
          parent.location.reload();
        })
      },
      getelectricId(id){
        this.eleId = id;
        console.log(this.eleId)
      },
      selectBy(){
        service('get','/user/query/byCondition',{
          electricNum: this.electricNum,
          type: this.type,
          state: this.state
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.electricInfo = data.data;
        })
      }
    },
    mounted(){
      this.getElectricInfo();
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
