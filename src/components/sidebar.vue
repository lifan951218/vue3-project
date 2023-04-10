<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="sidebar.collapse"
            background-color="#966033"
            text-color="#bfcbd9"
            active-text-color="#141b1d"
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
    title: '数据导入',
    permiss: '1',
    subs: [
      {
        index: '/dashboard',
        title: '手动输入',
        permiss: '2',
      },
      {
        index: '/1-2',
        title: '上传文件',
        permiss: '2',
      },
      {
        index: '/1-3',
        title: '数据库连接',
        permiss: '2',
      }
    ],
  },
  {
    icon: 'Calendar',
    index: '2',
    title: '社交网络分析',
    permiss: '2',
    subs: [
      {
        index: '/2-1',
        title: '网络可视化',
        permiss: '2',
      },
      {
        index: '/2-2',
        title: '关系挖掘',
        permiss: '2',
      },
      {
        index: '/2-3',
        title: '社群发现',
        permiss: '2',
      }
    ]
  },
  {
    icon: 'DocumentCopy',
    index: '3',
    title: '文本分析',
    permiss: '13',
    subs: [
      {
        index: '/3-1',
        title: '情感分析',
        permiss: '2',
      },
      {
        index: '/3-2',
        title: '文本分类',
        permiss: '2',
      },
      {
        index: '/3-3',
        title: '关键词提取',
        permiss: '2',
      }
    ]
  },
  {
    icon: 'CoffeeCup',
    index: '4',
    title: '数据分析',
    permiss: '13',
    subs: [
      {
        index: '/4-1',
        title: '数据探索性分析',
        permiss: '2',
      },
      {
        index: '/4-2',
        title: '统计分析',
        permiss: '2',
      }
    ],
  },
  {
    icon: 'PieChart',
    index: '5',
    title: '数据可视化',
    permiss: '13',
    subs: [
      {
        index: '/5-1',
        title: '图表展示',
        permiss: '2',
      },
      {
        index: '/5-2',
        title: '自定义报告生成',
        permiss: '2',
      },
      {
        index: '/5-3',
        title: '数据导出',
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
  background-color: #966033;
}
.sidebar > ul {
    height: 100%;
}
</style>
