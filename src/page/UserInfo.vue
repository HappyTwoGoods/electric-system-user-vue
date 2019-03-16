<template>
  <div class="body">
    <div class="center-style">
      <h1>个人信息</h1>
      <hr/>
      <label style="margin-top: 20px">姓名:</label><input class="col-sm-10 form-control" v-model="userName" style="margin-left: 10%;"/>
      <label style="margin-top: 20px">电话:</label><input class="col-sm-10 form-control" v-model="userPhone" disabled style="margin-left: 10%"/>
      <label style="margin-top: 20px">账号:</label><input class="col-sm-10 form-control" v-model="userAccount" style="margin-left: 10%"/>
      <label style="margin-top: 20px">身份证:</label><input class="col-sm-10 form-control" v-model="idCard" style="margin-left: 10%"/>
      <label style="margin-top: 20px">家庭住址:</label><input class="col-sm-10 form-control" v-model="userAddress" style="margin-left: 10%"/>
      <label style="margin-top: 20px">账户余额:</label><input class="col-sm-10 form-control" disabled v-model="price" style="margin-left: 10%"/>
      <button class="btn btn-info" style="margin-top: 50px;" @click="editUserInfo()">修改信息</button>
    </div>
    <div class="pay-div">
      <h1>充值</h1>
      <label style="margin-top: 50px">充值金额</label>
      <select class="form-control col-md-4" v-model="addPrice" title="请选择用电类型" style="margin-left: 35%">
        <option value="10">￥10</option>
        <option value="20">￥20</option>
        <option value="50">￥50</option>
        <option value="100">￥100</option>
        <option value="200">￥200</option>
      </select>
      <button class="btn btn-info" style="margin-top: 100px;" @click="addUserPrice()">确认充值</button>
    </div>
  </div>
</template>
<script>
  import {service} from '../js/api'

  export default {
    data(){
      return{
        userInfo: null,
        userName: null,
        userPhone: null,
        userAccount: null,
        idCard: null,
        price: null,
        userAddress: null,
        addPrice: null
      }
    },
    methods: {
      getUserInfo(){
        service('get','/user/query/userId',{
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.userInfo = data.data;
          console.log(this.userInfo)
          this.userName = data.data.userName;
          this.userPhone = data.data.userPhone;
          this.userAccount = data.data.userAccount;
          this.idCard = data.data.idCard;
          this.userAddress = data.data.userAddress;
          this.price = data.data.price;
        })
      },
      editUserInfo(){
        service('get','/user/update/userInfo', {
          userName: this.userName,
          userAccount: this.userAccount,
          userAddress: this.userAddress
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          alert("修改成功！");
        })
      },
      addUserPrice(){
        service('get','/user/add/price',{
          addPrice: this.addPrice
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          alert("充值成功！");
          parent.location.reload();
        })
      }
    },
    mounted(){
      this.getUserInfo();
    }
  }

</script>
<style scoped>
  .body {
    width: 100%;
    height: 100%;
    background-color: darkgray;
  }

  .center-style {
    width: 30%;
    height: 800px;
    background-color: grey;
    margin-left: 10%;
    border-radius: 5%;
    margin-top: 50px;
  }

  .pay-div{
    width: 30%;
    height: 400px;
    background-color: grey;
    margin-left: 50%;
    border-radius: 5%;
    margin-top: -700px;
  }

</style>
