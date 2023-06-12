<template>
  <div class="spec-preview">
    <!-- 放大镜背景图 -->
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <!-- 放大镜大图 -->
      <img :src="imgObj.imgUrl" ref="bigImg" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'DetailZoom',
  props: ['skuImageList'],
  data() {
    return {
      currentIndex: 0
    }
  },
  mounted() {
    // 利用全局事件总线：获取兄弟组件传递过来的索引值
    this.$bus.$on('getIndex', index => {
      // 修改展示图片的响应式数据
      this.currentIndex = index
    })
  },
  computed: {
    imgObj() {
      return this.skuImageList[this.currentIndex] || {}
    }
  },
  methods: {
    handler(e) {
      let mask = this.$refs.mask
      let bigImg = this.$refs.bigImg
      let left = e.offsetX - mask.offsetWidth * 0.5
      let top = e.offsetY - mask.offsetHeight * 0.5

      // 约束范围
      if (left <= 0) left = 0
      if (left >= mask.offsetWidth) left = mask.offsetWidth
      if (top <= 0) top = 0
      if (top >= mask.offsetHeight) top = mask.offsetHeight

      // 修改元素的left 和 top值
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'

      // 二倍图关系
      bigImg.style.left = -2 * left + 'px'
      bigImg.style.top = -2 * top + 'px'
    }
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(70, 66, 66, 0.7);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
