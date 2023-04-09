<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="sidebar.collapse"
            background-color="#14607a"
            text-color="#bfcbd9"
            active-text-color="#2caedc"
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
    title: '总览',
    permiss: '1',
    subs: [
      {
        index: '/dashboard',
        title: '经营概况',
        permiss: '2',
      },
      {
        index: '/1-2',
        title: '收入分析',
        permiss: '2',
      },
      {
        index: '/1-3',
        title: '成本分析',
        permiss: '2',
      }
    ],
  },
  {
    icon: 'Calendar',
    index: '2',
    title: '绩效评估',
    permiss: '2',
    subs: [
      {
        index: '/2-1',
        title: '个人绩效',
        permiss: '2',
      },
      {
        index: '/2-2',
        title: '团队绩效',
        permiss: '2',
      },
      {
        index: '/2-3',
        title: '项目绩效',
        permiss: '2',
      }
    ]
  },
  {
    icon: 'DocumentCopy',
    index: '3',
    title: '绩效考核',
    permiss: '13',
    subs: [
      {
        index: '/3-1',
        title: '考核标准',
        permiss: '2',
      },
      {
        index: '/3-2',
        title: '考核流程',
        permiss: '2',
      },
      {
        index: '/3-3',
        title: '考核结果',
        permiss: '2',
      }
    ]
  },
  {
    icon: 'CoffeeCup',
    index: '4',
    title: '绩效报告',
    permiss: '13',
    subs: [
      {
        index: '/4-1',
        title: '月度报告',
        permiss: '2',
      },
      {
        index: '/4-2',
        title: '季度报告',
        permiss: '2',
      },
      {
        index: '/4-3',
        title: '年度报告',
        permiss: '2',
      }
    ],
  },
  {
    icon: 'PieChart',
    index: '5',
    title: '数据管理',
    permiss: '13',
    subs: [
      {
        index: '/5-1',
        title: '数据录入',
        permiss: '2',
      },
      {
        index: '/5-2',
        title: '数据查询',
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
  background-color: #14607a;
}
.sidebar > ul {
    height: 100%;
}
</style>
