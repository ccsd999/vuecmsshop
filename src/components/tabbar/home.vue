<template>
    <div class="home-container">
       <!-- 轮播器 -->
            <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in lunbo" :key="item.img">
                <img class="lunboImg" :src="item.img" alt="">
            </mt-swipe-item>
          
            </mt-swipe>
            <!-- 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/newslist">
		                    <img class="menuImg" src="../../images/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div>
                            </router-link>
                            </li>
                     <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                         <router-link to="home/photolist">
		                     <img class="menuImg" src="../../images/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                     <img class="menuImg" src="../../images/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></a></li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                   <img class="menuImg" src="../../images/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
                     <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                   <img class="menuImg" src="../../images/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
                     <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img class="menuImg" src="../../images/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		           
		        </ul>



    </div>
</template>

<script>
    export default {
        data() {
            return {
                lunbo:[]
            }
        },
        created() {//当前组件实例中等待data和methods准备好之后执行
            this.getLunBo();
        },
        methods: {
            getLunBo(){
                // 发起请求
                this.$http.get('http://127.0.0.1:3000/api/getlunbo').then(function(res){
                    // console.log(res);
                    this.lunbo =res.body.message;
                });
                
            }
        },
    }
</script>

<style lang="scss" scoped>
// 轮播图
.home-container{
    .mint-swipe{
        height: 150px;
        // .mint-swipe-item:nth-child(1){
        //     background-color: olive;
        // }
        // .mint-swipe-item:nth-child(2){
        //      background-color:hotpink;
        // }
        // .mint-swipe-item:nth-child(3){
        //      background-color: yellow;
        // }
    }
}
.lunboImg{
    width: 100%;
    height: 150px;
}
// 九宫格
//ul的背景色
.mui-grid-view.mui-grid-9{
    background-color: #fff;
}
// 选中九宫格的颜色
.mui-table-view.mui-grid-view .mui-table-view-cell>a:not(.mui-btn):active{
    background-color: #fff;
}
// 每一个九宫格cell
.mui-grid-view.mui-grid-9 .mui-media{
    background-color: #fff;
}
// 九宫格的边框
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: 1px solid #fff;
}
// 九宫格icon图片
.menuImg{
   width: 50%;
}
</style>