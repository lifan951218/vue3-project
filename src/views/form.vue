<template>
    <div class="container">
        <div class="form-box">
            <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">

              <el-form-item label="会员" prop="region">
                <el-select v-model="form.region" placeholder="请选择会员" multiple>
                  <el-option key="联系人1" label="会员1" value="联系人1"></el-option>
                  <el-option key="联系人2" label="联系人2" value="联系人2"></el-option>
                </el-select>
              </el-form-item>
          <div><el-button type="primary" @click="flag=!flag">生成客户画像</el-button> </div>
            </el-form>
        </div>
    </div>
  <div class="container">
    <div>
      <el-table :data="appointments" v-if="flag">

        <el-table-column prop="name" label="会员名称">

        </el-table-column>

        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="type" label="级别"></el-table-column>
        <el-table-column prop="date" label="偏好产品"></el-table-column>
        <el-table-column prop="service" label="未涉及产品"></el-table-column>
        <el-table-column prop="service2" label="社交媒体偏好"></el-table-column>
        <el-table-column prop="service3" label="已消费金额"></el-table-column>
        <el-table-column prop="service4" label="喜好的消费渠道"></el-table-column>
        <el-table-column prop="service5" label="购买频率"></el-table-column>


      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts" name="baseform">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

const appointments = ref([
  {
    name: '会员1',
    type: 'SVIP',
    phone: '13000000000',
    date: '商品1',
    service: '商品10',
    service2: '微信、微博',
    service3: '3287 RMB',
    service4: '京东',
    service5: '高'
  }
]);

const  flag = ref(false);



const options = [
    {
        value: 'guangdong',
        label: '广东省',
        children: [
            {
                value: 'guangzhou',
                label: '广州市',
                children: [
                    {
                        value: 'tianhe',
                        label: '天河区',
                    },
                    {
                        value: 'haizhu',
                        label: '海珠区',
                    },
                ],
            },
            {
                value: 'dongguan',
                label: '上海市',
                children: [
                    {
                        value: 'changan',
                        label: '长安镇',
                    },
                    {
                        value: 'humen',
                        label: '虎门镇',
                    },
                ],
            },
        ],
    },
    {
        value: 'hunan',
        label: '湖南省',
        children: [
            {
                value: 'changsha',
                label: '长沙市',
                children: [
                    {
                        value: 'yuelu',
                        label: '岳麓区',
                    },
                ],
            },
        ],
    },
];
const rules: FormRules = {
    name: [{ required: true, message: '请输入表单名称', trigger: 'blur' }],
};
const formRef = ref<FormInstance>();
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: true,
    type: ['联系人1'],
    resource: '联系人2',
    desc: '',
    options: [],
});
// 提交
const onSubmit = (formEl: FormInstance | undefined) => {
    // 表单校验
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            console.log(form);
            ElMessage.success('提交成功！');
        } else {
            return false;
        }
    });
};
// 重置
const onReset = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};
</script>
