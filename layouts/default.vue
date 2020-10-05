<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <div class="container">
        <b-navbar-brand to="/">Логотип</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/articles">Продукция</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <template v-if="!$auth.loggedIn"
              ><ul class="navbar-nav">
                <li class="nav-item">
                  <nuxt-link
                    to="/user/login"
                    class="nav-link"
                    exact-active-class="active"
                    >Войти</nuxt-link
                  >
                </li>
              </ul></template
            >

            <template v-if="$auth.loggedIn">
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                  <em>{{ $auth.user.full_name }}</em>
                </template>
                <b-dropdown-item to="/user/my-account">Профиль</b-dropdown-item>
                <b-dropdown-item to="/user/logout">Выйти</b-dropdown-item>
              </b-nav-item-dropdown>
            </template>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>

    <div class="container mt-4">
      <nuxt />
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>
