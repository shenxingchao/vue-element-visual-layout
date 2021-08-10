<template>
  <el-row v-if="showFilter||showSearch" class="check-cloumn-container">
    <slot v-if="showSearch" name="searchBar"></slot>
  </el-row>
  <el-table ref="multipleTableRef" :data="data" :row-key="hanldeRowKey" border fit default-expand-all size="mini"
            tooltip-effect="dark" @row-click="handleRowClick" @select="handleSelect" @select-all="handleSelectAll"
            @selection-change="handleSelectionChange" @row-dblclick="handleRowDblClick">
    <!-- 多选框checkbox -->
    <el-table-column v-if="showSelection" type="selection" width="55">
    </el-table-column>
    <el-table-column v-for="(item,index) in tableHead" :key="index" :width="item.width ? item.width : ''"
                     :align="item.align||'center'" :label="item.label" :prop="item.prop" show-overflow-tooltip>
      <template v-slot="scope">
        <!-- 单元格渲染html代码 -->
        <template v-if="item.render"><span v-html="item.render(scope.row)"></span></template>
        <!-- 渲染普通文字 -->
        <template v-else>{{scope.row[item.prop]}}</template>
      </template>
    </el-table-column>
    <!-- 操作列 -->
    <el-table-column v-if="showOpt" align="center" label="操作" :width="optWidth">
      <template v-slot="scope">
        <el-button size="mini" icon="el-icon-edit" type="primary" @click.stop="handleEdit(scope.$index, scope.row)">
        </el-button>
        <el-button size="mini" icon="el-icon-delete" type="danger" @click.stop="handleDelete(scope.$index, scope.row)">
        </el-button>
        <slot :scope="scope" name="opt">
        </slot>
      </template>
    </el-table-column>
  </el-table>
  <el-row v-if="showPage" class="block">
    <el-pagination :current-page="params.page" :total="params.total" :page-sizes="params.page_sizes"
                   :page-size="params.page_size" background layout="total, sizes, prev, pager, next, jumper"
                   @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </el-row>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CustomeTable',
  props: {
    //显示多选框
    showSelection: {
      type: Boolean,
      default: true,
    },
    //多选框是否为单选
    isRadio: {
      type: Boolean,
      default: false,
    },
    //表头数据
    tableHead: {
      type: Array,
      default: () => {
        return []
      },
    },
    //表格数据
    data: {
      type: Array,
      default: () => {
        return []
      },
    },
    //显示分页
    showPage: {
      type: Boolean,
      default: true,
    },
    //分页参数
    params: {
      type: Object,
      default: null,
    },
    //显示筛选
    showFilter: {
      type: Boolean,
      default: true,
    },
    //显示搜索
    showSearch: {
      type: Boolean,
      default: true,
    },
    //显示操作
    showOpt: {
      type: Boolean,
      default: true,
    },
    //操作列最小宽度
    optWidth: {
      type: Number,
      default: 120,
    },
  },
  //组件发出的事件需要定义
  emits: [
    'handleSelectionChange',
    'handleRowDblClick',
    'handleEdit',
    'handleDelete',
    'handleSizeChange',
    'handleCurrentChange',
  ],
  setup(props, { emit }) {
    //表格dom对象
    let multipleTableRef: any = ref(null)

    //基本变量
    let selectionId: any = ref(null)

    //行key
    const hanldeRowKey = (row: any) => {
      return row._id
    }

    //单击一行 选中
    const handleRowClick = (row: any) => {
      if (props.isRadio) {
        //单选
        multipleTableRef.value.clearSelection()
        if (row) {
          //如果选中了行
          if (row._id == selectionId.value) {
            //如果选中的还是上一行
            selectionId.value = ''
            emit('handleSelectionChange', null)
            multipleTableRef.value.toggleRowSelection(row, false)
          } else {
            //如果是其他行
            selectionId.value = row._id
            emit('handleSelectionChange', row._id)
            multipleTableRef.value.toggleRowSelection(row, true)
          }
        } else {
          //如果没有选中
          selectionId.value = ''
          emit('handleSelectionChange', null)
          multipleTableRef.value.toggleRowSelection(row, true)
        }
      } else {
        //多选
        multipleTableRef.value.toggleRowSelection(row)
      }
    }

    //选择
    const handleSelect = (selection: any[], row: any) => {
      if (props.isRadio) {
        // 清除所有选中
        multipleTableRef.value.clearSelection()
        if (selection.length === 0) {
          emit('handleSelectionChange', null)
          return
        }
        // 将当前点击项选中
        multipleTableRef.value.toggleRowSelection(row, true)
        if (row) {
          emit('handleSelectionChange', row._id)
        }
      }
    }

    //全选
    const handleSelectAll = (selection: any[], row: any) => {
      if (props.isRadio) {
        multipleTableRef.value.clearSelection()
      }
    }

    //选中行状态改变
    const handleSelectionChange = (rows: any[]) => {
      if (!props.isRadio) {
        //多选
        let selectionIdList: any[] = []
        rows.forEach((element) => {
          selectionIdList.push(element._id)
        })
        emit('handleSelectionChange', selectionIdList)
      }
    }

    //双击打开编辑
    const handleRowDblClick = (val: any) => {
      let _id = val._id
      emit('handleRowDblClick', _id)
    }

    //编辑操作
    const handleEdit = (index: number, row: any) => {
      emit('handleEdit', index, row)
    }

    //删除操作
    const handleDelete = (index: Number, row: any) => {
      emit('handleDelete', index, row)
    }

    //分页页数切换
    const handleSizeChange = (val: number) => {
      emit('handleSizeChange', val)
    }

    //切换当前页
    const handleCurrentChange = (val: number) => {
      emit('handleCurrentChange', val)
    }

    return {
      multipleTableRef,
      selectionId,
      hanldeRowKey,
      handleRowClick,
      handleSelect,
      handleSelectAll,
      handleSelectionChange,
      handleRowDblClick,
      handleEdit,
      handleDelete,
      handleSizeChange,
      handleCurrentChange,
    }
  },
})
</script>


// ._id 替换成你自己的id  _id是nedb的自增变量