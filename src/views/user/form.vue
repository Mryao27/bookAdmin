<template>
  <el-dialog
    :visible.sync="dialog"
    :before-close="resetForm"
    :title="isAdd ? '新增用户' : '编辑用户'"
    append-to-body
    width="550px"
  >
    <el-form
      ref="form"
      :inline="true"
      :model="form"
      size="small"
      label-width="66px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item v-show="!isAdd" label="密码" prop="password">
        <el-input v-model="form.password" placeholder="为空则不修改密码" />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="form.avatar" />
        <img
          v-show="form.avatar"
          :src="form.avatar"
          style="width: 50px; height: 50px"
        />
        <my-upload :show-file-list="false" :file-count="1" v-model="form.avatar"></my-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit"
        >确认</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { save } from "@/api/user";
import MyUpload from "@/views/components/Upload";

export default {
  components: {
    MyUpload,
  },
  props: {
    isAdd: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        username: "",
        phone: "",
        email: "",
        avatar: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", triger: "blur" },
          { min: 2, max: 20, message: "长度再 2 到 20 个字符", triger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
        phone: [
          // { required: true, trigger: 'blur', validator: validPhone }
          { required: true, message: "请输入电话", trigger: "blur" },
        ],
        password: [
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        username: "",
        phone: "",
        email: "",
        avatar: "",
      };
    },
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.username === "") {
            this.$message({
              message: "用户名不能为空",
              type: "warning",
            });
          } else {
            this.loading = true;
            if (this.isAdd) {
              this.doAdd();
            } else this.doEdit();
          }
        } else {
          return false;
        }
      });
    },
    doAdd() {
      save(this.form)
        .then((res) => {
          this.resetForm();
          this.$notify({
            title: "添加成功",
            message: "默认密码：123456",
            type: "success",
            duration: 2500,
          });
          this.loading = false;
          this.$parent.init();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    doEdit() {
      save(this.form)
        .then((res) => {
          this.resetForm();
          this.$notify({
            title: "修改成功",
            type: "success",
            duration: 2500,
          });
          this.loading = false;
          this.$parent.init();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
</style>
