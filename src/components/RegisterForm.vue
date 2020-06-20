<template>
  <div class="register-form">
    <div class="d-flex flex-column align-items-center">
      <div>
        <img :src="require('@/assets/images/logo.png')" alt="books"
             class="register-form__logo"/>
      </div>
      <h2>Create an Account</h2>
    </div>
    <div class="mt-2">
      <label>Username</label>
      <b-form-group :invalid-feedback="invalidFeedback.username">
        <b-form-input type="text" v-model="model.username" :state="state.username"/>
      </b-form-group>
    </div>
    <div class="mt-2">
      <label>Password</label>
      <b-form-group :invalid-feedback="invalidFeedback.password">
        <b-form-input type="password" v-model="model.password" :state="state.password"/>
      </b-form-group>
    </div>
    <div class="mt-2">
      <label>Confirmation Password</label>
      <b-form-group :invalid-feedback="invalidFeedback.confirmation">
        <b-form-input type="password" v-model="model.confirmation" :state="state.confirmation"/>
      </b-form-group>
    </div>
    <div class="d-flex mt-2">
      <div class="flex-fill">
        <label>First Name</label>
        <b-form-group :invalid-feedback="invalidFeedback.firstName">
          <b-form-input type="text" v-model="model.firstName" :state="state.firstName"/>
        </b-form-group>
      </div>
      <div class="flex-fill ml-2">
        <label>Last Name</label>
        <b-form-group :invalid-feedback="invalidFeedback.lastName">
          <b-form-input type="text" v-model="model.lastName" :state="state.lastName"/>
        </b-form-group>
      </div>
    </div>
    <div class="mt-2">
      <label>Email</label>
      <b-form-group :invalid-feedback="invalidFeedback.email">
        <b-form-input type="email" v-model="model.email" :state="state.email"/>
      </b-form-group>
    </div>
    <div class="mt-2">
      <label>Avatar</label>
      <b-form-group :invalid-feedback="invalidFeedback.avatarFile">
        <b-form-file accept=".jpg" v-model="model.avatarFile" :state="state.avatarFile"/>
      </b-form-group>
    </div>
    <b-button @click="handleSubmit" :disabled="submitting" block
              variant="primary" size="lg" class="mt-2">
      Submit
    </b-button>
  </div>
</template>

<script>
  import util from '@/utils/util';
  import user_service from '@/services/user_service';

  export default {
    name: "RegisterForm",
    data() {
      return {
        submitting: false,
        model: {
          username: '',
          password: '',
          confirmation: '',
          firstName: '',
          lastName: '',
          email: '',
          avatarFile: null,
        },
        state: {
          username: null,
          password: null,
          confirmation: null,
          firstName: null,
          lastName: null,
          email: null,
          avatarFile: null,
        },
        invalidFeedback: {
          username: '',
          password: '',
          confirmation: '',
          firstName: '',
          lastName: '',
          email: '',
          avatarFile: '',
        }
      };
    },
    methods: {
      handleSubmit() {
        if (this.submitting)
          return;
        if (!this.validationCheck())
          return;
        this.submitting = true;
        let user = {
          id: null,
          username: this.model.username,
          password: this.model.password,
          profile: {
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            email: this.model.email,
          },
          avatar: { userId: null, data: null },
          enabled: null,
          roles: null,
        };
        let reader = new FileReader();
        reader.addEventListener('load', () => {
          user.avatar.data = reader.result;
          user_service.register(user, (msg) => {
            console.log(msg);
            if (msg.status === 'SUCCESS')
              this.$router.push('/login');
            else if (msg.status === 'DUP_USERNAME')
              this.$bvToast.toast(
                'Username already exists',
                { variant: 'danger', title: 'Create an Account - Failed'},
              );
            else
              this.$bvToast.toast(
                'Unknown error',
                { variant: 'danger', title: 'Create an Account - Failed'},
              );
            this.submitting = false;
          });
        });
        reader.addEventListener('error', () => {
          reader.abort();
          this.$bvToast.toast(
            'Failed to load the avatar file',
            { variant: 'danger', title: 'Create an Account - Failed'},
          );
          this.submitting = false;
        });
        reader.readAsDataURL(this.model.avatarFile);
      },
      validationCheck() {
        this.state.username = null;
        this.state.password = null;
        this.state.confirmation = null;
        this.state.firstName = null;
        this.state.lastName = null;
        this.state.email = null;
        if (!this.model.username) {
          this.state.username = false;
          this.invalidFeedback.username = 'Username cannot be empty';
        }
        if (this.model.confirmation !== this.model.password) {
          this.state.confirmation = false;
          this.invalidFeedback.confirmation = 'The confirmation password does not match the password'
        }
        if (!this.model.firstName) {
          this.state.firstName = false;
          this.invalidFeedback.firstName = 'Username cannot be empty';
        }
        if (!this.model.lastName) {
          this.state.lastName = false;
          this.invalidFeedback.lastName = 'Username cannot be empty';
        }
        if (!this.model.email) {
          this.state.email = false;
          this.invalidFeedback.email = 'Email cannot be empty';
        } else if (!util.isEmail(this.model.email)) {
          this.state.email = false;
          this.invalidFeedback.email = 'Wrong email syntax';
        }
        if (!this.model.avatarFile) {
          this.state.avatarFile = false;
          this.invalidFeedback.avatarFile = 'No avatar file chosen';
        } else if (this.model.avatarFile.type !== 'image/jpeg') {
          this.state.avatarFile = false;
          this.invalidFeedback.avatarFile = 'Avatar file should be a jpeg image';
        }
        return this.state.username === null &&
            this.state.password === null &&
            this.state.confirmation === null &&
            this.state.firstName === null &&
            this.state.lastName === null &&
            this.state.email === null;
      }
    },
  };
</script>

<style scoped>
  .register-form {
    min-width: 600px;
    max-width: 600px;
  }
  .register-form__logo {
    min-width: 95px;
    max-width: 95px;
    min-height: 95px;
    max-height: 95px;
  }
</style>
