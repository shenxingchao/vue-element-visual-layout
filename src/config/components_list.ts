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
          text: '内部文字',
          value:'只是用于绑定设计窗口的变量',
          style: '内联样式',
          children: [],//子节点
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
          name: 'el-container',
          title: '布局容器 el-container',
          props: {
            direction: 'horizontal'
          },
          style: '',
          children: []
        },
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
          text: '',
          style: '',
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
          text: '',
          style: '',
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
          style: '',
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
          props: {
            ref: 'ruleForm',
            'label-position': 'right',
            'label-width': '100px',
            inline: false,
            size: 'medium',
            disabled: false
          },
          model: '',
          style: '',
          children: []
        },
        {
          name: 'el-form-item',
          title: '表单项 el-form-item',
          props: {
            prop: '',
            label: '标签名',
            required: false
          },
          children: [],
          style: ''
        },
        {
          name: 'el-radio-group',
          title: '单选框组 el-radio-group',
          props: {
            'v-model': '',
            disabled: false
          },
          value: '',
          style: '',
          children: [
            {
              name: 'el-radio',
              title: '单选按钮 el-radio',
              props: {
                label: '1'
              },
              text: '选项1',
              style: '',
              children: []
            },
            {
              name: 'el-radio',
              title: '单选按钮 el-radio',
              props: {
                label: '2'
              },
              text: '选项2',
              style: '',
              children: []
            }
          ]
        },
        {
          name: 'el-checkbox-group',
          title: '复选框组 el-checkbox-group',
          props: {
            'v-model': '',
            disabled: false
          },
          value: '',
          style: '',
          children: [
            {
              name: 'el-checkbox',
              title: '复选框 el-checkbox',
              props: {
                label: '1'
              },
              text: '复选框A',
              style: '',
              children: []
            },
            {
              name: 'el-checkbox',
              title: '复选框 el-checkbox',
              props: {
                label: '2'
              },
              text: '复选框B',
              style: '',
              children: []
            }
          ]
        },
        {
          name: 'el-input',
          title: '输入框 el-input',
          props: {
            'v-model': '',
            type: 'text',
            maxlength: 0,
            minlength: 0,
            placeholder: '请输入',
            clearable: false,
            'show-password': false,
            rows: 2,
            autosize: false,
            readonly: false,
            resize: 'none',
            disabled: false
          },
          value: '',
          style: '',
          children: []
        },
        {
          name: 'el-input-number',
          title: '计数器 el-input-number',
          props: {
            'v-model': '',
            max: 99999999,
            min: 0,
            step: 1,
            'step-strictly': false,
            precision: 0,
            disabled: false,
            controls: true,
            placeholder: '请输入数值'
          },
          value: 0,
          style: '',
          children: []
        },
        {
          name: 'el-select',
          title: '选择器 el-select',
          props: {
            'v-model': '',
            disabled: false,
            clearable: false,
            filterable: false,
            placeholder: '请选择'
          },
          value: '',
          style: '',
          children: [
            {
              name: 'el-option',
              title: '选项 el-option',
              props: {
                label: '黄金糕',
                value: '1'
              },
              style: '',
              text: '黄金糕1',
              children: []
            },
            {
              name: 'el-option',
              title: '选项 el-option',
              props: {
                label: '双皮奶',
                value: '2'
              },
              style: '',
              text: '双皮奶1',
              children: []
            }
          ]
        }
      ]
    }
  ]
}
export default components_list
