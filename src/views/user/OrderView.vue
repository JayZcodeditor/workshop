<template>
    <div class="container mx-auto p-6">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">รายการคำสั่งซื้อ</h2>

        <div v-if="loading" class="flex justify-center items-center">
            <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        </div>

        <ul v-else-if="orders.length" class="space-y-6">
            <li v-for="order in orders" :key="order.order_id"
                class="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-semibold text-gray-700">
                        หมายเลขคำสั่งซื้อ:
                        <span class="text-blue-600">{{ order.order_id }}</span>
                    </h3>
                    <button @click="openInvoiceDialog(order)"
                        class="text-green-500 px-1 py-1 rounded-lg hover:bg-green-600">
                        ออกใบเสร็จ
                    </button>
                </div>

                <!-- <p class="text-gray-600 mt-2">
                    <span class="font-semibold">ผู้ใช้งาน:</span> {{ order.username }}
                </p> -->
                <p class="text-gray-600 my-2">
                    <span class="font-semibold">ราคารวม:</span> {{ orderTotalPrice(order).toLocaleString() }} บาท
                </p>
                <p class="text-gray-600">
                    <span class="font-semibold">รายการสินค้า:</span>
                </p>

                <ul class="mt-4 space-y-2">
                    <li v-for="product in order.list_product" :key="product.product_id"
                        class="p-4 bg-gray-100 rounded-lg shadow-sm">
                        <p class="text-gray-700">
                            <span class="font-semibold text-gray-800">{{ product.product_name }}</span>
                            - จำนวน {{ product.quantity }} ชิ้น, ราคา
                            <span class="text-green-500">{{ product.price.toLocaleString() }}</span> บาท
                        </p>
                    </li>
                </ul>

                <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <div class="flex items-center gap-1">
                        <span class="font-semibold">วันที่สั่งซื้อ:</span>
                        <span>{{ formatDate(order.createdAt) }}</span>
                    </div>
                    <button @click="openEditDialog(order)"
                        class="text-yellow-200 px-1 py-1 rounded-lg hover:bg-yellow-600">
                        แก้ไขคำสั่งซื้อ
                    </button>
                    <button @click="showCancelDialog = true; cancelingOrder = order"
                        class=" text-red-200 px-1 ml-2 py-1 rounded-lg hover:bg-red-600">
                        ยกเลิกคำสั่งซื้อ
                    </button>
                </div>
            </li>
        </ul>

        <p v-else class="text-center text-gray-600 text-lg mt-6">ไม่พบรายการคำสั่งซื้อ</p>

        <!-- Invoice dialog -->
        <div v-if="showInvoiceDialog"
            class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">

            <InvoiceDialog :showInvoiceDialog="showInvoiceDialog" :selectedOrder="selectedOrder"
                @close="closeInvoiceDialog" />

        </div>

        <!-- Cancel Order Dialog -->
        <div v-if="showCancelDialog" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 class="text-xl font-semibold text-gray-700">ยืนยันการยกเลิกคำสั่งซื้อ</h3>
                <p class="text-gray-600 mt-2">กรุณากรอกหมายเลขคำสั่งซื้อ '<strong>{{ cancelingOrder?.order_id }}</strong>'
                    เพื่อยืนยันการยกเลิก:</p>
                <div class="mt-2 border border-gray-300 rounded-md">
                    <input type="text" v-model="enteredOrderId" class="w-full p-2 border border-gray-00 rounded-md"
                        placeholder="หมายเลขคำสั่งซื้อ" />
                </div>
                <p v-if="enteredOrderId && enteredOrderId !== cancelingOrder?.order_id"
                    class="text-red-500 text-sm mt-2">
                    หมายเลขคำสั่งซื้อไม่ตรงกับข้อมูล
                </p>
                <div class="mt-4 flex justify-end gap-4">
                    <button @click="showCancelDialog = false" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                        ยกเลิก
                    </button>
                    <button @click="confirmCancelOrder"
                        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        :disabled="enteredOrderId !== cancelingOrder?.order_id">
                        ยืนยัน
                    </button>
                </div>
            </div>
        </div>

        <!-- Dialog สำหรับแก้ไขจำนวนสินค้า -->
        <div v-if="showEditDialog" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-start justify-center overflow-auto py-3 ">
            <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[80vh] overflow-auto mx-4 mt-16">
            <h2 class="text-xl font-semibold text-gray-700 mb-2">แก้ไขรายการสินค้า</h2>

            <!-- ใช้ overflow-y-auto เพื่อให้สามารถเลื่อนรายการสินค้าได้ -->
            <ul class="max-h-[50vh] overflow-y-auto">
            <li v-for="product in editingOrder.list_product" :key="product.product_id" class="mb-1 p-2 rounded-lg">
            <p class="text-gray-700 font-semibold">{{ product.product_name }}</p>
            <div class="border border-gray-300 rounded-lg">
                <input v-model.number="product.quantity" type="number" min="1" class="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
            </li>
            </ul>

            <div class="flex justify-end gap-2 mt-4">
            <button @click="showEditDialog = false" class="px-4 py-2 bg-gray-400 text-white rounded-lg">
            ยกเลิก
            </button>
            <button @click="saveOrderChanges" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800">
            บันทึก
            </button>
            </div>
            </div>
        </div>




    </div>

</template>

