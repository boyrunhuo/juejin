> Vue 推荐在绝大多数情况下使用 template 来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力，这时你可以用 render 函数，它比 template 更接近编译器。

使用element UI 1.4版本中的tree组件，要做右键菜单创建、删除文件等功能。由于1.4版本没有node-contextmenu方法。所以使用render-content属性来做。

```JavaScript
<template>
    <div>
        <el-tree
            :data="fileList"
            :render-content="renderContent"
        >
        </el-tree>
    </div>
</template>
<script>
export default {
    methods: {
        handleContextmenu() {
            //处理右键菜单事件
        },
         // 后三个参数为传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
        renderContent(h,{node,data,store}) {
            let self = this
            let listeners = {
                contextmenu:function(e) {
                    self.handleContextmenu(e,data)
                }
            }
            const styleObj = {
                display: 'inline-block',
                width: '100%'
            }
        // 由于vue-cli中使用babel插件配置了transform-vue-jsx，便可以不用再写麻烦的createElement函数
            return (
                // 创建dom节点，并绑定上属性和方法
                <span {...{on:listeners,style: styleObj}}>
                    <span>{data.label}</span>
                </span>
            )
        }
    }
}
   
</script>
```