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
          title: '行 el-row',
          props: {
            gutter: 0,
            justify: '',
            align: '',
            type: 'flex',
            class: ''
          },
          children: []
        },
        {
          name: 'el-col',
          title: '列 el-col',
          props: {
            span: 3,
            offset: 0,
            push: 0,
            pull: 0,
            class: ''
          },
          children: []
        },
        {
          name: 'el-button',
          title: '按钮 el-button',
          props: {
            size: 'medium',
            type: 'primary',
            plain: false,
            round: false,
            circle: false,
            loading: false,
            disabled: false,
            icon: '',
            autofocus: false,
            class: ''
          },
          text: '按钮',
          children: []
        }
      ]
    },
    {
      title: '表单',
      type: 'Form',
      icon: 'el-icon-s-grid',
      children: [
        {
          name: 'el-form',
          title: '表单 el-form',
          props: {},
          model: '',
          children: []
        },
        {
          name: 'el-form-item',
          title: '表单项 el-form-item',
          props: {
            label: ''
          },
          model: '',
          children: []
        },
        {
          name: 'el-radio-group',
          title: '单选框组 el-radio-group',
          props: {
            disabled: false
          },
          value: '',
          children: [
            {
              name: 'el-radio',
              title: '单选按钮 el-radio',
              props: {
                label: '1'
              },
              text: '选项1',
              children: []
            },
            {
              name: 'el-radio',
              title: '单选按钮 el-radio',
              props: {
                label: '2'
              },
              text: '选项2',
              children: []
            }
          ]
        }
      ]
    }
  ]
}
export default components_list
