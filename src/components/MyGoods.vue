<template>
  <div id="mygoods">
    <a-button id="upload-image" @click="uploadGoods" style="margin-bottom: 30px">上传商品</a-button>
    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData" style="height:100%;overflow: auto">
<!--      <div slot="footer"><b>ant design vue</b> footer part</div>-->
      <a-list-item slot="renderItem" key="item.title" slot-scope="item">
<!--        <template v-for="{ type } in actions" slot="actions">-->
<!--          <span :key="type">-->
<!--            <a-icon :type="type" style="margin-right: 8px" />-->
<!--            {{ item.goodLike }}-->
<!--          </span>-->
<!--        </template>-->

<!--        <img-->
<!--            slot="extra"-->
<!--            height="100"-->
<!--            alt="logo"-->
<!--            src=""-->
<!--        />-->
        <a-list-item-meta :description="item.goodAbstract">
          <a slot="title" @click="jumpToGood(item.goodId)">{{ item.goodName }}</a>
          <a-avatar slot="avatar" src="https://i.52112.com/icon/256/20131031/298/6505.png" />
        </a-list-item-meta>
        {{ item.goodDescription }}
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
const listData = [];
/*for (let i = 0; i < 1; i++) {
  listData.push({
    // href: 'https://www.antdv.com/',
    title: `MacBook Pro2021`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
        '卖家：' + '132' + ' | 售价：￥189',
    content:
        '九九新，16寸，附送一个1906蔡明生',
    seller:
        'cms',
    price:
        '189'
  });
}*/

export default {
  created() {
    let that = this
    this.$axios.post('http://127.0.0.1:5000/QueryUserGoods', {
      'userId': this.$store.state.userID
    }).then((response) => {
      console.log(response)
      that.listData = response.data
    }).catch((e) => {
      console.log(e)
      this.$notification['error']({
        message: '查询失败',
        description: '未找到用户名'
      })
    })
  },
  data() {
    return {
      listData,
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      },
      actions: [
        // { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'dislike-o', text: '1'},
        // { type: 'message', text: '2' },
      ],
    };
  },
  methods: {
    uploadGoods() {
      this.$router.push('/UploadGoods')
    },
    jumpToGood(goodId) {
      this.$store.state.goodId = goodId
      this.$router.push('/CheckGood')
    }
  }
};
</script>
<style>

</style>
