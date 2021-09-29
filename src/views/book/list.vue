<template>
  <div class="book-list">
    <div class="search">
      <el-input placeholder="请输入书名" />
    </div>
    <h3 style="text-align:center">静态数据：</h3>
    <el-table size="small" style="width: 100%" :data="bookData" border>
      <el-table-column label="书名" prop="name" />
      <el-table-column label="作者" prop="author" />
      <el-table-column label="作者" prop="kinds">
        <template slot-scope="scope">
          <span v-for="(item,i) in scope.row.kinds" :key="i">
            {{ item.shortName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="封面" prop="cover">
        <template slot-scope="scope">
          <img :src="scope.row.cover" alt="" min-width="70" height="70">
        </template>
      </el-table-column>
      <el-table-column label="简介" prop="intro" />
      <el-table-column label="创建日期" prop="createTime" />
      <el-table-column label="操作" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  data() {
    return {
      bookData: [
        {
          name: '三国演义',
          author: '罗贯中',
          kinds: [
            { id: 1, shortName: '名著' },
            { id: 2, shortName: '历史' },
            { id: 3, shortName: '文学经典' }
          ],
          cover: 'https://dss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/boxapp_novel/wh%3D315%2C423/sign=78117d558801a18bf0be1a4caf1a2b3c/9345d688d43f87945707b357dd1b0ef41ad53acb.jpg',
          intro: '天下大势，合久必分，分久必合',
          createTime: '2020-09-10 09:42:04'
        }
      ]
    }
  }
}
</script>

<style scoped>
.book-list{
  padding: 20px;
}
.el-table{
  font-size: 14px;
  color: #606266;
}
.el-table thead{
  color: #909399;
}
</style>
