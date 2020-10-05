<template>
  <div>
    <h1 class="text-center text-info">Войти</h1>
    <hr />
    <b-row class="mb-3">
      <b-col cols="12" md="6" class="mt-3">
        <form action="" method="post" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="">Логин</label>
            <input type="text" placeholder="Введите логин" class="form-control" v-model="email" />
          </div>

          <div class="form-group">
            <label for="">Пароль</label>
            <input type="password" placeholder="Введите пароль" class="form-control" v-model="password" />
          </div>

          <div class="alert alert-danger" v-if="login_error">
            {{ login_error }}
          </div>

          <input type="submit" value="Войти" class="btn btn-primary mr-3" />
        </form>
      </b-col>
      <b-col cols="12" md="6" class="mt-3">
        <code>
          Пользователи:
          {
            login: test@gmail.com,
            password: test
          },
          {
            login: test@mail.ch,
            password: test
          }
        </code>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  auth: "guest",
  data() {
    return {
      login_error: null,
      email: null,
      password: null
    };
  },

  methods: {
    submitForm() {
      this.$auth
        .loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .catch(error => {
          if (error.response.data.message) {
            this.login_error = error.response.data.message;
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
code {
  white-space: pre-wrap;
}
</style>
