
export default {
  data() {
    return {
      loading: true,
      isAdd: false
    }
  },
  methods: {
    async init() {
      if (!await this.beforeInit()) {
        return
      }
      // return new Promise((resolve,reject) => {
      //   this.loading =true;
      // })
    },
    beforeInit() {
      return true
    }
  }
}
