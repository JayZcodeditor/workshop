<template>
    <div v-if="showInvoiceDialog" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
        <div class="bg-white rounded-lg p-8 w-full max-w-3xl max-h-full overflow-y-auto">
            <div ref="invoiceContent" class="px-3 py-3 rounded-md">
                <!-- Header with Logo -->
                <div class="flex justify-between items-start mb-8">
                    <div class="flex items-center">
                        <h1 class="text-4xl font-bold tracking-wider">
                            Vuetify
                            <span class="relative inline-block w-8 h-8 mx-1">
                                <img alt="Vuetify Logo" class="shrink mr-2" src="@/assets/vuetify-logo-dark.png" width="40" />
                            </span>
                            Shop
                        </h1> &nbsp;
                        <h1 class="text-4xl font-bold tracking-wider">INCORPORATED</h1>
                    </div>
                    <div class="text-right">
                        <p class="text-xl text-gray-600">Invoice #{{ selectedOrder.order_id }}</p>
                        <p class="text-gray-500">Created at {{ formatDateInvoice(selectedOrder.createdAt) }}</p>
                    </div>
                </div>

                <!-- Company and Customer Info -->
                <div class="flex justify-between mb-8">
                    <div class="text-gray-700">
                        <p class="font-medium">INET cooperate Group</p>
                        <p>Prachathipat Road, Hat Yai Subdistrict, Hat Yai District, Songkhla Province</p>
                        <p>+88017155834219</p>
                    </div>
                    <div class="text-right text-gray-700">
                        <p class="font-medium">INET Inc</p>
                        <p>Vuetify invoice</p>
                        <p>AutoGen_Invoice@inetco.th</p>
                    </div>
                </div>

                <!-- Items Table -->
                <div class="mb-8">
                    <div class="grid grid-cols-2 bg-gray-100 p-4 rounded-t-lg">
                        <span class="font-semibold text-gray-700">Item</span>
                        <span class="font-semibold text-gray-700 text-right">Price</span>
                    </div>
                    <div class="border rounded-b-lg">
                        <div v-for="product in selectedOrder.list_product" :key="product.product_id" class="grid grid-cols-2 p-4 border-b last:border-b-0">
                            <span class="text-gray-700">{{ product.product_name }}</span>
                            <span class="text-gray-700 text-right">${{ product.price.toLocaleString() }}</span>
                        </div>
                    </div>
                </div>

                <!-- Total -->
                <div class="flex justify-end">
                    <div class="text-right">
                        <p class="text-xl font-semibold">
                            Total: ${{ selectedOrder.total_price.toLocaleString() }}
                        </p>
                    </div>
                </div>
            </div>
            <!-- Close Button -->
            <div class="flex justify-end">
                <button @click="exportHtml" class="bg-blue-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-blue-400 transition duration-200">
                    Save
                </button>
                <button @click="closeInvoiceDialog" class="ml-4 bg-red-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-red-400 transition duration-200">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>


<script>
import html2canvas from 'html2canvas-pro'; // Import the html2canvas library
export default {
    props: {
        showInvoiceDialog: {
            type: Boolean,
            required: true
        },
        selectedOrder: {
            type: Object,
            required: true
        }
    },
    methods: {
        closeInvoiceDialog() {
            this.$emit('close');
        },
        formatDateInvoice(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString('en-US', options);
        },
        exportHtml() {
            // Capture the entire invoice content after the DOM has updated
            this.$nextTick(() => {
                const invoiceElement = this.$refs.invoiceContent;

                if (invoiceElement) {
                    // Use html2canvas-pro to capture the screenshot of the invoice content
                    html2canvas(invoiceElement, { useCORS: true }).then(canvas => {
                        // Convert the canvas to a JPG image
                        const imageUrl = canvas.toDataURL('image/jpeg', 1.0); // 1.0 means full quality

                        // Create a link element for downloading the image
                        const link = document.createElement('a');
                        link.href = imageUrl;
                        link.download = `Invoice_${this.selectedOrder.order_id}.jpg`;

                        // Programmatically click the link to trigger the download
                        link.click();
                    }).catch(error => {
                        console.error('Error generating screenshot:', error);
                    });
                } else {
                    console.error('Invoice content not found.');
                }
            });
        }
    }
}
</script>
