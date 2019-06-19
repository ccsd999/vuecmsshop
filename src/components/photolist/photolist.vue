<template>
    <div>
        <!-- 标题分类 -->
      <van-tabs v-model="active" title-active-color="#E6385E" title-inactive-color="#180C04" @click="getCatImages">
             <van-tab v-for="item in cats" :key="item.id" :title="item.title">
                    <div class="photolist">
                        <!-- tag="li"渲染成li标签 -->
                        <!-- 点击传递数据到详情页 -->
                        <router-link tag="li" :to="'/home/photodetail/'+item.id" class="item" v-for="item in images" :key="item.id">
                            <img :src="item.img_url" alt="">
                            <!-- 懒加载图片 -->
                            <!-- <img :v-lazy="item.img_url">  -->
                            <div class="info">
                                <div class="info_title">{{item.title}}</div>
                                <div class="info_body">{{item.zhaiyao}}</div>
                            </div>
                        </router-link>
                    </div>

             </van-tab>
        </van-tabs>
       
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cats:[],//存储标签分页的名称
                active: 0,  //默认选中的标签页
                images:[],//图片数组
            };
        },
        created(){
            // 初始化标签分类标题
            this.getImgaeCat();
            this.getCatImages();
        },
        methods: {
            // 获取标签分类名称
           getImgaeCat(){
                this.$http.get('api/getimgcategory').then(function(res){
                    //console.log('标题分类'+res);
                    
                    if(res.body.status == 0){
                        this.cats = res.body.message;
                          this.cats.unshift({id:0,title:"全部"});
                    }
                    // 项目服务器数据有误，暂用写死数据代替,追加一个全部,错误已经修复
                    // this.cats = [{id:0,title:"全部"},{id:1,title:"空间设计"},{id:2,title:"户型装修"}];

                });
           },
             //  标签页点击事件
            getCatImages(index,title){
                //console.log('index='+index+"----title="+title);
                // 获取对应的下标 标题分类id  ,默认获取全部数据
               var id = this.cats.length == 0 ? 0 : this.cats[ index ].id;
                this.$http.get('api/getcatimages/'+id).then(function(res){
                    // console.log('内容信息='+res);
                    this.images=res.body.message;
                });
             }
        },
    }
</script>

<style lang="scss" scoped>
    .photolist{
        padding: 5px 5px;
        background-color: #fff;
        li{
            box-shadow: 0px 0px 20px #ccc;//div的背景色阴影
            background-color: #EEEFF6;
            list-style:none;//去除li的小黑点
            margin-bottom: 5px;
            position: relative;
            img{
                width: 100%;
                height: 350px;
             }
             //懒加载图片
            //  image[lazy=loading] {
            //     width: 100%;
            //     height: 350px;
            //     margin: auto;
            // }
            .info{
                color: #fff;
                // background-color: black;
                background-color: rgba(0,0,0,0.5);//背景色透明度
                position: absolute;
                bottom: 5px;
                .info_title{
                    font-size: 15px;
                    font-weight:bold;//文本加粗
                }
                .info_body{
                    font-size: 8px;
                }
            }
        }
    }

  

</style>