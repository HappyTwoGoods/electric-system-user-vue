<template>
  <div class="body">
    <div class="header-div">
      <div class="title-div">
        <img src="../assets/title.jpg" style="width: 100%; height: auto; border-radius: 50%"/>
      </div>
      <div class="p-div">
        <p><strong>{{userName}}</strong></p>
      </div>
      <div><p style="font-style: italic; font-size: 40px; margin-top: -50px">用电管理系统</p></div>
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
    name: 'HelloWorld',
    data() {
      return {
        userName: null,
        navList: [
          {
            'path': '/UserHome',
            'name': '首页'
          },
          {
            'path': '/UseElectric',
            'name': '电表信息'
          },
          {
            'path': '/Pay',
            'name': '缴费记录'
          },
          {
            'path': '/UserInfo',
            'name': '个人信息'
          },
          {
            'path': '/BandElectric',
            'name': '绑定电表'
          }
        ]
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
          this.userName = data.data.userName
        })
      },
      logout(){
        service('get','/user/logout',{
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          this.$router.push({path: '/Login'})
        })
      }
    },
    mounted(){
      this.getUserInfo();
    },
    computed: {
      activeRoute() {
        return this.$route.path
      },
    }
  }
</script>
<style>
  .body{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1;
  }
  .header-div {
    width: 100%;
    height: 10%;
    background-color: slategrey;
    border-bottom: solid black;
  }
  .left-div {
    width: 10%;
    height: 90%;
    background-color: slategrey;
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

  .button-style {
    width: 80px;
    height: 40px;
    border-radius: 10%;
    background-color: cadetblue;
  }
  .span-div {
    font-size: 20px;
    text-decoration:none;
    out-line: none
  }
</style>
