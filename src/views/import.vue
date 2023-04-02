<template>
    <div>
        <div class="container">
          <div style="margin-bottom: 20px">
            请选择库存同步时间
            <el-date-picker
              v-model="date"
              type="datetime"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
            ></el-date-picker>
          </div>
          <div style="margin-bottom: 20px">
            请选择同步库存类型
            <el-select v-model="value2" placeholder="请选择">
              <el-option
                  v-for="item in users"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!--		<div class="mgb20" ref="editor"></div>-->
          <el-button type="primary" @click="">开始同步</el-button>
        </div>
    </div>
</template>

<script setup lang="ts" name="import">
import { UploadProps } from 'element-plus';
import { ref, reactive } from 'vue';
import * as XLSX from 'xlsx';

interface TableItem {
    id: number;
    name: string;
    sno: string;
    class: string;
}

const tableData = ref<TableItem[]>([]);
// 获取表格数据
const getData = () => {
    tableData.value = [
        {
            id: 1,
            name: '服务1',
            sno: '12 RMB',
            class: '理发'
        },
        {
            id: 2,
            name: '服务2',
            sno: '5 RMB',
            class: '洗发'
        },
    ];
};
getData();

const importList = ref<any>([]);
const beforeUpload: UploadProps['beforeUpload'] = async (rawFile) => {
    importList.value = await analysisExcel(rawFile);
    return true;
};
const analysisExcel = (file: any) => {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.onload = function (e: any) {
            const data = e.target.result;
            let datajson = XLSX.read(data, {
                type: 'binary',
            });

            const sheetName = datajson.SheetNames[0];
            const result = XLSX.utils.sheet_to_json(datajson.Sheets[sheetName]);
            resolve(result);
        };
        reader.readAsBinaryString(file);
    });
};

const handleMany = async () => {
    // 把数据传给服务器后获取最新列表，这里只是示例，不做请求
    const list = importList.value.map((item: any, index: number) => {
        return {
            id: index,
            name: item['姓名'],
            sno: item['学号'],
            class: item['班级'],
            age: item['年龄'],
            sex: item['性别'],
        };
    });
    tableData.value.push(...list);
};
</script>

<style scoped>
.handle-box {
    display: flex;
    margin-bottom: 20px;
}

.table {
    width: 100%;
    font-size: 14px;
}
.mr10 {
    margin-right: 10px;
}
</style>
