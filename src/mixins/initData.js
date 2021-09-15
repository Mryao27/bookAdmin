import { initData } from '@/api/data'

export default {
  data() {
    return {
      loading: true,
      isAdd: false,
      page: 1,
      size: 5,
      total: 0,
      url: '',
      data: [],
      params: {},
      query: {},
      time: 170
    }
  },
  methods: {
    async init() {
      if (!await this.beforeInit()) {
        return
      }
      return new Promise((resolve,reject) => {
        this.loading =true;
        return new Promise((resolve,reject) => {
          initData(this.url, this.params).then(res => {
            console.log(res);
            this.total = res.total;
            this.data = res.list;
            setTimeout(() => {
              this.loading = false;
            }, this.time)
            resolve(res)
          }).catch(err => {
            this.loading = false;
            reject(err)
          })
        })
      })
    },
    beforeInit() {
      return true
    },
    handleSizeChange(e) {
      console.log(`每页 ${e} 条`);
      this.page = 1;
      this.size = e;
      this.init();
    },
    handleCurrentChange(e) {
      console.log(`当前页: ${e}`);
      this.page = e;
      this.init();
    },
  }
}
