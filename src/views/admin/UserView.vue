<template>
            <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

    <div class="pa-5">
        <v-row justify="space-between" align="center" class="mb-5">
            <h1 class="text-2xl font-weight-bold">All Users</h1>
            <v-btn color="primary" elevation="2" @click="dialog = true">
                <v-icon left>mdi-plus</v-icon> New User
            </v-btn>
        </v-row>

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title class="headline">New User</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="postdata.username" label="Username"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="postdata.password" label="Password" type="password"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="postdata.f_name" label="First Name"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="postdata.l_name" label="Last Name"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="postdata.age" label="Age" type="number"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select v-model="postdata.gender" :items="['Male', 'Female']" label="Gender"></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-select v-model="postdata.role" :items="['admin', 'user']" label="Role"></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" text @click="dialog = false">Cancel</v-btn>
                    <v-btn color="primary" @click="addUser">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Edit Dialog -->
        <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
                <v-card-title class="headline">Edit User</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="editdata.username" label="Username"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="editdata.f_name" label="First Name"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="editdata.l_name" label="Last Name"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="editdata.age" label="Age" type="number"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select v-model="editdata.gender" :items="['Male', 'Female']" label="Gender"></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-select v-model="editdata.role" :items="['admin', 'user']" label="Role"></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" text @click="editDialog = false">Cancel</v-btn>
                    <v-btn color="primary" @click="updateUser">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-row>
            <v-col cols="12" md="4" lg="3" v-for="(item, index) in apidata" :key="index">
                <v-card class="elevation-3">
                    <v-img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSN5kyGXRsJTnCvfM371Ycg8u7k9viw1gW-g&sa"
                        height="150"
                        contain
                    ></v-img>
                    <v-card-title class="text-h6 font-weight-bold">{{ item.username }}</v-card-title>
                    <v-card-subtitle>User ID: {{ item.user_id }}</v-card-subtitle>
                    <v-card-text>
                        <p><strong>Name:</strong> {{ item.f_name }} {{ item.l_name }}</p>
                        <p><strong>Age:</strong> {{ item.age }}</p>
                        <p><strong>Gender:</strong> {{ item.gender }}</p>
                        <p><strong>Role:</strong> {{ item.role }}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="warning" @click="openEditDialog(item)">Edit</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="deleteUser(item.user_id)">Delete</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            apidata: [],
            id: '',
            postdata: {
                username: '',
                password: '',
                f_name: '',
                l_name: '',
                age: '',
                gender: '',
                role: ''
            },
            postdefault: {
                username: '',
                password: '',
                f_name: '',
                l_name: '',
                age: '',
                gender: '',
                role: ''
            },
            editdata: {
                username: '',
                password: '',
                f_name: '',
                l_name: '',
                age: '',
                gender: '',
                role: ''
            },
            dialog: false,
            editDialog: false
        }
    },
    created() {
        this.getdata()
    },
    computed: {
        savemode() {
            return this.id === '' ? 'NewItem': 'EditItem'
        }
    },
    methods: {
        getdata() {
            this.axios.get('http://localhost:3000/users/').then(response => {
                this.apidata = response.data
            })
        },
        async addUser() {
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

                const response = await this.axios.post('http://localhost:3000/users/', this.postdata, config);

                if (response.status === 201) {
                    Swal.fire('เพิ่มข้อมูลเสร็จสิ้น');
                    this.getdata();
                    this.postdata = { ...this.postdefault };
                    this.dialog = false;
                }
            } catch (error) {
                console.error('Error adding user:', error);
                Swal.fire('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
            }
        },

        openEditDialog(item) {
            this.editdata = { ...item };
            this.editDialog = true;
        },
        async updateUser() {
            try {
                const token = localStorage.getItem('jwt_token');
                if (!token) {
                    Swal.fire('กรุณาเข้าสู่ระบบก่อนแก้ไขข้อมูล');
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };

                const response = await this.axios.put(`http://localhost:3000/users/${this.editdata.user_id}`, this.editdata, config);

                if (response.status === 200) {
                    Swal.fire('แก้ไขข้อมูลเสร็จสิ้น');
                    this.getdata();
                    this.editDialog = false;
                }
            } catch (error) {
                console.error('Error updating user:', error);
                Swal.fire('เกิดข้อผิดพลาดในการแก้ไขข้อมูล');
            }
        },
        async deleteUser(user_id) {
            try {
                const token = localStorage.getItem('jwt_token');
                if (!token) {
                    Swal.fire('กรุณาเข้าสู่ระบบก่อนลบข้อมูล');
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };

                const response = await this.axios.delete(`http://localhost:3000/users/${user_id}`, config);

                if (response.status === 200) {
                    Swal.fire('ลบข้อมูลเสร็จสิ้น');
                    this.getdata();
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                Swal.fire('เกิดข้อผิดพลาดในการลบข้อมูล');
            }
        }
    }
}
</script>

<style scoped>
.v-card {
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
}
.v-dialog .v-card {
    transform: none !important;
}
.v-card:hover:not(.v-dialog .v-card) {
    transform: scale(1.02);
}
</style>