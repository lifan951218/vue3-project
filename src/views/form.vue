<template>
    <div class="container">
        <div class="form-box">
            <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="产品类别" prop="region">
                    <el-select v-model="form.region" placeholder="请选择产品类别" multiple>
                        <el-option key="类别1" label="类别1" value="联系人1"></el-option>
                        <el-option key="类别2" label="类别2" value="联系人2"></el-option>
                    </el-select>
                </el-form-item>
              <el-form-item label="通知人员" prop="region">
                <el-select v-model="form.region" placeholder="请选择产品类别" multiple>
                  <el-option key="联系人1" label="联系人1" value="联系人1"></el-option>
                  <el-option key="联系人2" label="联系人2" value="联系人2"></el-option>
                </el-select>
              </el-form-item>
                <el-form-item label="生效日期">
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.date1"
                                style="width: 100%"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="date2">
                            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%">
                            </el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="重复通知" prop="delivery">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="通知类型" prop="type">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="微信通知" name="type"></el-checkbox>
                        <el-checkbox label="手机短信" name="type"></el-checkbox>
                        <el-checkbox label="平台通知" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
          <div><el-button type="primary">确定</el-button> </div>
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
