<template>
    <div class="newslist-container">
        <!-- 新闻列表 -->
        <ul class="mui-table-view">
				<li v-for="item in message" :key="item.id" class="mui-table-view-cell mui-media">
                    <!-- 带参数调整 -->
					<router-link :to="'/home/newslist/detail/'+item.id">
                        <!-- 有的图片不显示，是因为线上图片链接失效，替换成有效图片链接即可 -->
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
						<h2>{{item.title}}</h2>
						<p class="mui-ellipsis">
                                 <span>发布时间:{{item.add_time | dateFormat}}</span><span class="clicknum">点击{{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message:[]
            }
        },
        created() {//当前组件实例中等待data和methods准备好之后执行
            this.getLunBo();
        },
        methods: {
            getLunBo(){
                // 发起请求
                this.$http.get('api/getnewslist').then(function(res){
                    // console.log(res);
                    if(res.body.status == 0){
                        this.message =res.body.message;
                    }
                    
                });
                
            }
        },
    }
</script>

<style lang="scss" scoped>
.newslist-container{
    // 标题
    .mui-table-view h2{
        font-size: 19px;
    }
    .mui-ellipsis{
        color:blue;
        font-size: 12px;
         .clicknum{
            float: right;
        }
    }
   
}


</style>