<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="sidebar.collapse"
            background-color="#3a5175"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
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
    index: '/dashboard',
    title: '预约管理',
    permiss: '1'
  },

  {
    icon: 'Calendar',
    index: '1',
    title: '顾客管理',
    permiss: '2',
    subs: [
      {
        index: '/editor',
        title: '顾客档案',
        permiss: '2',
      },
      {
        index: '/editor2',
        title: '预约记录及评价',
        permiss: '2',
      }
    ],
  },
  {
    icon: 'DocumentCopy',
    index: '/tabs',
    title: '服务管理',
    permiss: '3',
  },
  {
    icon: 'Edit',
    index: '4',
    title: '工作人员管理',
    permiss: '4',
    subs: [
      {
        index: '/important',
        title: '工作人员列表',
        permiss: '2',
      },
      {
        index: '/form',
        title: '任务分配',
        permiss: '2',
      }
    ]
  },
  {
    icon: 'Warning',
    index: '/markdown',
    title: '库存管理',
    permiss: '13'
  },
  {
    icon: 'Warning',
    index: '6',
    title: '报告和统计',
    permiss: '13',
    subs: [
      {
        index: '/charts',
        title: '预约统计',
        permiss: '2',
      },
      {
        index: '/donate',
        title: '收入统计',
        permiss: '2',
      },
      {
        index: '/export',
        title: '服务流行度统计',
        permiss: '2',
      }
    ],
  },
  {
    icon: 'Warning',
    index: '7',
    title: '设置与配置',
    permiss: '13',
    subs: [
      {
        index: '/permission',
        title: '时间表设置',
        permiss: '2',
      },
      {
        index: '/import',
        title: '价格列表设置',
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
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
