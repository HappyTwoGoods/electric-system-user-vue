<template>
  <div class="body">
    <button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" style="margin-top: 50px; margin-left: 90%; width: 130px; height: 47px">
      注册用户
    </button>
    <!-- 模态框（Modal） -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="margin-left: 95%;margin-top: -30px">
            &times;
          </button>
          <h4 class="modal-title" id="myModalLabel" style="margin-left: -80%">
            用户注册
          </h4>
        </div>
        <div class="modal-body">
          <div class="register-div">
            <label style="margin-top: 20px">姓名:</label><input class="col-sm-10 form-control" v-model="userName" style="margin-left: 10%;"/>
            <label style="margin-top: 20px">电话:</label><input class="col-sm-10 form-control" v-model="userPhones" style="margin-left: 10%"/>
            <label style="margin-top: 20px">账号:</label><input class="col-sm-10 form-control" v-model="userAccount" style="margin-left: 10%"/>
            <label style="margin-top: 20px">身份证:</label><input class="col-sm-10 form-control" v-model="idCard" style="margin-left: 10%"/>
            <label style="margin-top: 20px">家庭住址:</label><input class="col-sm-10 form-control" v-model="userAddress" style="margin-left: 10%"/>
            <label style="margin-top: 20px">账户余额:</label><input class="col-sm-10 form-control" v-model="price" style="margin-left: 10%"/>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭
          </button>
          <button type="button" class="btn btn-primary" @click="Register()">
            提交更改
          </button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal -->
  </div>
    <button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#readerModal" style="margin-top: 50px; margin-left: 90%">
      抄表员登录
    </button>
    <!-- 模态框（Modal） -->
    <div class="modal fade" id="readerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content" style="background-color: lightslategray">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="margin-left: 95%;margin-top: -30px">
              &times;
            </button>
            <h4 class="modal-title" style="margin-left: -80%">
              抄表员登录
            </h4>
          </div>
          <div class="modal-body">
            <div id="reader-div">
              <div class="form-group">
                <div class="col-md-11" style="margin-left: 12%">
                  <input class="form-control" type="text"  placeholder="请输入电话号码" v-model="readerPhone"/>
                </div>
                <button class="btn btn-info" style="margin-top: -65px; margin-left: 70%;" id="searchs" @click="getReaderCode()">获取验证码</button>
              </div>
              <div class="form-group" style="margin-top: 50px">
                <div class="col-md-11" style="margin-left: 12%">
                  <input class="form-control" type="text" v-model="readerCode" placeholder="请输入验证码" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭
            </button>
            <button type="button" class="btn btn-primary" @click="readerLogin()">
              抄表员登录
            </button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>
    <div class="container" id="top">
      <div class="row" style="margin-top: 240px;">
        <div class="col-md-offset-4 col-md-4">
          <div style="width: 320%">
            <h1 id='login_title'>用户登录</h1>
          </div>
        </div>
      </div>
      <div class="row" style="width: 100%">
        <div class="col-md-4" >
        </div>
        <div class="col-md-4" id='login_box'>
          <form class="form-horizontal">
            <div class="form-group">
              <div class="col-md-11" style="margin-left: 4%">
                <input class="form-control" type="text"  placeholder="请输入电话号码" v-model="userPhone"/>
              </div>
              <button class="btn btn-info" style="margin-top: -65px; margin-left: 70%" id="search" @click="getCode()">获取验证码</button>
            </div>
            <div class="form-group" style="margin-top: 30px">
              <div class="col-md-11" style="margin-left: 4%">
                <input class="form-control" type="text" v-model="code" placeholder="请输入验证码" />
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-offset-7 col-md-5">
                <input type="submit" class="btn btn-info" value="登录" style="margin-left: 110%" @click="userLogin()"/>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-4" >
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
        userPhone: null,
        code: null,
        userName: null,
        userPhones: null,
        userAccount: null,
        idCard: null,
        price: null,
        userAddress: null,
        readerPhone: null,
        readerCode: null
      }
    },
    methods:{
      getCode(){
        service('get','/user/verifyCode', {
          userPhone: this.userPhone
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          console.log(data.message);
          alert("您的验证码为："+data.message);
        })
      },
      userLogin(){
        service('get','/user/login',{
          userPhone: this.userPhone,
          code: this.code
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          alert("登录成功！");
          this.$router.push({path: '/'})
        })
      },
      Register(){
        service('post','/user/register',{
          userName: this.userName,
          userPhone: this.userPhones,
          userAccount: this.userAccount,
          userAddress: this.userAddress,
          idCard: this.idCard,
          price: this.price
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          alert("注册成功！");
          $('#myModal').modal("hide");
        })
      },
      getReaderCode() {
        service('get','/reader/verifyCode',{
          readerPhone: this.readerPhone
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          console.log(data.message);
          alert("您的验证码为："+data.message);
        })
      },
      readerLogin() {
        service('get','/reader/login',{
          readerPhone: this.readerPhone,
          code: this.readerCode
        }).then(data => {
          if (data.code !== 200) {
            alert(data.message);
            return;
          }
          alert("登录成功！");
          $('#readerModal').modal("hide");
          this.$router.push({path: '/Reader'})
        })
      }
    }
  }

</script>
<style scoped>
  .body{
    background: url(../assets/login.jpg) no-repeat;
    background-size:100% 100%;
  }
  #login_box{
    padding: 35px;
    border-radius:15px;  /*div圆角*/
    opacity: 0.6;
    background: #56666B;
    color: #fff;
  }
  #login_title{
    color: #000000;
  }

  #search{
    position:absolute;
    width:110px;
    height:38px;
    top:100px;
    left:-60px;
    z-index:99;
  }

  #searchs{
    position:absolute;
    width:110px;
    height:38px;
    top:81px;
    left:-43px;
    z-index:99;
  }

  .register-div {
    width: 400px;
    height:600px;
    /*background-color: darkcyan;*/
    margin-left: 33px;
  }

  #reader-div{
    width: 400px;
    height: 200px;
  }
</style>
