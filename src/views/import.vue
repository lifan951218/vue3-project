<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-upload
                    action="#"
                    :limit="1"
                    accept=".xlsx, .xls"
                    :show-file-list="false"
                    :before-upload="beforeUpload"
                    :http-request="handleMany"
                >
                    <el-button class="mr10" type="success">批量导入</el-button>
                </el-upload>
            </div>
            <el-table :data="tableData" border class="table" header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="sno" label="价格"></el-table-column>
                <el-table-column prop="class" label="类型"></el-table-column>
            </el-table>
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
