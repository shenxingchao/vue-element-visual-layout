const mixins: any = () => {
  //递归删除指定id的节点及其子节点
  const _handleRecursionDelete: any = (
    id: any,
    component_tree_list: any,
    flag: any = false
  ) => {
    for (let i = component_tree_list.length - 1; i >= 0; i--) {
      //找到了节点
      if (component_tree_list[i].id == id) {
        //删除并返回
        component_tree_list.splice(i, 1)
        flag = true
        break
      } else {
        // 继续遍历子级
        if (
          component_tree_list[i].children &&
          component_tree_list[i].children.length > 0
        ) {
          flag = _handleRecursionDelete(
            id,
            component_tree_list[i].children,
            flag
          )
          if (flag) {
            //如果删除了，则终止递归
            break
          }
        }
      }
    }
    return flag
  }

  //递归查找父级节点 一级节点是list 内层节点是Object
  const _handleRecursionGetParentNode: any = (
    node: any,
    component_tree_list: any,
    parent_node: any = null
  ) => {
    //list
    let list =
      typeof component_tree_list.children != 'undefined'
        ? component_tree_list.children
        : component_tree_list
    for (const item of list) {
      if (item.id == node.id) {
        //这个是父级children
        parent_node = component_tree_list
        break
      } else {
        //这里有个问题 如果children是空的
        if (item.children && item.children.length > 0) {
          parent_node = _handleRecursionGetParentNode(node, item, parent_node)
          if (parent_node) {
            //如果找到了终止递归
            break
          }
        }
      }
    }
    return parent_node
  }

  //递归根据节点id查找节点信息
  const _handleRecursionGetNodeByNodeId: any = (
    id: any,
    component_tree_list: any,
    find_node: null
  ) => {
    for (const item of component_tree_list) {
      if (item.id == id) {
        find_node = item
        break
      } else {
        if (item.children && item.children.length > 0) {
          find_node = _handleRecursionGetNodeByNodeId(
            id,
            item.children,
            find_node
          )
          if (find_node) {
            //如果找到了终止递归
            break
          }
        }
      }
    }
    return find_node
  }

  const _generateCode = (
    component_tree_list: any,
    html: string = '',
    level: number = 0
  ) => {
    component_tree_list.forEach((element: any) => {
      let repeat_space = '' //缩进换行
      if (level > 0) {
        repeat_space = ' '.repeat(level * 2) //按子级嵌套层次 重复缩进
      }
      let start_tag = repeat_space + '<' + element.name //开始标签的左半边名称
      /****这里开始添加属性****/
      //model属性单独添加
      if (element.model && element.model != '') {
        start_tag += ' :model="' + element.model + '"'
      }

      for (const key in element.props) {
        const prop: any = element.props[key]
        //特殊属性判断
        //el-input rows属性 不是textarea的时候不需要加这个属性
        if (
          element.name == 'el-input' &&
          element.props['type'] != 'textarea' &&
          (key as string) == 'rows'
        ) {
          continue
        }

        //其他正常判断
        if (typeof prop == 'string' && prop != '') {
          start_tag += ' ' + key + '="' + prop + '"'
        }
        if (typeof prop == 'number' && prop != 0) {
          start_tag += ' :' + key + '="' + prop + '"'
        }
        if (typeof prop == 'boolean' && prop) {
          start_tag += ' :' + key + '="' + prop.toString() + '"'
        }
      }

      //style 单独添加
      if (element.style && element.style != '') {
        start_tag += ' style="' + element.style + '"'
      }
      /****添加属性结束****/

      html += start_tag + '>\n' //开始标签左半边加属性加右半边
      //渲染内部文本内容 el-button
      if (element.text && element.text != '') {
        html += '   ' + repeat_space + element.text + '\n'
      }
      switch (element.name) {
        case 'el-select':
          //未实现
          break
        default:
          break
      }
      if (element.children && element.children.length > 0) {
        //记录递归前的层级
        let temp_level = level
        level++
        //递归嵌套组件
        html = _generateCode(element.children, html, level)
        //递归完了赋值递归前的层级
        level = temp_level
      }
      //标签尾部
      html += repeat_space + '</' + element.name + '>\n'
    })
    return html
  }

  return {
    _handleRecursionDelete,
    _handleRecursionGetParentNode,
    _handleRecursionGetNodeByNodeId,
    _generateCode
  }
}
export default mixins
