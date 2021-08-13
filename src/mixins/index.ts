const mixins: any = () => {
  //递归删除旧的占位块
  const _handleRecursionDelete: any = (
    component_tree_list: any,
    is_back: any = false
  ) => {
    for (let i = component_tree_list.length - 1; i >= 0; i--) {
      //找到了占位块节点
      if (component_tree_list[i].id == 'block_node') {
        //删除占位块并返回 占位块只能存在一块 所以有多的占位块就是BUG
        component_tree_list.splice(i, 1)
        break
      } else {
        // 继续遍历子级
        if (
          component_tree_list[i].children &&
          component_tree_list[i].children.length > 0
        ) {
          _handleRecursionDelete(component_tree_list[i].children)
        }
      }
    }
    if (is_back) {
      return component_tree_list
    }
  }

  //递归查找父级节点
  const _handleRecursionGetParentNode: any = (
    node: any,
    component_tree_list: any,
    parent_node: any = component_tree_list
  ) => {
    for (const item of component_tree_list) {
      if (item.id == node.id) {
        break
      } else {
        if (item.children && item.children.length > 0) {
          parent_node = item
          _handleRecursionGetParentNode(node, item.children, parent_node)
        }
      }
    }
    return parent_node
  }
  return { _handleRecursionDelete, _handleRecursionGetParentNode }
}
export default mixins
