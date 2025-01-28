<style></style>
<template>
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
        <div>Calculate Grade Function</div>
        <div style="max-width: 300px; padding: 20px;">
            <v-text-field
                v-model="score"
                label="Enter your score"
                type="text"
            ></v-text-field>
        <!-- <span>{{ score }}</span> -->
        </div>
        <v-btn @click="calculateGrade">Calculate Grade</v-btn>
    </div>
</template>

<script>
import Swal from 'sweetalert';
export default {
    data() {
        return {
            score: null,
            grade: ''
        };
    },
    methods: {
        calculateGrade() {
            if (isNaN(this.score)) {
                Swal({
                    title: "กรุณาใส่ตัวเลข ห้ามใส่ตัวอักษร",
                    icon: "error"
                });
                return;
            }
            if (this.score >= 80 && this.score <= 100) {
                this.grade = 'A';
                Swal({
                    title: `Your Grade is: ${this.grade}`,
                    icon: "success"
                });
            } else if (this.score >= 70 && this.score < 80) {
                this.grade = 'B';
                Swal({
                    title: `Your Grade is: ${this.grade}`,
                    icon: "success"
                });
            } else if (this.score >= 60 && this.score < 70) {
                this.grade = 'C';
                Swal({
                    title: `Your Grade is: ${this.grade}`,
                    icon: "success"
                });
            } else if (this.score >= 50 && this.score < 60) {
                this.grade = 'D';
                Swal({
                    title: `Your Grade is: ${this.grade}`,
                    icon: "success"
                });
            } else if (this.score >= 0 && this.score < 50) {
                this.grade = 'F';
                Swal({
                    title: `Your Grade is: ${this.grade}`,
                    icon: "success"
                });
            } else {
                this.grade = 'คะแนนต้องอยู่ในช่วง 0-100 เท่านั้น';
                Swal({
                    title: `${this.grade}`,
                    icon: "error"
                });
            }
        }
    }
};
</script>
