<template>
  <el-upload
    :file-list="fileList"
    :on-success="handleSuccess"
    :on-change="handleChange"
    :show-file-list="showFileList"
    :before-upload="beforeUpload"
    :action="`http://1.116.155.64:3000/upload/files`"
    accept="image/jpeg,image/png"
    list-type="picture"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
import { getToken } from "@/utils/auth";

export default {
  name: "MyUpload",
  props: {
    showFileList: {
      type: Boolean,
      default: false,
    },
    fileCount: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      fileList: [],
      token: "",
      host: "",
      header: {},
    };
  },
  mounted() {
    // const csrfToken = document
    // .querySelector('meta[name="csrf-token"]')
    // .getAttribute("content");
    // this.header["Authorization"] = `Bearer ${getToken()}`;
    // this.header["CSRF-Token"] = csrfToken;
    // this.host = document.baseURI;
  },
  methods: {
    handleSuccess(response) {
      
      this.$emit("input", response.data);
    },
    handleChange(file, fileList) {
      this.fileList =
        fileList.length > 1 ? fileList.splice(-this.fileCount) : fileList;
    },
    beforeUpload(file) {
      const isLt = file.size / 1024 / 1024 < 500 / 1024;
      const ext = [".png", ".jpg"];
      if (!isLt) {
        this.$message.error("上传图片大小不能超过 500KB!");
      }

      const isExt =
        ext.indexOf(file.name.substring(file.name.lastIndexOf("."))) >= 0;
      if (!isExt) {
        this.$message.error("上传图片只能是png、jpg格式!");
      }
      return isLt && isExt;
    },
  },
};
</script>