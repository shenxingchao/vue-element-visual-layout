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
      icon: 'basic',
      children: [
        {
          name: 'el-container',
          title: '布局容器',
          props: {
            direction: 'horizontal'
          },
          style: '',
          children: []
        },
        {
          name: 'el-row',
          title: '行',
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
          title: '列',
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
          title: '按钮',
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
      icon: 'form',
      children: [
        {
          name: 'el-form',
          title: '表单',
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
          title: '表单项',
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
          title: '单选框组',
          props: {
            'v-model': '',
            disabled: false
          },
          value: '',
          style: '',
          children: [
            {
              name: 'el-radio',
              title: '单选按钮',
              props: {
                label: '1'
              },
              text: '选项1',
              style: '',
              children: []
            },
            {
              name: 'el-radio',
              title: '单选按钮',
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
          title: '复选框组',
          props: {
            'v-model': '',
            disabled: false
          },
          value: '',
          style: '',
          children: [
            {
              name: 'el-checkbox',
              title: '复选框',
              props: {
                label: '1'
              },
              text: '复选框A',
              style: '',
              children: []
            },
            {
              name: 'el-checkbox',
              title: '复选框',
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
          title: '输入框',
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
          title: '计数器',
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
          title: '选择器',
          props: {
            'v-model': '',
            multiple: false,
            disabled: false,
            clearable: false,
            'collapse-tags': false,
            filterable: false,
            placeholder: '请选择'
          },
          value: '',
          style: '',
          children: [
            {
              name: 'el-option',
              title: '选项',
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
              title: '选项',
              props: {
                label: '双皮奶',
                value: '2'
              },
              style: '',
              text: '双皮奶1',
              children: []
            }
          ]
        },
        {
          name: 'el-switch',
          title: '开关',
          props: {
            'v-model': '',
            disabled: false
          },
          value: '',
          style: '',
          children: []
        },
        {
          name: 'el-date-picker',
          title: '日期选择器',
          props: {
            'v-model': '',
            type: 'date',
            format: 'YYYY-MM-DD',
            readonly: false,
            disabled: false,
            editable: true,
            clearable: true,
            placeholder: '',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            'range-separator': '至'
          },
          value: '',
          style: '',
          children: []
        }
      ]
    }
  ]
}
export default components_list
