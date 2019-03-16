<template>
  <div class="body">
    <div class="center-style">
      <h1>个人信息</h1>
      <hr/>
      <label style="margin-top: 20px">姓名:</label><input class="col-sm-10 form-control" v-model="userName" style="margin-left: 10%;"/>
      <label style="margin-top: 20px">电话:</label><input class="col-sm-10 form-control" v-model="userPhone" disabled style="margin-left: 10%"/>
      <button class="btn btn-info" style="margin-top: 50px;" @click="editUserInfo()">修改信息</button>
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
        userAddress: null
      }
    },
    methods: {
      getUserInfo(){
        service('get','/reader/query/readerId',{
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.userInfo = data.data;
          console.log(this.userInfo)
          this.userName = data.data.readerName;
          this.userPhone = data.data.readerPhone;
        })
      },
      editUserInfo(){
        service('get','/update/readerInfo', {
          userName: this.userName,
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          alert("修改成功！");
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
    width: 25%;
    height: 500px;
    background-color: grey;
    margin-left: 10%;
    border-radius: 5%;
    margin-top: 100px;
  }

</style>

