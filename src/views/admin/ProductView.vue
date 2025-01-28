<template>
    <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">All Product</h2>
                <v-btn @click="dialog = true"> <v-icon left>mdi-plus</v-icon>Add Product</v-btn>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title class="justify-center">
                            <span class="text-h5">เพิ่มรายการสินค้า</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="newProduct.product_name"
                                            label="ชื่อสินค้า"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="newProduct.product_description"
                                            label="คำอธิบาย"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="newProduct.product_price" label="ราคาสินค้า"
                                            type="number"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="newProduct.product_remain" label="จำนวนของ"
                                            type="number"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-select v-model="newProduct.product_type"
                                            :items="['หมวก', 'เสื้อ', 'กางเกง', 'รองเท้า']"
                                            label="ประเภทสินค้า"></v-select>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field v-model="newProduct.product_image" label="Link สินค้า"
                                            placeholder="http://......."></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">ยกเลิก</v-btn>
                            <v-btn color="blue darken-1" text @click="addProduct">เพิ่มข้อมูล</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>

            <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <div v-for="product in products" :key="product.id" class="group relative">
                    <img :src="product.product_image" :alt="product.imageAlt"
                        class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" />
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-lg text-gray-700">
                                <a @click="openProductModal(product)">
                                    <span aria-hidden="true" class="absolute inset-0" />
                                    {{ product.product_name }}
                                </a>
                            </h3>
                            <p class="text-sm text-gray-500">ราคาสินค้า: {{ product.product_price }}</p>
                            <p class="text-sm font-medium">คงเหลือ: {{ product.product_remain }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <v-dialog v-model="productDialog" max-width="800px">
                <v-card>
                    <v-card-title class="justify-center">
                        <span class="text-2xl font-bold">แก้ไขข้อมูลสินค้า</span>
                        <v-btn icon color="red" class="close-btn" @click="productDialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <!-- รูปภาพสินค้า ด้านซ้าย -->
                                <v-col cols="5" class="d-flex align-center justify-center">
                                    <img :src="validImageUrl ? selectedProduct.product_image : defaultImage"
                                        class="product-image rounded-md" @error="handleImageError" />
                                    <p v-if="!validImageUrl" class="error-text">ไม่สามารถแสดงรูปภาพได้</p>
                                </v-col>

                                <!-- ข้อมูลสินค้า ด้านขวา -->
                                <v-col cols="7">
                                    <v-text-field v-model="selectedProduct.product_name"
                                        label="ชื่อสินค้า"></v-text-field>
                                    <v-text-field v-model="selectedProduct.product_description"
                                        label="คำอธิบาย"></v-text-field>
                                    <v-text-field v-model="selectedProduct.product_price" label="ราคา"
                                        type="number"></v-text-field>
                                    <v-text-field v-model="selectedProduct.product_remain" label="คงเหลือ"
                                        type="number"></v-text-field>
                                    <v-select v-model="selectedProduct.product_type"
                                        :items="['หมวก', 'เสื้อ', 'กางเกง', 'รองเท้า']" label="ประเภทสินค้า"></v-select>
                                    <v-text-field v-model="selectedProduct.product_image" label="Link รูปสินค้า"
                                        @input="checkImageUrl"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="deleteProduct(selectedProduct.product_id)">ลบสินค้า</v-btn>
                        <v-btn color="green darken-1" text @click="updateProduct">บันทึก</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>






        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            validImageUrl: true,  // ตัวแปรเพื่อตรวจสอบว่ารูปใช้ได้หรือไม่
            defaultImage: 'https://via.placeholder.com/300?text=Image+Not+Available',  // รูปเบลอแทน
            products: [],
            newProduct: {
                product_name: '',
                product_description: '',
                product_price: 0,
                product_remain: 0,
                product_type: '',
                product_image: ''
            },
            selectedProduct: {
                product_id: '',
                product_name: '',
                product_description: '',
                product_price: 0,
                product_remain: 0,
                product_type: '',
                product_image: ''
            },
            dialog: false,
            productDialog: false
        }
    },
    created() {
        this.fetchProducts();
    },
    methods: {
        handleImageError() {
            this.validImageUrl = false;
        },
        checkImageUrl() {
            const image = new Image();
            image.src = this.selectedProduct.product_image;
            image.onload = () => {
                this.validImageUrl = true;
            };
            image.onerror = () => {
                this.validImageUrl = false;
            };
        },
        async fetchProducts() {
            try {
                const response = await this.axios.get('http://localhost:3000/products/');
                this.products = response.data;
                // console.log(this.products)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        async addProduct() {
            try {
                const token = localStorage.getItem('jwt_token');
                if (!token) {
                    Swal.fire('กรุณาเข้าสู่ระบบก่อนเพิ่มข้อมูล');
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };

                if (!this.newProduct.product_image || !this.newProduct.product_type) {
                    Swal.fire('กรุณากรอกข้อมูลให้ครบถ้วน');
                    return;
                }
                const response = await this.axios.post('http://localhost:3000/products/', this.newProduct, config);

                if (response.status === 201) {
                    Swal.fire('เพิ่มข้อมูลเสร็จสิ้น');
                    this.fetchProducts();
                    this.newProduct = {
                        product_name: '',
                        product_description: '',
                        product_price: 0,
                        product_remain: 0,
                        product_type: '',
                        product_image: ''
                    };
                    this.dialog = false;
                }
            } catch (error) {
                console.error('Error adding product:', error);
                Swal.fire('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
            }
        },
        async updateProduct() {
            try {
                const token = localStorage.getItem('jwt_token');
                if (!token) {
                    Swal.fire('กรุณาเข้าสู่ระบบก่อนอัปเดตข้อมูล');
                    return;
                }
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };
                // console.log("ข้อมูลที่มีการเปลี่ยนแปลง :", this.selectedProduct)
                const response = await this.axios.put(`http://localhost:3000/products/${this.selectedProduct.product_id}`, this.selectedProduct, config);
                if (response.status === 200) {
                    Swal.fire('อัปเดตข้อมูลสำเร็จ');
                    this.fetchProducts();
                    this.productDialog = false;
                }
            } catch (error) {
                console.error('Error updating product:', error);
                Swal.fire('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
            }
        },
        async deleteProduct(productId) {
            try {
                const token = localStorage.getItem('jwt_token');
                if (!token) {
                    Swal.fire('กรุณาเข้าสู่ระบบก่อนลบข้อมูล');
                    return;
                }
                Swal.fire({
                    title: 'คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ใช่, ลบเลย!',
                    cancelButtonText: 'ยกเลิก'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        };
                        const response = await this.axios.delete(`http://localhost:3000/products/${productId}`, config);
                        if (response.status === 200) {
                            Swal.fire('ลบสินค้าสำเร็จ');
                            this.fetchProducts();
                            this.productDialog = false;
                        }
                    }
                });
            } catch (error) {
                console.error('Error deleting product:', error);
                Swal.fire('เกิดข้อผิดพลาดในการลบข้อมูล');
            }
        },

        openProductModal(product) {
            this.selectedProduct = { ...product };  // คัดลอกข้อมูลสินค้าเพื่อแสดง
            this.productDialog = true;  // เปิด Dialog เพื่อแสดงรายละเอียดสินค้า
        }
    },
    watch: {
        'selectedProduct.product_image': {
            handler() {
                this.checkImageUrl();
            },
            immediate: true // ให้ตรวจสอบทันทีเมื่อโหลด component
        }
    }
}
</script>

<style scoped>
.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
}

.product-image {
    max-width: 100%;
    max-height: 350px;
    width: auto;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.error-text {
    color: red;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
}
</style>
