<template>
  <div>
    <v-app-bar app color="primary" dark>
      <div v-if="user.role === 'admin'" class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <span 
          class="text-2xl font-bold" 
          @click="$router.push({ name: 'dashboardAdmin' })" 
          style="cursor: pointer;"
        >
          Vuetify Shop
        </span>
      </div>

      <div v-else-if="user.role === 'user'" class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <span 
          class="text-2xl font-bold" 
          @click="$router.push({ name: 'homePage' })" 
          style="cursor: pointer;"
        >
          Vuetify Shop
        </span>
      </div>

      <v-spacer></v-spacer>

      <!-- Admin menu -->
      <template v-if="user.role === 'admin'">
        <v-btn text @click="$router.push({ name: 'meProfile' })">Me</v-btn>
        <v-btn text @click="$router.push({ name: 'gradeCalculate' })">Calculate</v-btn>
        <v-btn text @click="$router.push({ name: 'dashboardAdmin' })">Dashboard</v-btn>
        <v-btn text @click="$router.push({ name: 'userManage' })">Manage User</v-btn>
        <v-btn text @click="$router.push({ name: 'marketManage' })">Manage Product</v-btn>
      </template>

      <!-- User menu -->
      <template v-else-if="user.role === 'user'">
        <v-btn text @click="$router.push({ name: 'shopPage' })">Market</v-btn>
        <v-btn text @click="$router.push({ name: 'orderPage' })">My Orders</v-btn>
      </template>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">{{ user.username }}</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>

      <v-btn class="ml-5" color="info" @click="logout()">Logout</v-btn>
    </v-app-bar>

    <v-main v-if="!loading">
      <router-view />
    </v-main>

    <v-main v-else>
      <v-container class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <p>Loading...</p>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      user: {
        username: '',
        user_cookie: '',
        role: '' // Default role
      },
      loading: true
    };
  },
  created() {
    this.loadUserData();
  },
  methods: {
    loadUserData() {
      const token = localStorage.getItem('jwt_token');

      if (!token) {
        Swal.fire('กรุณาเข้าสู่ระบบก่อน');
        this.$router.push({ name: 'login' });
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
        this.user.username = localStorage.getItem('username') || 'Guest';
        this.user.user_cookie = this.$cookies.get('username') || 'Guest';
        // console.log("payload:",payload)
        this.user.role = payload?.role || 'user'; // Default role if not found
        // console.log("role:",this.user.role)
      } catch (error) {
        console.error('Token decoding error:', error);
        Swal.fire('เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์');
        this.logout();
      } finally {
        this.loading = false;
      }
    },
    logout() {
      ['username', 'jwt_token'].forEach((item) => localStorage.removeItem(item));
      this.$router.push({ name: 'login' });
    },
    
  }
};
</script>

<style scoped>
h2 {
  color: #333;
}
</style>
