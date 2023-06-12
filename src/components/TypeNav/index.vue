<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndexOrShowList" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch($event)">
              <div
                class="item bo"
                v-for="(c1, i) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex === i }"
              >
                <h3 @mouseenter="changeIndex(i)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                    c1.categoryName
                  }}</a>
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex === i ? 'block' : 'none' }"
                >
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                          c2.categoryName
                        }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: '',
      show: true
    }
  },

  mounted() {
    // search 组件隐藏
    if (this.$route.name === 'search' || this.$route.name === 'detail') {
      // 当组件挂载完毕 隐藏
      this.show = false
    }
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数就会立即执行一次
      // 注入一个参数state，其实即为大仓库中的数据
      categoryList: function (state) {
        // console.log(this.$store.state === state)
        // 大store是分 home 和 search 模块
        return state.home.categoryList
      }
    })
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    /* changeIndex(i) {
      this.currentIndex = i
    }, */
    changeIndex: throttle(function (i) {
      this.currentIndex = i
    }, 50),
    // 鼠标移除
    leaveIndexOrShowList() {
      this.currentIndex = ''
      // Search 路由组件才执行
      // 注意这里千万不能用 path 后期路由跳转会影响
      if (this.$route.name === 'search' || this.$route.name === 'detail') {
        // 鼠标离开隐藏列表
        this.show = false
      }
    },
    // 鼠标移入，显示分类列表
    enterShow() {
      this.show = true
    },
    // 路由跳转
    goSearch(e) {
      // 编程式导航 + 事件委托
      // 自定义属性
      const { categoryname, category1id, category2id, category3id } = e.target.dataset
      if (categoryname) {
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // 如果路由跳转的时候，带有params参数，需要也传递给服务器
        if (this.$route.params) {
          // 添加params参数 和 query参数
          location.params = this.$route.params
          location.query = query
          this.$router.push(location)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /* &:hover {
            .item-list {
              display: block;
            }
          } */
        }
        .cur {
          background: skyblue;
        }
      }
    }
    // 过渡动画
    // 进入的开始
    .sort-enter {
      height: 0;
    }
    // 动画的结束状态
    .sort-enter-to {
      height: 461px;
    }
    // 动画进行中
    // 定义动画的时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
