<template>
  <div class="user-list">
    <e-form ref="form" :is-add="isAdd" />
    <div class="head-container">
      <el-input
        v-model="query.keyword"
        clearable
        @keyup.enter.native="toQuery"
        placeholder="请输入用户名"
        style="width: 200px"
      />
      <!-- <el-select v-model="enabled" placeholder="状态" class="filter-item" style="width: 150px" @change="toQuery">
        <el-option v-for="item in enabledTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select> -->
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click.native="toQuery"
        >搜索</el-button
      >
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="add"
      >
        新增
      </el-button>
    </div>
    <el-table size="small" style="width: 100%" :data="data" border>
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="电话" prop="phone" />
      <el-table-column label="邮箱" prop="email" />
      <el-table-column label="头像" prop="avatar">
        <template slot-scope="scope">
          <img
            v-show="scope.row.avatar"
            :src="scope.row.avatar"
            alt=""
            min-width="70"
            height="70"
          />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="更新时间" prop="updateTime" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="edit(scope.row)"
            v-show="scope.row.id"
          />
          <el-popover :ref="scope.row.id" width="180" v-show="scope.row.id">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="$refs[scope.row.id].doClose()"
                >取消</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="subDelete(scope.row.id)"
                >确定</el-button
              >
            </div>
            <el-button
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            />
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :total="total"
      style="margin-top: 8px"
      layout="total, prev, pager, next, sizes"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="page"
      :page-size="5"
      :page-sizes="[5, 10, 20, 50]"
    ></el-pagination>
  </div>
</template>

<script>
import { del } from "@/api/user";
import eForm from "./form";
import initData from "@/mixins/initData";
export default {
  name: "UserList",
  components: { eForm },
  mixins: [initData],
  data() {
    return {
      userData: [
        {
          username: "",
          phone: "",
          email: "",
          avatar: "",
          createTime: "",
          updateTime: "",
        },
      ],
      // userData: [
      //   {
      //     username: "yjw",
      //     phone: "12399995687",
      //     email: "1845834182@qq.com",
      //     avatar:
      //       "https://img0.baidu.com/it/u=3540898922,3322938131&fm=26&fmt=auto&gp=0.jpg",
      //     create_time: "2020-09-10 09:42:04",
      //   },
      // ],
    };
  },
  async created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    beforeInit() {
      this.url = "user/list";
      const sort = "id,desc";
      const { keyword } = this.query;
      this.params = { page: this.page, size: this.size, sort: sort, keyword };
      return true;
    },
    // async getUserList() {
    //   const ret = await getUsers();
    //   console.log(ret);
    //   if (ret.iRet !== 0) {
    //     console.log("error");
    //     return;
    //   }
    //   this.userData = ret.data;
    // },
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
    },
    edit(data) {
      console.log(data);
      this.isAdd = false;
      const that = this.$refs.form;
      that.form = Object.assign({}, data);
      that.dialog = true;
    },
    subDelete(id) {
      this.delLoading = true;
      console.log("id是=====", id);

      del(id)
        .then((res) => {
          this.delLoading = false;
          this.$refs[id].doClose();
          this.dleChangePage();
          this.init();
          this.$notify({
            title: "删除成功",
            type: "success",
            duration: 2500,
          });
        })
        .catch((err) => {
          this.delLoading = false;
          this.$refs[id].doClose();
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-list {
  padding: 20px;
  .head-container {
    .filter-item {
      margin-bottom: 10px;
    }
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .el-table {
    font-size: 14px;
    color: #606266;
  }
  .el-table thead {
    color: #909399;
  }
}
</style>
