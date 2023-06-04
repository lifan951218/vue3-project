<template>
  <el-checkbox-group v-model="selectedValues" @click="handleClick" @change="childChange">
    <slot></slot>
  </el-checkbox-group>
</template>

<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';

const props = defineProps( {
  modelValue: {
    type: Array,
    default: () => []
  }
})
// const selectedValues = ref(props.modelValue);
const selectedValues = ref([]);
const emit = defineEmits(['change', 'update:modelValue']);
const  childChange = (value) => {
  console.log("zizujian:"+value);
}
// 导入 emit 函数
// const change = () => {
//   console.log('zizujian:'+selectedValues.value)
//   emit('change', selectedValues.value);
// }
watch(()=>props.modelValue, (newValues) => {
  console.log('chuanrudezhi:'+newValues)
  selectedValues.value = newValues;
});

const handleClick = (event) => {
  // 如果按下了 Ctrl 键，则进行多选，否则进行单选
  // console.log(event.target.tagName);
  if (event.target.tagName !== 'INPUT') {
    return
  }
  // console.log(event.shiftKey);
  let value = event.target.getAttribute('value')
  if (value === null) {
    return
  }
  if (event.shiftKey) {
    // console.log("多选："+event.target);
    if (selectedValues.value.indexOf(value) === -1) {
      selectedValues.value.push(value)
    } else {
      selectedValues.value.splice(selectedValues.value.indexOf(value), 1)
    }
  } else {
    // console.log("单选：");
    // console.log(event.target.getAttribute('value'));
    selectedValues.value = []
    selectedValues.value.push(value);
  }
  emit('change', selectedValues.value);
  emit('update:modelValue', selectedValues.value);
}
</script>
