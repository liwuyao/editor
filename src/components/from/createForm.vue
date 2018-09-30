<template>
  <el-dialog title="创建表单" :visible.sync="isShowDialog">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="表单名称：">
        <el-input v-model="form.name" v-bind:disabled="!isShowName"></el-input>
      </el-form-item>
      <el-form-item label="表单内容：" v-if="!isShowName">
        <el-button size="mini" @click="innerVisible = true">添加表单项</el-button>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="表单项名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="content"
            label="表单项内容"
            width="180">
          </el-table-column>
          <el-table-column prop="handle" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, tableData)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" v-if="isShowName" @click="createForm">下一步</el-button>
      <el-button type="primary" v-if="!isShowName" @click="createForm">确定</el-button>
    </div>
    <!--内层表单项-->
    <el-dialog width="40%" title="添加表单项" :visible.sync="innerVisible" append-to-body>
      <el-form ref="form" :model="formItem" label-width="100px">
        <el-form-item label="名称：">
          <el-input v-model="formItem.name"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-radio-group v-model="formItem.typeChoose" @change="changeHandler">
            <el-radio label="1" border>单行文本</el-radio>
            <el-radio label="2" border>单选按钮</el-radio>
            <el-radio label="3" border>多选按钮</el-radio>
            <el-radio label="4" border>日期</el-radio>
            <el-radio label="5" border>省市县</el-radio>
            <el-radio label="6" border>下拉选项</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="提醒文字：" v-if="whitchItem == '1'">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="选项：" v-if="whitchItem == '2'||whitchItem == '3'||whitchItem == '6'">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="addFormItem">确 定</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
  var formId = '';
  export default {
    props:["isShowDialog"],
    name: "create-form",
    data() {
      return{
        isShowName: true,
        whitchItem: '1',
        tableData: [],
        form: {
          name: '',
          region: '',
        },
        formItem: {
          name: '',
          typeChoose: '1',
          typeContent: [
            {
              lbName: '提醒文字：'
            }
          ]
        },
        // dialogFormVisible: false,
        innerVisible: false,
      }
    },
    methods:{
      createForm() {
        this.isShowName = false;
        this.$axios({
          method: "POST",
          url: 'http://192.168.201.99:8080/station/form',
          params: {
            stationId: '5b97947f8dac0a2aec8529e9',
            fromName: this.form.name
          }
          // params: {'orderId': row.orderId}
        }).then(function (res) {
          formId = res.data.data.id;
          console.log(res)
        });
      },
      handleDelete(index,rows){
        rows.splice(index, 1);
      },
      changeHandler(value) {
        this.whitchItem = value;
        console.log(value)
      },
      addFormItem() {
        let _this = this;
        this.$axios({
          method: "POST",
          url: 'http://192.168.201.99:8080/station/form/' + formId + '/field',
          params: {
            fieldName: this.formItem.name,
            fieldType: this.whitchItem,
            required0: '0',
            defaultValue: '-',
            fieldSort: '1',
          }
        }).then(function (res) {
          let fieldTypeChinese;
          switch (res.data.data.fieldType) {
            case '1' :
              fieldTypeChinese = '单行文本';
              break;
            case '2' :
              fieldTypeChinese = '单选按钮';
              break;
            case '3' :
              fieldTypeChinese = '多选按钮';
              break;
            case '4' :
              fieldTypeChinese = '日期';
              break;
            case '5' :
              fieldTypeChinese = '省市县';
              break;
            case '6' :
              fieldTypeChinese = '下拉选项';
              break;

          }
          _this.tableData.push({
            name: res.data.data.fieldName,
            content: fieldTypeChinese,
          })
          _this.innerVisible = false;
        });
      },
      cancel(){
        this.isShowDialog = false;
        this.isShowName= true;
        this.$emit('childByValue', this.isShowDialog)
      }
    },
    mounted:function () {
      console.log(this.isShowDialog)
    }
  }
</script>

<style scoped>

</style>
