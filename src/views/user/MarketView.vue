<template>
    <div class="flex justify-center items-center min-h-screen relative">
        <!-- Product Section (Centered on screen) -->

        <!-- Global container with padding for consistent spacing -->
        <div class="w-full max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 absolute top-0">

            <!-- Fixed header section - Always at top -->
            <div class="w-full mb-10 ">
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-bold tracking-tight text-gray-900">All Products</h2>
                    <div class="w-64 border border-gray-300 rounded-md">
                        <input type="text" v-model="searchQuery" placeholder="Search products..."
                            class="w-full rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                </div>
            </div>

            <!-- Content container with min-height -->
            <div class="w-full min-h-[200px]"> <!-- Added min-height to prevent collapse -->

                <!-- No products message -->
                <div v-if="filteredProducts.length === 0" class="w-full h-full">
                    <p class="text-lg text-gray-500">ไม่มีสินค้าที่ท่านค้นหา</p>
                </div>

                <!-- Products grouped by product type -->
                <div v-else>
                    <!-- Loop through filtered products grouped by product type -->
                    <div v-for="(productsByType, productType) in groupProductsByType(filteredProducts)"
                        :key="productType" class="mb-8">
                        <h2 class="text-xl font-bold mb-4">{{ productType }}</h2>

                        <!-- Products grid for each product type -->
                        <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            <div v-for="product in productsByType" :key="product.product_id"
                                class="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105">
                                <img :src="product.product_image" :alt="product.product_name"
                                    class="w-full h-48 object-cover" />
                                <div class="p-4">
                                    <h3 class="font-semibold text-lg mb-2">{{ product.product_name }}</h3>
                                    <p class="text-gray-500 mb-2">{{ product.product_description }}</p>
                                    <div class="flex justify-between items-center">
                                        <span class="text-indigo-600 font-bold">
                                            ${{ product.product_price.toFixed(2) }}
                                        </span>
                                        <button @click="addToCart(product)"
                                            class="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


        <!-- Cart Button -->
        <button
            class="fixed bottom-4 right-4 z-50 cart-button bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center cursor-pointer shadow-lg hover:bg-indigo-700 transform transition-all duration-300"
            :class="{ 'clicked': isCartOpen }" @click="toggleCart">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 transform transition-transform duration-300"
                :class="{ 'rotate-cart': isCartOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartItems.length"
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs animate-bounce">
                {{ cartItems.length }}
            </span>
        </button>

        <!-- Dark Overlay -->
        <transition name="fade">
            <div v-if="isCartOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="toggleCart">
            </div>
        </transition>

        <!-- Side Cart Panel -->
        <transition name="slide">
            <div v-if="isCartOpen"
                class="fixed inset-y-0 right-0 max-w-md w-30 bg-white shadow-xl z-50 transform transition-transform duration-700 ease-in-out h-full"
                :class="isCartOpen ? 'translate-x-0' : 'translate-x-full'">
                
                <div style="width: 400px; " class="h-full flex flex-col ">
                    
                    <!-- Cart Header -->
                    <div style="width: 400px;" class="p-6 border-b flex justify-between items-center">
                        <h2 class=" text-xl font-bold">Shopping Cart</h2>
                        <button @click="toggleCart" class="text-gray-600 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Cart Items -->
                    <div class="flex-grow overflow-y-auto p-6">
                        <div v-if="!cartItems.length" class="text-center text-gray-500">
                            Your cart is empty
                        </div>
                        <ul v-else class="space-y-4">
                            <li v-for="item in cartItems" :key="item.id"
                                class="flex items-center justify-between border-b pb-4">
                                <div class="flex items-center space-x-4">
                                    <img :src="item.product_image" :alt="item.product_name"
                                        class="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <h3 class="font-semibold">{{ item.product_name }}</h3>
                                        <p class="text-gray-500">${{ item.product_price.toFixed(2) }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <button @click="decreaseQuantity(item)"
                                        class="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">-</button>
                                    <span>{{ item.quantity }}</span>
                                    <button @click="increaseQuantity(item)"
                                        class="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">+</button>
                                    <button @click="removeProduct(item)" class="text-red-500 hover:text-red-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <!-- Cart Footer -->
                    <div class="p-6 border-t">
                        <div class="flex justify-between mb-4">
                            <span class="font-bold">Total</span>
                            <span>${{ calculateSubtotal.toFixed(2) }}</span>
                        </div>
                        <button @click="checkout" class="w-full py-3 rounded "
                            :class="cartItems.length ? 'bg-indigo-600 text-white ' : 'bg-gray-400 text-gray-700'"
                            :disabled="!cartItems.length">
                            Checkout
                        </button>
                    </div>

                </div>

            </div>
        </transition>
    </div>
</template>


<script>
import Swal from 'sweetalert2';
import anime from 'animejs';
export default {
    data() {
        return {
            isCartOpen: false,
            products: [],
            cartItems: [],
            searchQuery: '',
        }
    },
    created() {
        this.fetchProducts()
    },
    computed: {
        calculateSubtotal() {
            return this.cartItems.reduce((total, item) => {
                return total + (item.product_price * item.quantity)
            }, 0)
        },
        filteredProducts() {
            if (this.searchQuery.trim() === '') {
                return this.products;
            }
            return this.products.filter(product =>
                product.product_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                product.product_description.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await this.axios.get('http://localhost:3000/products/')
                this.products = response.data.map(product => ({
                    ...product,
                    quantity: 0
                }))
                console.log(this.products)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        },
        groupProductsByType(products) {
            return products.reduce((grouped, product) => {
                if (!grouped[product.product_type]) {
                    grouped[product.product_type] = [];
                }
                grouped[product.product_type].push(product);
                return grouped;
            }, {});
        },
        addToCart(product) {
            const existingItem = this.cartItems.find(item => item.product_id === product.product_id)
            if (existingItem) {
                existingItem.quantity++
            } else {
                this.cartItems.push({
                    ...product,
                    quantity: 1
                })
            }
            this.isCartOpen = false
        },
        toggleCart() {
            this.isCartOpen = !this.isCartOpen
        },
        increaseQuantity(item) {
            item.quantity++
        },
        decreaseQuantity(item) {
            if (item.quantity > 1) {
                item.quantity--;
            }
        },
        removeProduct(itemToRemove) {
            this.cartItems = this.cartItems.filter(item => item.product_id !== itemToRemove.product_id)
        },
        async checkout() {
            const token = localStorage.getItem('jwt_token');

            if (!token) {
                Swal.fire({
                    icon: 'warning',
                    title: 'กรุณาเข้าสู่ระบบ',
                    text: 'กรุณาเข้าสู่ระบบก่อนเพิ่มข้อมูล',
                    confirmButtonText: 'ตกลง'
                });
                return;
            }

            try {
                let countdown = 10;
                let isTimerActive = true; // เพิ่มตัวแปรควบคุมสถานะของ timer

                // ฟังก์ชันสำหรับอัปเดตปุ่ม "ยืนยัน" พร้อมตัวเลข countdown และ progress
                const updateConfirmButtonText = () => {
                    // ตรวจสอบว่า Swal ยังเปิดอยู่และ timer ยังทำงานอยู่
                    if (!Swal.isVisible() || !isTimerActive) {
                        return;
                    }

                    const confirmButton = Swal.getConfirmButton();
                    if (!confirmButton) {
                        console.warn('Confirm button not found');
                        return;
                    }

                    const startColor = 'rgb(189, 220, 164)';
                    const endColor = 'rgb(28, 167, 69)';

                    anime({
                        targets: confirmButton,
                        backgroundColor: [startColor, endColor],
                        duration: countdown * 1000,
                        easing: 'linear',
                        update: function (anim) {
                            // ตรวจสอบอีกครั้งก่อนอัพเดท
                            if (!Swal.isVisible() || !isTimerActive) {
                                anim.pause(); // หยุดแอนิเมชัน
                                return;
                            }

                            const remainingTime = Math.ceil(countdown * (1 - anim.progress / 100));
                            const minutes = Math.floor(remainingTime / 60);
                            const seconds = remainingTime % 60;

                            Swal.update({
                                confirmButtonText: `ยืนยัน <strong>(${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')})</strong>`
                            });
                        }
                    });
                };

                const stopTimer = () => {
                    isTimerActive = false;
                    clearInterval(swalTimer);
                };

                const swalTimer = setInterval(() => {
                    if (!Swal.isVisible() || !isTimerActive) {
                        stopTimer();
                        return;
                    }

                    countdown--;
                    updateConfirmButtonText();

                    if (countdown <= 0) {
                        stopTimer();
                        if (Swal.isVisible()) {
                            Swal.clickConfirm();
                        }
                    }
                }, 1000);

                const result = await Swal.fire({
                    title: 'ยืนยันการสั่งซื้อ?',
                    text: 'คุณแน่ใจหรือไม่ว่าต้องการสั่งซื้อสินค้าเหล่านี้',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: `ยืนยัน <strong>(00:10)</strong>`,
                    cancelButtonText: 'ยกเลิก',
                    allowOutsideClick: false, // ป้องกันการคลิกภายนอกเพื่อปิด
                    customClass: {
                        confirmButton: '',
                        cancelButton: '',
                    },
                    buttonsStyling: false,
                    didOpen: () => {
                        updateConfirmButtonText();
                    },
                    willClose: () => {
                        stopTimer(); // หยุด timer เมื่อ Swal กำลังจะปิด
                    },
                    preConfirm: () => {
                        stopTimer(); // หยุด timer เมื่อกดปุ่มยืนยัน
                        return true;
                    },
                    willOpen: () => {
                        const confirmButton = Swal.getConfirmButton();
                        const cancelButton = Swal.getCancelButton();

                        confirmButton.style.backgroundColor = '#bddca4';
                        confirmButton.style.color = '#fff';
                        confirmButton.style.border = 'none';
                        confirmButton.style.padding = '10px 20px';
                        confirmButton.style.borderRadius = '5px';
                        confirmButton.style.transition = 'background-color 0.3s ease';

                        cancelButton.style.backgroundColor = '#6c757d';
                        cancelButton.style.color = '#fff';
                        cancelButton.style.border = 'none';
                        cancelButton.style.padding = '10px 20px';
                        cancelButton.style.marginInline = '5px';
                        cancelButton.style.borderRadius = '5px';
                        cancelButton.style.transition = 'background-color 0.3s ease';
                    }
                });


                // เช็คว่าเมื่อปิดหรือยกเลิก เราจะไม่ทำการส่งคำสั่งซื้อ
                if (!result.isConfirmed) {
                    clearInterval(swalTimer); // ยกเลิก countdown เมื่อผู้ใช้ยกเลิก
                    return;
                }

                // แยกข้อมูลจาก JWT token
                const payload = JSON.parse(atob(token.split('.')[1])); // ถอด base64
                const user_id = payload.user_id; // สมมุติว่า user_id อยู่ใน payload
                // console.log("user_id:", user_id)

                // สร้างข้อมูลที่จะส่งไปยัง API
                const checkoutData = {
                    user_id: user_id,
                    list_product: this.cartItems.map(item => ({
                        product_id: item.product_id,
                        quantity: item.quantity
                    }))
                };

                // การตั้งค่า headers สำหรับ API request
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };

                // ตรวจสอบว่าตระกร้ามีสินค้า
                if (!checkoutData.list_product.length) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'ตระกร้าของคุณว่างเปล่า',
                        text: 'กรุณาเพิ่มสินค้าลงในตระกร้าก่อนทำการสั่งซื้อ',
                        confirmButtonText: 'ตกลง'
                    });
                    return;
                }

                // ส่งข้อมูลการสั่งซื้อ (checkout) ไปยัง API
                const response = await this.axios.post('http://localhost:3000/orders/', checkoutData, config);

                if (response.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'การสั่งซื้อเสร็จสิ้น',
                        text: 'ขอบคุณสำหรับการสั่งซื้อของคุณ!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.cartItems = []; // ล้างสินค้าจากตระกร้า
                    this.isCartOpen = false; // ปิดตระกร้า
                    this.$router.push({ name: 'orderPage' }); // Navigate to orderPage after successful order
                }
            } catch (error) {
                console.error('Error placing order:', error);
                if (error.response?.data?.message === 'Invalid token') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Session Expired',
                        text: 'Your session is invalid, please log in again'
                    });

                    this.$router.push({ name: 'login' });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login failed',
                        text: 'Invalid username or password'
                    });
                }
            }
        }
    }
}
</script>

<style scoped>
/* Cart button animations */
.cart-button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cart-button:hover {
    transform: scale(1.1);
}

.cart-button.clicked {
    transform: scale(0.95);
}

.rotate-cart {
    transform: rotate(45deg);
}

/* Bouncing animation for cart items count */
@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-4px);
    }
}

.animate-bounce {
    animation: bounce 1s infinite;
}

/* Fade animation for overlay */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Slide animation for cart panel */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
    transform: translateX(0);
}

/* Additional styling */
.fixed {
    position: fixed;
}

.min-h-screen {
    min-height: 100vh;
}

.container {
    margin: 0 auto;
}

.relative {
    position: relative;
}
</style>
