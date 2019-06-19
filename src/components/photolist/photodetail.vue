<template>
    <div class="photo-container">
        <h2 class="title">{{this.photoInfo.title}}</h2>
        <p class="subtitle">
              <span class="releasetime">发布时间:{{this.photoInfo.add_time | dateFormat}}</span>
              <span class="clicknum">点击{{this.photoInfo.click}}次</span>
        </p>
        <hr>
        <div class="images">
            <img src="http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg" alt="">
            <!-- <img src="http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg" alt="">
            <img src="http://imgm.gmw.cn/attachement/jpg/site215/20190618/103669231905781376.jpg" alt=""> -->
           
        </div>
        <!-- 返回内容带有标签，此种写法解析返回内容里的标签有效 -->
        <div class="content" v-html="this.photoInfo.content">
        </div>
         <!-- 评论区域 引入评论公共子模块-->
        <common :id="this.id"></common>
    </div>
</template>

<script>
     // 1.1 引入评论子组件
    import common from '../common/comment.vue';
    export default {
         data(){
            return {
                // 当当前文章的id保存起来
                id:this.$route.params.id,
                photoInfo:{} //图片数据
              
            }
        },
        created() {//当前组件实例中等待data和methods准备好之后执行
           this.getImageInfo();
        },
        methods: {
           getImageInfo(){
                 // 发起请求
                this.$http.get('api/getimageInfo/'+this.id).then(function(res){
                    console.log('图片详情='+res);
                    if(res.body.status == 0){
                        this.photoInfo =res.body.message[0];
                    }
                    
                });
           }
        },
        // 注册子组件
        components:{
            common:common
        }
    }
</script>

<style lang="scss" scoped>
.photo-container{
    .title{
        text-align: center;
        color: rgb(67, 67, 218);
        font-size: 17px;
        padding: 5px;
    }
    .subtitle{
        color: #ccc;
        overflow: hidden;
        font-size: 13px;
        .releasetime{
            float: left;
            margin-left: 10px;
        }
        .clicknum{
            float: right;
            margin-right: 10px;
        }
    }
    .images{
        img{
            width: 100%;
            padding: 0px 5px;
        }
    }
    .content{
        font-size: 13px;
        line-height: 25px;
    }
}
</style>