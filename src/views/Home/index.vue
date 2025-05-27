<template>
    <div class="data-source">
        <div class="header">
            <el-button type="primary" @click="addEquipment">添加</el-button>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="设备名称">
            </el-table-column>
            <el-table-column
                prop="address"
                label="数据地址">
            </el-table-column>
            <el-table-column
                label="操作">
                <template #default="{row}">
                    <el-button link @click="handleView(row)" type="primary">查看</el-button>
                    <el-button link @click="edit(row)" type="primary">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加设备 -->
        <el-dialog
            :title="type === 1 ? '添加设备' : '编辑设备'"
            v-model="dialogVisible"
            width="30%"
            :before-close="handelCloseDialog">
            <div>
                <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-form-item 
                        label="设备名称"
                        prop="name"
                    >
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item
                        label="数据地址"
                        prop="address"
                     >
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确认</el-button>
                        <el-button @click="handelCloseDialog">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const tableData = ref([
    {
        id: 111,
        name: '土壤PH值',
        address: 'http://www.baidu.com'
    },
    {
        id: 222,
        name: '榕树',
        address: 'http://www.baidu.com'
    },
    {
        id: 333,
        name: '电碳表',
        address: 'http://www.baidu.com'
    },
    {
        id: 444,
        name: '棚内实时温度',
        address: 'http://www.baidu.com'
    }
])

const dialogVisible = ref(false);
const type = ref(1);
const formRef = ref(null);
const form = ref({
    name: undefined,
    address: undefined,
})

const rules = reactive({
    name: [
        { required: true, message: '请输入设备名称', trigger: 'blur' }
    ],
    address: [
        { required: true, message: '请输入数据地址', trigger: 'blur' }
    ],
})

const onSubmit = () => {
    if (!formRef.value) return
    formRef.value.validate((valid) => {
        if (valid) {
            if(type.value === 1){
                tableData.value.push({
                    id: new Date().getTime(),
                    name: form.value.name,
                    address: form.value.address
                })
            }else{
                tableData.value.forEach(item => {
                    if(item.id === form.value.id){
                        item.id = form.value.id
                        item.name = form.value.name
                        item.address = form.value.address
                    }
                })
            }
            handelCloseDialog();
        } else {
            console.log('error submit!')
        }
    })
}

const handelCloseDialog = () => {
    dialogVisible.value = false;
    form.value = {
        name: undefined,
        address: undefined
    }
    if (!formRef.value) return
    formRef.value.resetFields()
}

const handleView = (row) => {
    console.log(row, 'row')
    router.push({
        path: '/home/equipmentDetail',
        query: {
            id: row.id
        }
    })
}

const edit = (row) => {
    form.value = {
        ...row
    }
    type.value = 0;
    dialogVisible.value = true;
}

const addEquipment = () => {
    dialogVisible.value = true;
}
</script>

<style lang="scss" scoped>
.header{
    margin-bottom: 15px;
}
.data-source{
    width: 100%;
    height: 100%;
    padding: 15px;
    background: #fff;
}
</style>