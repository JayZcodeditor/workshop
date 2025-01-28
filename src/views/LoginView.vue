<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12" >
        <div class="mt-5 flex flex-col items-center">
          <img src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            class="w-20 flex justify-center align-center" alt="Vuetify Logo"/>
          <h1 class="mt-9 text-2xl xl:text-3xl font-extrabold">
            Sign up
          </h1>
          <div class="w-full flex-1 mt-8">
            <div class="mx-auto max-w-xs">
              <input
                v-model="username"
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email" placeholder="Username" />
              <input
                v-model="password"
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password" placeholder="Password" />
              <button
                @click="Login"
                class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span class="ml-3">
                  Sign Up
                </span>
              </button>
              <p class="mt-6 text-xs text-gray-600 text-center">
                I agree to abide by Vuetify shop
                <a href="#" class="border-b border-gray-500 border-dotted">
                  Terms of Service
                </a>
                and its
                <a href="#" class="border-b border-gray-500 border-dotted">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
        <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style="background-image: url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async Login() {
      try {
        console.log("Authenticating...");

        // Send login request to backend
        const response = await this.axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password
        });

        if (response.status === 200) {
          const token = response.data.token; // Get JWT token from response
          const role = response.data.data.role; // Get role from response
          console.log("Login successful");

          this.setLocalStorage(token);  // Call setLocalStorage function

          this.$cookies.set('username', this.username, "10s");  // Set cookie (if needed)

          if (role === 'admin') {
            this.$router.push({ name: 'dashboardAdmin' });  // Redirect to home page for admin
          } else if (role === 'user') {
            this.$router.push({ name: 'homePage' });  // Redirect to homepage for user
          }
        }
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: 'Invalid username or password'
        });
      }
    },

    setLocalStorage(token) {
      localStorage.setItem('username', this.username);  // Store username
      localStorage.setItem('jwt_token', token);  // Store token in localStorage
    }
  }
}
</script>
