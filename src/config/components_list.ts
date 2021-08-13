/**
数据结构
{
  components: [
    {
      title: '大标题',
      type: '英文标题+类型',
      children: [
        //子控件
        {
          name: '组件名称',
          title: '组件标题',
          props: '组件属性',
          children: [],//子节点
          drop: '是否允许接受子节点'
        }
      ]
    }
  ]
}
 */
const components_list: any = {
  components: [
    {
      title: '基础',
      type: 'Basic',
      icon: 'el-icon-cloudy',
      children: [
        {
          name: 'el-row',
          title: '行 el-row(flex)',
          props: {
            gutter: 0
          },
          children: [],
          drop: true
        },
        {
          name: 'el-col',
          title: '列 el-col',
          props: {
            span: 1 //默认一列 属性右边自己调
          },
          children: [],
          drop: true
        },
        {
          name: 'el-button',
          title: '按钮 el-button',
          props: {},
          children: [],
          drop: true
        }
      ]
    }
  ]
}
export default components_list
