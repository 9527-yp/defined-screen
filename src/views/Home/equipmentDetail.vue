<template>
    <div class="equipment-page">
        <div>
            <el-button type="primary" @click="addRowName">添加</el-button>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                v-for="item in columnArr"
                :key="item.key"
                :prop="item.key"
                :label="item.name">
            </el-table-column>
        </el-table>

        <el-dialog
            title="添加数据项"
            v-model="dialogVisible"
            width="30%"
            :before-close="handelCloseDialog">
            <div>
                <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="表头名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="表头项" prop="key">
                        <el-select v-model="form.key" placeholder="请选择表头项">
                            <el-option label="userName" value="userName"></el-option>
                            <el-option label="sex" value="sex"></el-option>
                            <el-option label="mobile" value="mobile"></el-option>
                            <el-option label="age" value="age"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button @click="handelCloseDialog">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"



const tableData = ref([
    {
        userName:'张三',
        sex:'男',
        age: 16,
        mobile: '15888888888'
    },
    {
        userName:'李四',
        sex:'女',
        age: 17,
        mobile: '15888888888'
    },
    {
        userName:'王五',
        sex:'男',
        age: 18,
        mobile: '15888888888'
    },
    {
        userName:'赵六',
        sex:'男',
        age: 19,
        mobile: '15888888888'
    }
]);
const columnArr = ref([]);

const form = ref({
    name: undefined,
    key: undefined
})
const rules = reactive({
    name: [
        { required: true, message: '请输入表头名称', trigger: 'blur' }
    ],
    key: [
        { required: true, message: '请选择字段名称', trigger: 'change' }
    ],
})
const dialogVisible = ref(false);
const formRef = ref(null);


const handelCloseDialog = () => {
    dialogVisible.value = false;
    form.value = {
        name: undefined,
        key: undefined
    }
    formRef.value && formRef.value.resetFields()
}

const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            columnArr.value.push({
                key: form.value.key,
                name: form.value.name
            })
            console.log(columnArr.value, 'columnArr')
            handelCloseDialog();
        } else {
            console.log('error submit!')
        }
    })
}
const addRowName = () => {
    dialogVisible.value = true;
};
</script>

<style lang="scss" scoped>
.equipment-page{
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 15px;
}
</style>