<script>
import Swal from 'sweetalert2';
import InvoiceDialog from './Invoicepage.vue';
export default {
    components: {
        InvoiceDialog
    },
    data() {
        return {
            orders: [],
            loading: true, // เพิ่มสถานะโหลดข้อมูล
            showCancelDialog: false, // Control visibility of the cancel dialog
            showEditDialog: false, // Control visibility of the cancel dialog
            cancelingOrder: null, // Store the order that is being canceled
            enteredOrderId: "", // Stores the entered order ID

            showInvoiceDialog: false, // state สำหรับแสดง Dialog
            selectedOrder: null, // เก็บข้อมูลของคำสั่งซื้อที่เลือก
        };
    },
    created() {
        this.fetch_Order();  // เรียกใช้งานฟังก์ชัน fetch_order ตอนที่คอมโพเนนต์ถูกสร้าง
    },
    methods:
    {
        orderTotalPrice(order) {
        return order.list_product.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
    },
        formatDateInvoice(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString('th-TH', options);
        },
        openEditDialog(order) {
            this.editingOrder = JSON.parse(JSON.stringify(order)); // Clone order to avoid direct mutation
            this.showEditDialog = true;
        },
        async saveOrderChanges() {
            try {
                // ดึง token จาก localStorage
                const token = localStorage.getItem('jwt_token');
                if (!token) {
                    Swal.fire('กรุณาเข้าสู่ระบบก่อน');
                    return;
                }

                // การตั้งค่า headers สำหรับ API request
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };

                // ส่งคำขอแก้ไขคำสั่งซื้อไปยังเซิร์ฟเวอร์
                const response = await this.axios.put(
                    `http://localhost:3000/orders/${this.editingOrder.order_id}`,
                    this.editingOrder,
                    config
                );

                if (response.status === 200) {
                    // อัปเดตรายการคำสั่งซื้อใน UI
                    const index = this.orders.findIndex(o => o.order_id === this.editingOrder.order_id);
                    if (index !== -1) {
                        this.orders[index] = { ...this.editingOrder }; // Update the main order list
                    }

                    Swal.fire({
                        icon: 'success',
                        title: 'บันทึกการแก้ไขสำเร็จ!',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    this.showEditDialog = false;
                } else {
                    throw new Error('ไม่สามารถบันทึกการแก้ไขได้');
                }
            } catch (error) {
                console.error('Error saving order:', error);
                Swal.fire('เกิดข้อผิดพลาดในการบันทึกการแก้ไข');
            }
        },
        formatDate(dateString) {
            if (!dateString) return "ไม่ระบุวันที่";
            const date = new Date(dateString);
            return date.toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        },
        async fetch_Order() {
            try {
                const token = localStorage.getItem("jwt_token");

                if (!token) {
                    Swal.fire("กรุณาเข้าสู่ระบบก่อน");
                    this.loading = false;
                    return;
                }

                try {
                    // ถอดรหัส JWT token เพื่อดึง user_id
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    const user_id = payload.user_id || null;

                    if (!user_id) {
                        throw new Error("ไม่พบข้อมูลผู้ใช้งานใน token");
                    }

                    const response = await this.axios.get(`http://localhost:3000/orders/user/${user_id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.status === 200) {
                        this.orders = (response.data.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    } else {
                        throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูล");
                    }
                } catch (error) {
                    console.error("Error fetching orders:", error);
                    Swal.fire(error.message || "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
                } finally {
                    this.loading = false;
                }
            } catch (error) {
                console.error("Error in fetch_Order:", error);
            }
        },
        cancelOrder(orderId) {
            // Logic to cancel the order (สมมุติว่า API cancel ที่ URL นี้)
            console.log("Cancelling order:", orderId);
            // You can implement an API call here to cancel the order
        },
        async confirmCancelOrder() {
            // ดึง token จาก localStorage
            const token = localStorage.getItem('jwt_token');
            if (!token) {
                Swal.fire('กรุณาเข้าสู่ระบบก่อน');
                return;
            }

            // ตรวจสอบว่า หมายเลขคำสั่งซื้อที่กรอกตรงกับที่กำลังจะยกเลิกหรือไม่
            if (this.enteredOrderId === this.cancelingOrder?.order_id) {
                try {
                    // การตั้งค่า headers สำหรับ API request
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    };

                    // ส่งคำขอยกเลิกคำสั่งซื้อผ่าน axios DELETE
                    const response = await this.axios.delete(`http://localhost:3000/orders/${this.cancelingOrder.order_id}`, config);

                    if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'คำสั่งซื้อถูกยกเลิกเรียบร้อยแล้ว',
                            showConfirmButton: false, // ไม่แสดงปุ่ม
                            timer: 1000, // ปิดหลังจาก 2 วินาที
                            timerProgressBar: true, // แสดงบาร์เวลา
                            customClass: {
                                // กำหนดสีให้กับ progress bar
                                timerProgressBar: 'bg-green-500' // สีของ progress bar
                            }
                        });

                        // ลบคำสั่งซื้อจากรายการ
                        this.orders = this.orders.filter(order => order.order_id !== this.cancelingOrder.order_id);
                        this.showCancelDialog = false; // ปิด dialog
                        this.cancelingOrder = null; // ล้างข้อมูลคำสั่งซื้อที่กำลังจะยกเลิก
                        this.enteredOrderId = ""; // ล้างข้อมูลหมายเลขคำสั่งซื้อ
                    }
                } catch (error) {
                    console.error('Error canceling order:', error);
                    Swal.fire('เกิดข้อผิดพลาดในการยกเลิกคำสั่งซื้อ');
                }
            } else {
                Swal.fire("หมายเลขคำสั่งซื้อไม่ตรงกับข้อมูลที่กรอก");
            }
        },


        openInvoiceDialog(order) {
            this.selectedOrder = order; // เก็บคำสั่งซื้อล่าสุดที่ถูกเลือก
            this.showInvoiceDialog = true; // แสดง Dialog
        },
        closeInvoiceDialog() {
            this.showInvoiceDialog = false; // ปิด Dialog
            this.selectedOrder = null; // ล้างข้อมูลคำสั่งซื้อ
        },
    },
};
</script>

<style scoped></style>