<template>
  <v-container fluid class="pa-0" style="max-width: 100%; width: 100%;">
    <!-- section1 -->
    <div class=" relative overflow-hidden bg-white mdi-24px">
      <div class=" pb-30 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div class="sm:max-w-lg">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Thammakit Chotchuang</h1>
            <p class="mt-4 text-xl "> <strong>Name</strong> : ธัมมกิตติ์ โชติช่วง</p>
            <p class="mt-4 text-xl "> <strong>ชื่อเล่น</strong> : เจ </p>
            <p class="mt-4 text-xl "> <strong>จบจาก</strong> : มหาวิทยาลัยวลัยลักษณ์ </p>
            <p class="mt-4 text-xl "> <strong>สาขา</strong> : สารสนเทศศาสตร์</p>

          </div>
          <div>
            <div class="mt-10">
              <!-- Decorative image grid -->
              <div aria-hidden="true"
                class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                <div
                  class="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div class="flex items-center space-x-6 lg:space-x-8">
                    <div class="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div class="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img :src="pro_img1" alt="" class="size-full object-cover" />
                      </div>
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img :src="pro_img2" alt="" class="size-full object-cover" />
                      </div>
                    </div>
                    <div class="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img :src="pro_img5" alt="" class="size-full object-cover" />
                      </div>
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img :src="pro_img4" alt="" class="size-full object-cover" />
                      </div>
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img :src="pro_img5" alt="" class="size-full object-cover" />
                      </div>
                    </div>
                    <div class="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img :src="pro_img6" alt="" class="size-full object-cover" />
                      </div>
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img :src="pro_img7" alt="" class="size-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Click button to open dialog -->
              <a href="#"
                class="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                @click="dialog = true">
                Click me !!!
              </a>

              <!-- Vuetify Dialog -->
              <v-dialog v-model="dialog" max-width="500">
                <v-card title="Dialog">
                  <v-card-text>
                    Hello is Me !!!
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close Dialog" @click="dialog = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- section2 -->
    <div class=" flex justify-center items-center">
      
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 class="text-2xl font-bold text-gray-900">Hobbies <span class="text-xl font-light ">งานอดิเรก</span></h2>

          <div ref="scrollContainer" class="mt-6 overflow-hidden cursor-grab active:cursor-grabbing select-none"
            @mousedown="startDrag" @mousemove="onDrag" @mouseup="endDrag" @mouseleave="endDrag">
            <div class="flex gap-4">
              <div v-for="callout in callouts" :key="callout.name"
                class="group relative flex-shrink-0 w-[80%] sm:wvsc-[50%] md:w-[30%] lg:w-[20%]">
                <v-img :src="callout.imageSrc" :alt="callout.imageAlt" :style="{ width: '330px', height: '250px' }"
                  :lazy-src="callout.lazySrc"
                  class="rounded-md bg-white object-cover group-hover:opacity-75 w-full h-48 sm:h-60 md:h-72 lg:h-80 xl:h-96">
                </v-img>

                <h3 class="mt-4 text-xs sm:text-sm md:text-base ">
                  <a :href="callout.href">
                    <span class="absolute inset-0"></span>
                    {{ callout.name }}
                  </a>
                </h3>
                <p class="text-sm sm:text-base md:text-lg font-light text-gray-900">
                  {{ callout.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- section3 -->
    <div class="overflow-hidden bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div class="lg:pt-4 lg:pr-8">
            <div class="">
              <v-row>

                <div>
                  <h2 class="text-base/7 font-semibold text-green-700">จุดแข็ง</h2>
                  <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-3xl">My
                    Strengths</p>
                  <p class="mt-6 text-lg/8 ">เรียนรู้ได้ไว เรียนรู้สิ่งใหม่ๆเสมอ เน้นทำมากกว่าเน้นพูด ความอดทนสูง</p>
                </div>

                <div>
                  <h2 class="text-base/7 font-semibold text-red-700">จุดอ่อน</h2>
                  <p class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-3xl">My
                    Weakness</p>
                  <p class="mt-6 text-lg/8 ">พูดไม่ค่อยเก่ง แต่รักหมดใจ</p>
                </div>

              </v-row>
              <dl class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                <div v-for="feature in callouts" :key="feature.name" class="relative pl-9">
                  <dt class="inline font-semibold ">
                    <component :is="feature.icon" class="absolute top-1 left-1 size-5 text-indigo-600"
                      aria-hidden="true" />
                    {{ feature.name }}
                  </dt>
                  {{ ' ' }}
                  <dd class="inline">{{ feature.description }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <v-footer class="d-flex justify-center align-center"
      style="min-height: 100px; color: #ffffff;background-color: #1976d2;">
      @2025 Design & Dev by Jay
    </v-footer>

  </v-container>

</template>


<script>
import pro_img1 from "../assets/section1/1.jpg";
import pro_img2 from "../assets/section1/2.jpg";
import pro_img3 from "../assets/section1/6.jpg";
import pro_img4 from "../assets/section1/4.jpg";
import pro_img5 from "../assets/section1/5.jpg";
import pro_img6 from "../assets/profile_image.jpg";
import pro_img7 from "../assets/section1/3.jpg";
export default {
  name: "ProfileView",
  data() {
    return {
      pro_img1,
      pro_img2,
      pro_img3,
      pro_img4,
      pro_img5,
      pro_img6,
      pro_img7,
      dialog: false, // ตัวแปรควบคุมการเปิด-ปิด Dialog
      isDragging: false,  // กำหนดสถานะการลาก
      startX: 0,
      scrollLeft: 0,
      callouts: [
        {
          name: 'เล่นดนตรี',
          description: 'Guitar, Piano, Drum',
          imageSrc: 'https://scontent-sin6-1.xx.fbcdn.net/v/t39.30808-6/369603777_979841959796302_4321099001425937786_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=XkMcfi-9UGkQ7kNvgH5lOUy&_nc_zt=23&_nc_ht=scontent-sin6-1.xx&_nc_gid=AE0czrSR4BprKhSf7A3QK_P&oh=00_AYBsfS8B-jB7EtsgmSKwvFeo6NZDD2POj_Owf8hHgLoluA&oe=6797D510',
          imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
          // href: '#',
        },
        {
          name: 'ดูหนัง',
          description: 'Netflix, Billi, 037hd, anime-sugoi',
          imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn7wWo5yLfL5m8kjRRiAvwqtQE-JmGBXuTEA&s',
          imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
          // href: '#',
        },
        {
          name: 'ฟังเพลง',
          description: 'Billi Eilish, The Weeknd, Silly Fools',
          imageSrc: 'https://dynamicmedia.livenationinternational.com/d/x/x/527f6551-d55c-4c97-be2b-90a38c88057e.jpg?format=webp&width=3840&quality=75',
          imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
          // href: '#',
        },
        {
          name: 'เล่นเกม',
          description: 'Golden Spatula, Valorant, PvZ2',
          imageSrc: 'https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S1_2560x1440-1dade6e50659c8e05805cb150b349e56',
          imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
          // href: '#',
        },
        {
          name: 'เล่นบอร์ดเกม',
          description: 'Catan, The falling sky, Uno, Unmatched',
          imageSrc: 'https://cdn1.epicgames.com/ca93b6d41a4e41af864942d8f0a2a826/offer/GameName_Store_Landscape_2560x1440-2560x1440-43068caa839fc392e6bb54e0daf2e8a8.jpg',
          imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
          // href: '#',
        },
        {
          name: 'กินของอร่อยๆ',
          description: 'Noodle, Sushi, Steak, Pizza',
          imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAfJnTjQ6rx8Y7mqvTnlqpQKsadAjGjmsP1g&s',
          imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
          // href: '#',
        },
        {
          name: 'ออกกำลังกาย',
          description: 'weight training, running, swimming',
          imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT74_oOGcHLzEC0ArRkpei9GrRE08rlklfKpw&s',
          imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
          // href: '#',
        },
      ],
    }
  },
  methods: {
    // เมื่อเริ่มการลาก
    startDrag(event) {
      this.isDragging = true;  // ตั้งค่าให้ isDragging = true
      this.startX = event.pageX - this.$refs.scrollContainer.offsetLeft;
      this.scrollLeft = this.$refs.scrollContainer.scrollLeft;
    },

    // ขณะลากเมาส์
    onDrag(event) {
      if (!this.isDragging) return;  // หากไม่กำลังลากจะไม่ทำอะไร
      const x = event.pageX - this.$refs.scrollContainer.offsetLeft;
      const walk = (x - this.startX) * 1.5;  // คำนวณระยะการเลื่อน
      this.$refs.scrollContainer.scrollLeft = this.scrollLeft - walk;
    },

    // เมื่อปล่อยเมาส์หรือออกจากพื้นที่
    endDrag() {
      this.isDragging = false;  // ตั้งค่า isDragging = false เมื่อหยุดการลาก
    },
  },
}
</script>

<style scoped>
/* Add smooth scrolling behavior */
.scroll-container {
  scroll-behavior: smooth;
}

.left-section {
  /* background: linear-gradient(135deg, #ffcccc, #99ccff); */
  background: white;
  height: 100vh;
}

.right-section {
  background: linear-gradient(180deg, #1976d2, #ffffff);
  height: 100vh;
  padding: 0 50px;
}

.rounded-img {
  border-radius: 20px;
}

.btn-style {
  border: 2px solid black;
  color: black;
  font-size: 18px;
  background: white;
  border-radius: 10px;
}

.social-icons v-icon {
  font-size: 24px;
  cursor: pointer;
}

a {
  color: black;
  text-decoration: none;
  font-weight: bold;
}
</style>
