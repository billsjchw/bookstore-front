<template>
  <div class="login-form d-flex flex-column align-items-center">
    <img :src="require('@/assets/images/logo.png')" alt="books"
         class="login-form__logo"/>
    <h2 class="mb-3 font-weight-normal">Bookstore</h2>
    <div class="w-100 mb-3">
      <b-form-input v-model="username" type="text" placeholder="Username"
                    size="lg" class="login-form__username-input" :state="usernameState"/>
      <b-form-input v-model="password" type="password" placeholder="Password"
                    size="lg" class="login-form__password-input" :state="passwordState"/>
    </div>
    <b-button @click="handleLogin" :disabled="submitting" block size="lg"
              variant="primary">Sign in</b-button>
    <div class="mt-3 mb-5"><a href="/register">Create an account</a></div>
  </div>
</template>

<script>
  import login_service from '@/services/login_service';

  export default {
    name: 'LoginForm',
    data() {
      return {
        username: '',
        password: '',
        submitting: false,
        usernameState: null,
        passwordState: null,
      };
    },
    methods: {
      handleLogin() {
        if (this.submitting)
          return;
        if (!this.username)
          this.usernameState = false;
        if (!this.password)
          this.passwordState = false;
        if (!this.username || !this.password)
          return;
        this.usernameState = null;
        this.passwordState = null;
        this.submitting = true;
        let basic = btoa(`${this.username}:${this.password}`);
        sessionStorage.setItem('basic', basic);
        login_service.login((msg) => {
          if (msg.status === 'SUCCESS') {
            sessionStorage.setItem('user', JSON.stringify(msg.data));
            this.$router.push('/');
          } else if (msg.status === 'UNAUTHORIZED') {
            this.$bvToast.toast(
              msg.data === 'DISABLED' ?
                  'Your account is disabled' :
                  'Wrong username/password',
              { variant: 'danger', title: 'Sign in - Failed'},
            );
          } else {
            this.$bvToast.toast(
              'Unknown error',
              { variant: 'danger', title: 'Sign in - Failed'},
            );
          }
          this.submitting = false;
        });
      },
    },
  };
</script>

<style scoped>
  .login-form {
    min-width: 300px;
    max-width: 300px;
  }
  .login-form__logo {
    min-width: 95px;
    max-width: 95px;
    min-height: 95px;
    max-height: 95px;
  }
  .login-form__username-input {
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    font-size: 16px;
  }
  .login-form__password-input {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    font-size: 16px;
  }
</style>
