<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="sidebar.collapse"
            background-color="#9b7350"
            text-color="#bfcbd9"
            active-text-color="#171c1f"
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
    title: '盘点管理',
    permiss: '1',
    subs: [
      {
        index: '/dashboard',
        title: '盘点单列表',
        permiss: '2',
      },
      {
        index: '/dashboard2',
        title: '盘点历史记录',
        permiss: '2',
      }
    ],
  },
  {
    icon: 'Calendar',
    index: '/editor',
    title: '商品管理',
    permiss: '2'
  },
  {
    icon: 'Warning',
    index: '2',
    title: '库存管理',
    permiss: '13',
    subs: [
      {
        index: '/markdown',
        title: '库存列表',
        permiss: '2',
      },
      {
        index: '/form',
        title: '库存预警',
        permiss: '2',
      },
      {
        index: '/form2',
        title: '库存报损',
        permiss: '2',
      }
    ]
  },
  {
    icon: 'DocumentCopy',
    index: '/tabs',
    title: '供应商管理',
    permiss: '3',
  },
  {
    icon: 'Warning',
    index: '6',
    title: '报表统计',
    permiss: '13',
    subs: [
      {
        index: '/charts',
        title: '盘点统计',
        permiss: '2',
      },
      {
        index: '/donate',
        title: '库存统计',
        permiss: '2',
      },
      {
        index: '/export',
        title: '销售统计',
        permiss: '2',
      }
    ],
  },
  {
    icon: 'Warning',
    index: '7',
    title: '设置',
    permiss: '13',
    subs: [
      {
        index: '/import',
        title: '库存同步',
        permiss: '2',
      },
      {
        index: '/permission',
        title: '权限管理',
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
  background-color: #9b7350;
}
.sidebar > ul {
    height: 100%;
}
</style>
