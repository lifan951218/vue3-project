<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="sidebar.collapse"
            background-color="#2a6b4a"
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
    title: '销售分析',
    permiss: '1',
    subs: [
      {
        index: '/dashboard',
        title: '销售额分析',
        permiss: '2',
      },
      {
        index: '/export',
        title: '客户购买行为分析',
        permiss: '2',
      },
      {
        index: '/export2',
        title: '销售渠道效果分析',
        permiss: '2',
      }
    ],
  },
  {
    icon: 'Calendar',
    index: '2',
    title: '市场分析',
    permiss: '2',
    subs: [
      {
        index: '/cuxiao',
        title: '市场规模分析',
        permiss: '2',
      },
      {
        index: '/device',
        title: '市场份额分析',
        permiss: '2',
      }
    ]
  },
  {
    icon: 'DocumentCopy',
    index: '3',
    title: '财务分析',
    permiss: '13',
    subs: [
      {
        index: '/form',
        title: '资产负债',
        permiss: '2',
      },
      {
        index: '/form2',
        title: '利润与利润率',
        permiss: '2',
      },
      {
        index: '/form3',
        title: '现金流量',
        permiss: '2',
      }
    ]
  },
  {
    icon: 'CoffeeCup',
    index: '6',
    title: '库存分析',
    permiss: '13',
    subs: [
      {
        index: '/donate',
        title: '库存清单',
        permiss: '2',
      },
      {
        index: '/form4',
        title: '采购需求分析',
        permiss: '2',
      }
    ],
  },
  {
    icon: 'PieChart',
    index: '7',
    title: '客户分析',
    permiss: '13',
    subs: [
      {
        index: '/consumer2',
        title: '客户构成分析',
        permiss: '2',
      },
      {
        index: '/device',
        title: '客户满意度调查',
        permiss: '2',
      }
    ],
  },
  {
    icon: 'Setting',
    index: '8',
    title: '人力资源分析',
    permiss: '13',
    subs: [
      {
        index: '/consumer2',
        title: '人员构成分析',
        permiss: '2',
      },
      {
        index: '/device',
        title: '绩效评估分析',
        permiss: '2',
      },
      {
        index: '/device',
        title: '员工流失率分析',
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
  background-color: #2a6b4a;
}
.sidebar > ul {
    height: 100%;
}
</style>
