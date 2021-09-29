import { initData } from '@/api/data'
import { mapGetters, mapActions } from 'vuex'

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
      time: 170,
      mySelf: []
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
  },
  methods: {
    ...mapActions({
      getInfo:'user/getInfo'
    }),
    async init() {
      if (!await this.beforeInit()) {
        return
      }
      const vm =this
      return new Promise((resolve, reject) => {
        this.loading = true;
        return new Promise((resolve, reject) => {
          initData(this.url, this.params).then(res => {
            this.total = res.total;
            this.data = res.list;
            console.log(this.data);
            console.log('this.user.id',this.user.id);
            vm.getInfo()
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
    dleChangePage(size) {
      if (size === undefined) {
        size = 1
      }
      if (this.data.length === size && this.page !== 1) {
        this.page = this.page - 1
      }
    },
    toQuery() {
      this.page = 1;
      this.init();
    }
  },
}
