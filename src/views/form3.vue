<template>
    <div class="container">
        <div class="form-box">
            <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">

              <el-form-item label="会员" prop="region">
                <el-select v-model="form.region" placeholder="请选择会员" multiple>
                  <el-option key="联系人1" label="联系人1" value="联系人1"></el-option>
                  <el-option key="联系人2" label="联系人2" value="联系人2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="涉及商品" prop="region">
                <el-select v-model="form.region" placeholder="请选择商品" multiple>
                  <el-option key="类别1" label="类别1" value="联系人1"></el-option>
                  <el-option key="类别2" label="类别2" value="联系人2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="反馈类型" prop="region">
                <el-input v-model="form.region"></el-input>
              </el-form-item>
              <el-form-item label="反馈内容" prop="region">
                <el-input v-model="form.region" type="textarea"></el-input>
              </el-form-item>
            </el-form>
          <div><el-button type="primary">提交反馈</el-button> </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="baseform">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

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
