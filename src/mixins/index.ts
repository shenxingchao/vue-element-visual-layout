const mixins: any = () => {
  //递归删除旧的占位块
  const _handleRecursionDelete: any = (
    component_tree_list: any,
    flag: any = false
  ) => {
    for (let i = component_tree_list.length - 1; i >= 0; i--) {
      //找到了占位块节点
      if (component_tree_list[i].id == 'block_node') {
        //删除占位块并返回 占位块只能存在一块 所以有多的占位块就是BUG
        component_tree_list.splice(i, 1)
        flag = true
        break
      } else {
        // 继续遍历子级
        if (
          component_tree_list[i].children &&
          component_tree_list[i].children.length > 0
        ) {
          flag = _handleRecursionDelete(component_tree_list[i].children, flag)
          if (flag) {
            //如果删除了，则终止递归
            break
          }
        }
      }
    }
    return flag
  }

  //递归查找父级节点
  const _handleRecursionGetParentNode: any = (
    node: any,
    component_tree_list: any,
    parent_node: any = null
  ) => {
    for (const item of component_tree_list) {
      if (item.id == node.id) {
        parent_node = component_tree_list
        break
      } else {
        if (item.children && item.children.length > 0) {
          parent_node = _handleRecursionGetParentNode(
            node,
            item.children,
            parent_node
          )
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
  return {
    _handleRecursionDelete,
    _handleRecursionGetParentNode,
    _handleRecursionGetNodeByNodeId
  }
}
export default mixins
