<template>
    <div>
        <!-- <h1>新闻列表详情----{{$route.params.id}}</h1> -->
        <!-- <h1>新闻列表详情----{{id}}</h1> -->

        <div class="detail-container">
            <!-- 大标题 -->
            <h4 class="big_title">{{newsInfo.title}}</h4>
            <!-- 小标题 -->
            <div class="small_title"> 
                <span class="add_time">发表时间:{{newsInfo.add_time | dateFormat}}</span> 
                <span class="click">点击{{newsInfo.click}}次</span>
            
            </div>
            <hr>
            <!-- 内容 -->
            <!-- 返回内容带有标签，此种写法解析返回内容里的标签有效 -->
            <div class="content" v-html="newsInfo.content"></div>
        </div>
        <!-- 评论区域 引入评论公共模块-->
        <common></common>

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
                newsInfo:{},
              
            }
        },
         // 调用方法
        created(){
            // 获取新闻数据
            this.getnewsinfo();
        },
        methods:{
            // 发起请求，获取数据
            getnewsinfo(){
                this.$http.get('api/getnew/'+this.id).then(function(res){
                      console.log(res);
                    if(res.body.status == 0){
                         this.newsInfo =res.body.message[0];
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
.detail-container{
    padding: 0px 10px;
    .big_title{
        text-align: center;
        color:red;
    }
    .small_title{
        overflow: hidden;
        font-size: 13px;
        color:blue;
        .add_time{
            float: left;
 
         }
        .click{
            float: right;

        }
        
    }
     .content{
            color:gray;
           
        }
}


</style>
