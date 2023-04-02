<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="sidebar.collapse"
            background-color="#5a3281"
            text-color="#bfcbd9"
            active-text-color="#18debd"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-sub-menu :index="item.index" :key="item.index" v-permiss="item.permiss">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon"></component>
                            </el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-sub-menu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                                v-permiss="item.permiss"
                            >
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-sub-menu>
                            <el-menu-item v-else :index="subItem.index" v-permiss="item.permiss">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" v-permiss="item.permiss">
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRoute } from 'vue-router';

const items = [
  {
    icon: 'Odometer',
    index: '1',
    title: '数据分析',
    permiss: '1',
    subs: [
      {
        index: '/dashboard',
        title: '客流数据',
        permiss: '2',
      },
      {
        index: '/export',
        title: '销售数据',
        permiss: '2',
      },
      {
        index: '/export2',
        title: '库存数据',
        permiss: '2',
      }
    ],
  },
  {
    icon: 'Calendar',
    index: '2',
    title: '营销策略',
    permiss: '2',
    subs: [
      {
        index: '/markdown',
        title: '推荐活动',
        permiss: '2',
      },
      {
        index: '/cuxiao',
        title: '促销活动',
        permiss: '2',
      },
      {
        index: '/form2',
        title: '社交媒体推广',
        permiss: '2',
      }
    ]
  },
  {
    icon: 'Warning',
    index: '2',
    title: '客户管理',
    permiss: '13',
    subs: [
      {
        index: '/editor',
        title: '会员管理',
        permiss: '2',
      },
      {
        index: '/form',
        title: '客户画像',
        permiss: '2',
      },
      {
        index: '/form3',
        title: '反馈管理',
        permiss: '2',
      }
    ]
  },
  {
    icon: 'Warning',
    index: '6',
    title: '售后服务',
    permiss: '13',
    subs: [
      {
        index: '/donate',
        title: '售后清单',
        permiss: '2',
      },
      {
        index: '/form4',
        title: '售后反馈',
        permiss: '2',
      }
    ],
  },
  {
    icon: 'Calendar',
    index: '7',
    title: '店内运营',
    permiss: '13',
    subs: [
      {
        index: '/consumer2',
        title: '员工管理',
        permiss: '2',
      },
      {
        index: '/device',
        title: '设备管理',
        permiss: '2',
      }
    ],
  }
];


const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
});

const sidebar = useSidebarStore();
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
  /*background-color: #1f2f3d;*/
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  background-color: #5a3281;
}
.sidebar > ul {
    height: 100%;
}
</style>
