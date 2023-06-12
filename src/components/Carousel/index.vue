<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <!-- 遍历轮播图图片 -->
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
// 引入swiper
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
export default {
  name: 'MyCarousel',
  props: ['list'],
  watch: {
    list: {
      // 立即监听
      immediate: true,
      handler() {
        this.$nextTick(() => {
          Swiper.use([Navigation, Pagination, Autoplay])
          new Swiper('.swiper-container', {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            autoplay: {
              delay: 2000
            }
          })
        })
      }
    }
  }
}
</script>
