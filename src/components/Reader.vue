<template>
  <div class="body">
    <div class="header-div">
      <div class="title-div">
        <img src="../assets/title.jpg" style="width: 100%; height: auto; border-radius: 50%"/>
      </div>
      <div class="p-div">
        <p><strong>{{readerName}}</strong></p>
      </div>
      <div class="button-div">
        <button class="btn btn-info" @click="logout()">退出登录</button>
      </div>
    </div>
    <div class="left-div">
      <footer>
        <div v-for='item in navList' class="bottomDiv">
          <router-link :to='item.path'>
            <span class="span-div">{{item.name}}</span>
          </router-link>
        </div>
      </footer>
    </div>
    <div class="center-div">
      <router-view/>
    </div>
  </div>
</template>
<script>
  import {service} from '../js/api'
  export default {
    data(){
      return{
        readerName: null,
        navList: [
          {
            'path': '/CopyRecord',
            'name': '抄表记录'
          },
          {
            'path': '/ReaderInfo',
            'name': '个人信息'
          },
        ]
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
          this.readerName = data.data.readerName
        })
      },
      logout(){
        service('get','/reader/logout',{
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.$router.push({path: '/Login'})
        })
      }
    }
  }
</script>
<style scoped>
  .body{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1;
  }
  .header-div {
    width: 100%;
    height: 10%;
    background-color: black;
    opacity: 0.8;
    border-bottom: solid black;
  }
  .left-div {
    width: 10%;
    height: 90%;
    opacity: 0.8;
    background-color: black;
  }
  .center-div {
    width: 90%;
    height: 90%;
    margin-left: 10%;
    margin-top: -45.8%;
  }

  .bottomDiv {
    width: 100%;
    height: 50px;
    background-color: cadetblue;
    border-bottom: solid gainsboro;
  }

  .title-div {
    width: 4%;
    height: auto;
    border-radius: 50%;
    margin-left: 2%;
    padding-top: 10px;
  }

  .p-div {
    margin-top: -50px;
    margin-left: -80%;
  }

  .button-div {
    width: 10%;
    height: 50px;
    margin-left: 90%;
    margin-top: -50px;
  }

  .span-div {
    font-size: 20px;
    text-decoration:none;
    out-line: none
  }
</style>
