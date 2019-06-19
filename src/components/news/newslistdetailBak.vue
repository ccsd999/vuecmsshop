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
        <!-- 评论区域 -->
        <div class="comment">
                <h2 class="title">发表评论</h2>
                <textarea cols="30" rows="10" placeholder="请输入评论内容(最多150个字)" v-model="content"></textarea>
                <mt-button type="primary" size="large" @click="postComments()"> 发表评论 </mt-button>
                <!-- 评论列表 -->
                <div class="list">
                    <div class="list-item" v-for="(item,index) in comments" :key="index">
                        <div class="info">
                            <div class="info_title">第{{index+1}}楼用户 {{item.user_name}}  发表时间：{{item.add_time | dateFormat}}</div> 
                            <div class="info_content">
                               {{item.content}}
                            </div>
                        </div>
                    </div>
                </div>  
                <!-- 加载更多 -->
                <mt-button type="danger" plain size="large" @click="loadMore()"> 加载更多 </mt-button>
            </div>
    

    </div>
</template>

<script>
    //引入弹框提示组件
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                // 当当前文章的id保存起来
                id:this.$route.params.id,
                newsInfo:{},
                pageindex:1,  //默认第一页评论数据
                comments:[], //保存评论数据
                content:''  //双向绑定的数据
            }
        },
        // 调用方法
        created(){
            this.getnewsinfo();
            // 获取评论数据
            this.getComments();
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
            },
             // 获取当前文章的评论数据
            getComments(){
                 this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(function(res){
                     console.log('获取评论=',res);
                    if(res.body.status == 0){
                            if(res.body.message.length == 0){
                            Toast("没有更多数据了");
                            return;
                            }
                        //  this.comments =res.body.message;
                        //加载评论数据，不能覆盖原评论数据，应该要把旧数据使用concat链接在一起
                        this.comments = this.comments.concat(res.body.message);
                    }
                });
            },
           
             // 发表评论
            postComments (){
                if(this.content.trim() == '' ){
                    alert('发布内容不能为空');
                    return;
                }
                this.$http.post('api/postcomment/'+this.id,{content:this.content},{emulateJSON:true}).then(function(res){
                    console.log('发表评论=',res);
                    if(res.body.status == 0){
                        Toast("评论成功");
                        //把当前的评论数据放在数组的末端
                        this.content = ''; //清空评论的信息
                        this.comments = []; //清空数据
                        this.getComments(); //重新加载最新的评论信息
                    }
                });
                
            },
           
            // 加载更多
            loadMore(){
                // 页码加1 再发起请求
                this.pageindex++;
                 // 获取评论数据
                this.getComments();
            }
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
.comment{
    padding: 5px 10px;
    .title{
        font-size: 18px;
    }
    textarea{
        font-size: 13px;
        height: 130px;
    }
    .list{
        .list-item{
            padding: 5px 1px;
            .info{
                .info_title{
                    background-color: #ccc;
                    font-size: 14px;
                }
                .info_content{
                    padding: 5px;
                }
            }
        }
    }
}

</style>
