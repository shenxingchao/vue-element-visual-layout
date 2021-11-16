<template>
  <el-aside class="attribute-bar" width="400px">
    <el-tabs v-model="tab_active_name">
      <el-tab-pane name="1">
        <template #label>
          <div class="icon-box tab-label">
            <svg-icon name="attribute" className="icon" />控件属性
          </div>
        </template>
        <h4>{{node_info.title}}</h4>
        <el-form ref="attribute" :model="attribute" label-width="68px">
          <!-- el-container start -->
          <template v-if="node_info.name == 'el-container'">
            <el-form-item v-if="attribute.direction||attribute.direction==''" label="排列方向">
              <el-select v-model="attribute.direction" placeholder="排列方向" clearable>
                <el-option key="horizontal " label="水平" value="horizontal "></el-option>
                <el-option key="vertical" label="垂直" value="vertical"></el-option>
              </el-select>
            </el-form-item>
          </template>
          <!-- el-container end -->
          <!-- el-row start -->
          <template v-if="node_info.name == 'el-row'">
            <el-form-item v-if="node_info.text||node_info.text==''" label="文本">
              <el-input v-model="node_info.text" placeholder="内部文本内容" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="attribute.gutter||attribute.gutter==0" label="栅格间隔">
              <el-input-number v-model="attribute.gutter" :controls="true" :min="0">
              </el-input-number>
            </el-form-item>
            <el-form-item v-if="attribute.justify||attribute.justify==''" label="水平对齐">
              <el-select v-model="attribute.justify" placeholder="水平对齐" clearable>
                <el-option key="start" label="左对齐" value="start"></el-option>
                <el-option key="center" label="居中" value="center"></el-option>
                <el-option key="end" label="右对齐" value="end"></el-option>
                <el-option key="space-around" label="两端对齐(around)" value="space-around"></el-option>
                <el-option key="space-between" label="两端对齐(between)" value="space-between"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="attribute.align||attribute.align==''" label="垂直对齐">
              <el-select v-model="attribute.align" placeholder="垂直对齐" clearable>
                <el-option key="top" label="顶部" value="top"></el-option>
                <el-option key="middle" label="居中" value="middle"></el-option>
                <el-option key="bottom" label="底部" value="bottom"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="attribute.type||attribute.type==''" label="类型">
              <el-input v-model="attribute.type" placeholder="类型" clearable></el-input>
            </el-form-item>
          </template>
          <!-- el-row end -->
          <!-- el-col start -->
          <template v-if="node_info.name == 'el-col'">
            <el-form-item v-if="node_info.text||node_info.text==''" label="文本">
              <el-input v-model="node_info.text" placeholder="内部文本内容" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="attribute.span" label="栅格列数">
              <el-input-number v-model="attribute.span" :controls="true" :min="1" :max="24">
              </el-input-number>
            </el-form-item>
            <el-form-item v-if="attribute.offset||attribute.offset==0" label="左侧间隔">
              <el-input-number v-model="attribute.offset" :controls="true" :min="0" :max="24">
              </el-input-number>
            </el-form-item>
            <el-form-item v-if="attribute.push||attribute.push==0" label="向右移动">
              <el-input-number v-model="attribute.push" :controls="true" :min="0" :max="24"
                               :disabled="attribute.pull>0">
              </el-input-number>
            </el-form-item>
            <el-form-item v-if="attribute.pull||attribute.pull==0" label="向左移动">
              <el-input-number v-model="attribute.pull" :controls="true" :min="0" :max="24"
                               :disabled="attribute.push>0">
              </el-input-number>
            </el-form-item>
          </template>
          <!-- el-col end -->
          <!-- el-button start -->
          <template v-if="node_info.name == 'el-button'">
            <el-form-item v-if="node_info.text||node_info.text==''" label="文本">
              <el-input v-model="node_info.text" placeholder="内部文本内容" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="attribute.size||attribute.size==''" label="尺寸">
              <el-select v-model="attribute.size" placeholder="尺寸" clearable>
                <el-option key="medium" label="正常" value="medium"></el-option>
                <el-option key="small" label="小" value="small"></el-option>
                <el-option key="mini" label="迷你" value="mini"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="attribute.type||attribute.type==''" label="类型">
              <el-select v-model="attribute.type" placeholder="类型" clearable>
                <el-option key="default" label="默认" value="default"></el-option>
                <el-option key="primary" label="主要" value="primary"></el-option>
                <el-option key="success" label="成功" value="success"></el-option>
                <el-option key="warning" label="警告" value="warning"></el-option>
                <el-option key="danger" label="危险" value="danger"></el-option>
                <el-option key="info" label="信息" value="info"></el-option>
                <el-option key="text" label="文本" value="text"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="朴素按钮">
              <el-switch v-model="attribute.plain"></el-switch>
            </el-form-item>
            <el-form-item label="圆角按钮">
              <el-switch v-model="attribute.round"></el-switch>
            </el-form-item>
            <el-form-item label="圆形按钮">
              <el-switch v-model="attribute.circle"></el-switch>
            </el-form-item>
            <el-form-item label="加载中">
              <el-switch v-model="attribute.loading"></el-switch>
            </el-form-item>
            <el-form-item label="禁用">
              <el-switch v-model="attribute.disabled"></el-switch>
            </el-form-item>
            <el-form-item v-if="attribute.icon||attribute.icon==''" label="图标类名">
              <el-input v-model="attribute.icon" placeholder="图标类名" clearable></el-input>
            </el-form-item>
            <el-form-item label="自动聚焦">
              <el-switch v-model="attribute.autofocus"></el-switch>
            </el-form-item>
          </template>
          <!-- el-button end -->
          <!-- el-form-item start -->
          <template v-if="node_info.name == 'el-form'">
            <el-form-item v-if="node_info.model||node_info.model==''" label="表单对象">
              <el-input v-model="node_info.model" placeholder="表单对象 form" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="attribute.ref||attribute.ref==''" label="ref">
              <el-input v-model="attribute.ref" placeholder="ref" clearable></el-input>
            </el-form-item>
            <el-form-item label="行内表单">
              <el-switch v-model="attribute.inline"></el-switch>
            </el-form-item>
            <el-form-item v-if="attribute['label-position']||attribute['label-position']==''" label="标签位置">
              <el-select v-model="attribute['label-position']" placeholder="标签位置" clearable>
                <el-option key="left" label="左对齐" value="left"></el-option>
                <el-option key="top" label="顶部对齐" value="top"></el-option>
                <el-option key="right" label="右对齐" value="right"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="attribute['label-width']||attribute['label-width']==''" label="标签宽度">
              <el-input v-model="attribute['label-width']" placeholder="标签宽度 100px" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="attribute.size||attribute.size==''" label="尺寸">
              <el-select v-model="attribute.size" placeholder="尺寸" clearable>
                <el-option key="medium" label="正常" value="medium"></el-option>
                <el-option key="small" label="小" value="small"></el-option>
                <el-option key="mini" label="迷你" value="mini"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="禁用">
              <el-switch v-model="attribute.disabled"></el-switch>
            </el-form-item>
          </template>
          <!-- el-form-item end -->
          <!-- el-form-item start -->
          <template v-if="node_info.name == 'el-form-item'">
            <el-form-item v-if="attribute.prop||attribute.prop==''" label="属性字段">
              <el-input v-model="attribute.prop" placeholder="属性字段 prop" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="attribute.label||attribute.label==''" label="标签">
              <el-input v-model="attribute.label" placeholder="标签" clearable></el-input>
            </el-form-item>
            <el-form-item label="必填">
              <el-switch v-model="attribute.required"></el-switch>
            </el-form-item>
          </template>
          <!-- el-form-item end -->
          <!-- el-radio-group start -->
          <template v-if="node_info.name == 'el-radio-group'">
            <!-- 渲染选项 -->
            <el-form-item v-if="attribute['v-model']||attribute['v-model'] == ''" label="绑定变量">
              <el-input v-model="attribute['v-model']" placeholder="绑定变量 form.prop" clearable></el-input>
            </el-form-item>
            <el-form-item label="选项设置">
              <template v-for="(item,index) in node_info.children" :key="index">
                <el-row>
                  <el-col :span="10">
                    <el-input size="small" v-model="item.text" placeholder="名称" clearable></el-input>
                  </el-col>
                  <el-col :span="8" :offset="1">
                    <el-input size="small" v-model="item.props.label" placeholder="值" clearable></el-input>
                  </el-col>
                  <el-col :span="4" :offset="1">
                    <el-button v-if="index > 1" size="mini" type="danger"
                               @click="handleClickDeleteRadioItem(node_info,index)">
                      <svg-icon name="minus" className="icon" />
                    </el-button>
                  </el-col>
                </el-row>
              </template>
              <el-row>
                <el-col :span="4" :offset="1">
                  <el-button size="mini" type="primary" @click="handleClickAddRadioItem(node_info)">
                    <svg-icon name="plus" className="icon" />
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="禁用">
              <el-switch v-model="attribute.disabled"></el-switch>
            </el-form-item>
          </template>
          <!-- el-radio-group end -->
          <!-- el-checkbox-group start -->
          <template v-if="node_info.name == 'el-checkbox-group'">
            <!-- 渲染选项 -->
            <el-form-item v-if="attribute['v-model']||attribute['v-model'] == ''" label="绑定变量">
              <el-input v-model="attribute['v-model']" placeholder="绑定变量 form.prop" clearable></el-input>
            </el-form-item>
            <el-form-item label="选项设置">
              <template v-for="(item,index) in node_info.children" :key="index">
                <el-row>
                  <el-col :span="10">
                    <el-input size="small" v-model="item.text" placeholder="名称" clearable></el-input>
                  </el-col>
                  <el-col :span="8" :offset="1">
                    <el-input size="small" v-model="item.props.label" placeholder="值" clearable></el-input>
                  </el-col>
                  <el-col :span="4" :offset="1">
                    <el-button v-if="index > 1" size="mini" type="danger"
                               @click="handleClickDeleteCheckBoxItem(node_info,index)">
                      <svg-icon name="minus" className="icon" />
                    </el-button>
                  </el-col>
                </el-row>
              </template>
              <el-row>
                <el-col :span="4" :offset="1">
                  <el-button size="mini" type="primary" @click="handleClickAddCheckBoxItem(node_info)">
                    <svg-icon name="plus" className="icon" />
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="禁用">
              <el-switch v-model="attribute.disabled"></el-switch>
            </el-form-item>
          </template>
          <!-- el-checkbox-group end -->
          <!-- el-input start -->
          <template v-if="node_info.name == 'el-input'">
            <el-form-item v-if="attribute['v-model']||attribute['v-model'] == ''" label="绑定变量">
              <el-input v-model="attribute['v-model']" placeholder="绑定变量 form.prop" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="attribute.type||attribute.type==''" label="类型">
              <el-select v-model="attribute.type" placeholder="类型" clearable>
                <el-option key="text" label="文本" value="text"></el-option>
                <el-option key="number" label="数字" value="number"></el-option>
                <el-option key="password" label="密码" value="password"></el-option>
                <el-option key="textarea" label="文本域" value="textarea"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="attribute.maxlength||attribute.maxlength==0" label="最大长度">
              <el-input-number v-model="attribute.maxlength" :controls="true" :min="0">
              </el-input-number>
            </el-form-item>
            <el-form-item v-if="attribute.minlength||attribute.minlength==0" label="最小长度">
              <el-input-number v-model="attribute.minlength" :controls="true" :min="0">
              </el-input-number>
            </el-form-item>
            <el-form-item v-if="attribute.placeholder||attribute.placeholder==''" label="占位文本">
              <el-input v-model="attribute.placeholder" placeholder="占位文本" clearable></el-input>
            </el-form-item>
            <el-form-item label="清空">
              <el-switch v-model="attribute.clearable"></el-switch>
            </el-form-item>
            <el-form-item label="密文">
              <el-switch v-model="attribute['show-password']"></el-switch>
            </el-form-item>
            <el-form-item v-if="attribute.type == 'textarea'&&(attribute.rows||attribute.rows==0)" label="输入行数">
              <el-input-number v-model="attribute.rows" :controls="true" :min="2">
              </el-input-number>
            </el-form-item>
            <el-form-item v-if="attribute.type == 'textarea'" label="自动高度">
              <el-switch v-model="attribute.autosize"></el-switch>
            </el-form-item>
            <el-form-item v-if="attribute.type == 'textarea'" label="缩放">
              <el-select v-model="attribute.resize" placeholder="缩放" clearable>
                <el-option key="none" label="无缩放" value="none"></el-option>
                <el-option key="both" label="全部缩放" value="both"></el-option>
                <el-option key="horizontal" label="水平缩放" value="horizontal"></el-option>
                <el-option key="vertical" label="垂直缩放" value="vertical"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="只读">
              <el-switch v-model="attribute.readonly"></el-switch>
            </el-form-item>
            <el-form-item label="禁用">
              <el-switch v-model="attribute.disabled"></el-switch>
            </el-form-item>
          </template>
          <!-- el-input end -->
          <!-- el-input-number start -->
          <template v-if="node_info.name == 'el-input-number'">
            <el-form-item v-if="attribute['v-model']||attribute['v-model'] == ''" label="绑定变量">
              <el-input v-model="attribute['v-model']" placeholder="绑定变量 form.prop" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="attribute.max||attribute.max==0" label="最大值">
              <el-input-number v-model="attribute.max" :controls="true" :min="0">
              </el-input-number>
            </el-form-item>
            <el-form-item v-if="attribute.min||attribute.min==0" label="最小值">
              <el-input-number v-model="attribute.min" :controls="true" :min="0">
              </el-input-number>
            </el-form-item>
            <el-form-item v-if="attribute.step||attribute.step==0" label="步长">
              <el-input-number v-model="attribute.step" :controls="true" :min="1">
              </el-input-number>
            </el-form-item>
            <el-form-item label="输入倍数">
              <el-switch v-model="attribute['step-strictly']"></el-switch>
            </el-form-item>
            <el-form-item v-if="attribute.precision||attribute.precision==0" label="精度">
              <el-input-number v-model="attribute.precision" :controls="true" :min="0">
              </el-input-number>
            </el-form-item>
            <el-form-item label="禁用">
              <el-switch v-model="attribute.disabled"></el-switch>
            </el-form-item>
            <el-form-item label="控制按钮">
              <el-switch v-model="attribute.controls"></el-switch>
            </el-form-item>
            <el-form-item v-if="attribute.placeholder||attribute.placeholder==''" label="占位文本">
              <el-input v-model="attribute.placeholder" placeholder="占位文本" clearable></el-input>
            </el-form-item>
          </template>
          <!-- el-input-number end -->
          <!-- el-select start -->
          <template v-if="node_info.name == 'el-select'">
            <!-- 渲染选项 -->
            <el-form-item v-if="attribute['v-model']||attribute['v-model'] == ''" label="绑定变量">
              <el-input v-model="attribute['v-model']" placeholder="绑定变量 form.prop" clearable></el-input>
            </el-form-item>
            <el-form-item :label-width="0">
              <el-row>
                <label class="el-form-item__label" style="width: 68px;">选项设置</label>
              </el-row>
              <template v-for="(item,index) in node_info.children" :key="index">
                <el-row>
                  <el-col :span="7">
                    <el-input size="small" v-model="item.text" placeholder="下拉值" clearable></el-input>
                  </el-col>
                  <el-col :span="7" :offset="1">
                    <el-input size="small" v-model="item.props.label" placeholder="显示值" clearable></el-input>
                  </el-col>
                  <el-col :span="4" :offset="1">
                    <el-input size="small" v-model="item.props.value" placeholder="值" clearable></el-input>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <el-button v-if="index > 1" size="mini" type="danger"
                               @click="handleClickDeleteSelectItem(node_info,index)">
                      <svg-icon name="minus" className="icon" />
                    </el-button>
                  </el-col>
                </el-row>
              </template>
              <el-row>
                <el-col :span="4" :offset="1">
                  <el-button size="mini" type="primary" @click="handleClickAddSelectItem(node_info)">
                    <svg-icon name="plus" className="icon" />
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="多选">
              <el-switch v-model="attribute.multiple" @change="((val)=>{
                          if(val){
                            node_info.value = []
                          }else{
                            node_info.value = ''
                            attribute['collapse-tags'] = false
                          }
                         })">
              </el-switch>
            </el-form-item>
            <el-form-item label="禁用">
              <el-switch v-model="attribute.disabled"></el-switch>
            </el-form-item>
            <el-form-item label="清空">
              <el-switch v-model="attribute.clearable"></el-switch>
            </el-form-item>
            <el-form-item v-if="attribute.multiple" label="多选合并">
              <el-switch v-model="attribute['collapse-tags']"></el-switch>
            </el-form-item>
            <el-form-item label="搜索">
              <el-switch v-model="attribute.filterable"></el-switch>
            </el-form-item>
            <el-form-item v-if="attribute.placeholder||attribute.placeholder==''" label="占位文本">
              <el-input v-model="attribute.placeholder" placeholder="占位文本" clearable></el-input>
            </el-form-item>
          </template>
          <!-- el-select end -->
          <!-- el-switch start -->
          <template v-if="node_info.name == 'el-switch'">
            <el-form-item v-if="attribute['v-model']||attribute['v-model'] == ''" label="绑定变量">
              <el-input v-model="attribute['v-model']" placeholder="绑定变量 form.prop" clearable></el-input>
            </el-form-item>
            <el-form-item label="禁用">
              <el-switch v-model="attribute.disabled"></el-switch>
            </el-form-item>
          </template>
          <!-- el-switch end -->
          <!-- el-date-picker start -->
          <template v-if="node_info.name == 'el-date-picker'">
            <el-form-item v-if="attribute['v-model']||attribute['v-model'] == ''" label="绑定变量">
              <el-input v-model="attribute['v-model']" placeholder="绑定变量 form.prop" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="attribute.type||attribute.type==''" label="类型">
              <el-select v-model="attribute.type" placeholder="请选择选择器类型" @change="node_info.value = ''" clearable>
                <el-option key="year" label="年" value="year"></el-option>
                <el-option key="month" label="月" value="month"></el-option>
                <el-option key="date" label="日" value="date"></el-option>
                <el-option key="dates" label="日（多选带确定按钮）" value="dates"></el-option>
                <el-option key="datetime" label="日期时间" value="datetime"></el-option>
                <el-option key="datetimerange" label="日期时间范围" value="datetimerange"></el-option>
                <el-option key="daterange" label="日期范围" value="daterange"></el-option>
                <el-option key="monthrange" label="月份范围" value="monthrange"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="attribute.format||attribute.format==''" label="日期格式">
              <el-input v-model="attribute.format" placeholder="日期格式" clearable></el-input>
            </el-form-item>
            <el-form-item label="只读">
              <el-switch v-model="attribute.readonly"></el-switch>
            </el-form-item>
            <el-form-item label="禁用">
              <el-switch v-model="attribute.disabled"></el-switch>
            </el-form-item>
            <el-form-item label="编辑">
              <el-switch v-model="attribute.editable"></el-switch>
            </el-form-item>
            <el-form-item label="清空">
              <el-switch v-model="attribute.clearable"></el-switch>
            </el-form-item>
            <template v-if="attribute.type=='year' || attribute.type=='month' || attribute.type=='date' 
                  || attribute.type=='dates'|| attribute.type=='datetime'">
              <el-form-item v-if="attribute.placeholder||attribute.placeholder==''" label="占位文本">
                <el-input v-model="attribute.placeholder" placeholder="占位文本" clearable></el-input>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item v-if="attribute['start-placeholder']||attribute['start-placeholder']==''" label="开始占位">
                <el-input v-model="attribute['start-placeholder']" placeholder="范围开始占位" clearable></el-input>
              </el-form-item>
              <el-form-item v-if="attribute['end-placeholder']||attribute['end-placeholder']==''" label="结束占位">
                <el-input v-model="attribute['end-placeholder']" placeholder="范围结束占位" clearable></el-input>
              </el-form-item>
              <el-form-item v-if="attribute['range-separator']||attribute['range-separator']==''" label="分隔符">
                <el-input v-model="attribute['range-separator']" placeholder="范围分隔符" clearable></el-input>
              </el-form-item>
            </template>
          </template>
          <!-- el-date-picker end -->
          <!-- el-el-descriptions start -->
          <template v-if="node_info.name == 'el-descriptions'">
            <!-- 渲染选项 -->
            <el-form-item label="边框">
              <el-switch v-model="attribute.border"></el-switch>
            </el-form-item>
            <el-form-item v-if="attribute.column" label="项数">
              <!-- 感觉5项差不多了，再多不好了 -->
              <el-input-number v-model="attribute.column" :controls="true" :min="1" :max="5">
              </el-input-number>
            </el-form-item>
            <el-form-item v-if="attribute.direction||attribute.direction==''" label="排列方向">
              <el-select v-model="attribute.direction" placeholder="排列方向" clearable>
                <el-option key="horizontal " label="水平" value="horizontal "></el-option>
                <el-option key="vertical" label="垂直" value="vertical"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="attribute.size||attribute.size==''" label="尺寸">
              <el-select v-model="attribute.size" placeholder="尺寸" clearable>
                <el-option key="medium" label="正常" value="medium"></el-option>
                <el-option key="small" label="小" value="small"></el-option>
                <el-option key="mini" label="迷你" value="mini"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="attribute.title||attribute.title==''" label="标题文本">
              <el-input v-model="attribute.title" placeholder="标题文本" clearable></el-input>
            </el-form-item>
            <el-form-item :label-width="0">
              <el-row>
                <label class="el-form-item__label" style="width: 68px;">选项设置</label>
              </el-row>
              <template v-for="(item,index) in node_info.children" :key="index">
                <el-row class="el-desc-item-top">
                  <el-col :span="9">
                    <el-input size="small" v-model="item.props.label" placeholder="选项标签" clearable></el-input>
                  </el-col>
                  <el-col :span="9" :offset="1">
                    <el-select v-model="item.props['label-align']" placeholder="标签对齐" clearable>
                      <el-option key="left" label="左" value="left"></el-option>
                      <el-option key="center" label="中" value="center"></el-option>
                      <el-option key="right" label="右" value="right"></el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row class="el-desc-item">
                  <el-col :span="9">
                    <el-input size="small" v-model="item.text" placeholder="选项内容" clearable></el-input>
                  </el-col>
                  <el-col :span="9" :offset="1">
                    <el-select v-model="item.props.align" placeholder="内容对齐" clearable>
                      <el-option key="left" label="左" value="left"></el-option>
                      <el-option key="center" label="中" value="center"></el-option>
                      <el-option key="right" label="右" value="right"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4" :offset="1">
                    <el-button v-if="index > 1" size="mini" type="danger"
                               @click="handleClickDeleteDescriptionsItem(node_info,index)">
                      <svg-icon name="minus" className="icon" />
                    </el-button>
                  </el-col>
                </el-row>
              </template>
              <el-row>
                <el-col :span="4" :offset="1">
                  <el-button size="mini" type="primary" @click="handleClickAddDescriptionsItem(node_info)">
                    <svg-icon name="plus" className="icon" />
                  </el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </template>
          <!-- el-descriptions end -->
          <!-- public attribute start-->
          <el-form-item v-if="attribute.class||attribute.class==''" label="class">
            <el-input v-model="attribute.class" placeholder="css类名" clearable></el-input>
          </el-form-item>
          <el-form-item v-if="node_info.style||node_info.style==''" label="行内样式">
            <el-input type="textarea" v-model="node_info.style" placeholder="行内样式" autosize clearable></el-input>
          </el-form-item>
          <!-- public attribute end-->
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="节点树" name="2">
        <template #label>
          <div class="icon-box tab-label">
            <svg-icon name="tree" className="icon" />节点树
          </div>
        </template>
        <el-tree ref="treeRef" :data="tree" :props="defaultProps" :render-after-expand="false" :highlight-current="true"
                 node-key="id" :indent="32" :default-expand-all="true" :expand-on-click-node="false"
                 @node-click="handleClickTreeNode" draggable :allow-drop="handleAllowDrop"
                 :filter-node-method="handleFilter">
          <template #="{ node, data }">
            <!-- 用于显示内容 -->
            <div class="custom-tree-node">
              {{data.name}}
            </div>
            <!-- 用于触发事件 机智 -->
            <div class="custom-tree-node-block" @mouseover="handleMouseOverTreeNode(node,data)"
                 @mouseout="handleMouseOutTreeNode(node,data)">用于触发事件 机智</div>
          </template>
        </el-tree>
      </el-tab-pane>
    </el-tabs>

  </el-aside>
</template>
<script lang="ts">
import {
  getCurrentInstance,
  defineComponent,
  reactive,
  toRefs,
  computed,
  watch,
  nextTick,
  ref,
} from 'vue'
import { useStore } from 'vuex'

//导入公共方法
import mixins from '@/mixins/index'

export default defineComponent({
  name: 'AttributeBar',
  setup() {
    const store = useStore()

    //当前组件实例
    const { proxy } = getCurrentInstance() as any

    //ref
    const treeRef: any = ref(null)

    //数据对象
    let data: any = reactive({
      tab_active_name: '1', //激活的tab栏
      tree: store.state.component_tree_list, //节点树
      defaultProps: {
        children: 'children',
        label: 'name',
      }, //节点树 属性
    })

    const {
      _handleRecursionGetNodeByNodeId, //递归根据节点id查找节点信息
    } = mixins()

    //当前操作控件信息
    const node_info: any = computed({
      get() {
        return store.state.current_node_info
      },
      set(val) {},
    })

    //计算属性
    const attribute: any = computed({
      get() {
        return store.state.current_node_info.props
      },
      set(val) {},
    })

    //属性改变每次设置高亮 不然高亮边框会消失
    watch(
      attribute,
      (a: any, b: any) => {
        //过滤节点树
        nextTick(() => {
          //清除高亮边框
          let border = document.getElementsByClassName(
            'border'
          )[0] as HTMLElement
          if (border) {
            border.className = border.className.replace(' border', '')
          }

          //高亮控件边框
          let node_element = document.getElementById(
            store.state.current_node_info.id
          ) as HTMLElement
          if (node_element) {
            node_element.className = node_element.className + ' border'
          }
        })
      },
      { deep: true }
    )

    watch(store.state.component_tree_list, (val: any) => {
      nextTick(() => {
        //过滤节点树
        treeRef.value.filter()
      })
    })

    //点击添加单选按钮选项
    const handleClickAddRadioItem = (node_info: any) => {
      //初始化
      let radio: any = {
        name: 'el-radio',
        title: '单选按钮',
        props: {
          label: '',
        },
        text: '',
        style: '',
        children: [],
      }

      radio.id = 'node-' + new Date().getTime()

      node_info.children.push(radio)
    }

    //点击删除单选按钮选项
    const handleClickDeleteRadioItem = (node_info: any, index: any) => {
      node_info.children.splice(index, 1)
    }

    //点击添加复选框选项
    const handleClickAddCheckBoxItem = (node_info: any) => {
      //初始化
      let checkbox: any = {
        name: 'el-checkbox',
        title: '复选框',
        props: {
          label: '',
        },
        text: '',
        style: '',
        children: [],
      }

      checkbox.id = 'node-' + new Date().getTime()

      node_info.children.push(checkbox)
    }

    //点击删除复选框选项
    const handleClickDeleteCheckBoxItem = (node_info: any, index: any) => {
      node_info.children.splice(index, 1)
    }

    //点击添加选择器选项
    const handleClickAddSelectItem = (node_info: any) => {
      //初始化
      let select: any = {
        name: 'el-option',
        title: '选项',
        props: {
          label: '',
          value: '',
        },
        style: '',
        children: [],
      }

      select.id = 'node-' + new Date().getTime()

      node_info.children.push(select)
    }

    //点击删除选择器选项
    const handleClickDeleteSelectItem = (node_info: any, index: any) => {
      node_info.children.splice(index, 1)
    }

    //点击添描述列表选项
    const handleClickAddDescriptionsItem = (node_info: any) => {
      //初始化
      let descriptions: any = {
        name: 'el-descriptions-item',
        props: {
          label: '',
          span: 1,
          width: '',
          'min-width': '',
          align: '',
          'label-align': '',
        },
        text: '',
        style: '',
        children: [],
      }

      descriptions.id = 'node-' + new Date().getTime()

      node_info.children.push(descriptions)
    }

    //点击删除描述列表选项
    const handleClickDeleteDescriptionsItem = (node_info: any, index: any) => {
      node_info.children.splice(index, 1)
    }

    //点击节点树节点
    const handleClickTreeNode = (val: any) => {
      //选中高亮区域
      if (val.id) {
        let node_info: any = _handleRecursionGetNodeByNodeId(val.id, data.tree)

        //设置当前操作对象
        store.dispatch('handleChangeCurrentNodeInfo', node_info)

        //清除高亮边框
        let border = document.getElementsByClassName(
          'hover-border'
        )[0] as HTMLElement
        if (border) {
          border.className = border.className.replace(' hover-border', '')
        }

        //清除高亮边框
        border = document.getElementsByClassName('border')[0] as HTMLElement
        if (border) {
          border.className = border.className.replace(' border', '')
        }

        //高亮控件边框
        let node_element = document.getElementById(
          store.state.current_node_info.id
        ) as HTMLElement
        if (node_element) {
          node_element.className = node_element.className + ' border'
        }
      }
    }

    //鼠标移入节点树节点，显示边框
    const handleMouseOverTreeNode = (node: any, data: any) => {
      if (data.id) {
        //高亮控件边框
        let node_element = document.getElementById(data.id) as HTMLElement
        if (node_element) {
          node_element.className = node_element.className + ' hover-border'
        }
      }
    }
    //鼠标移除节点树节点隐藏边框
    const handleMouseOutTreeNode = (node: any, data: any) => {
      //清除高亮边框
      let border = document.getElementsByClassName(
        'hover-border'
      )[0] as HTMLElement
      if (border) {
        border.className = border.className.replace(' hover-border', '')
      }
    }

    //判断目标节点是否接受放置内容
    const handleAllowDrop = (draggingNode: any, dropNode: any, type: any) => {
      if (type == 'inner' && !dropNode.data.allow) {
        //不允许拖入内部
        return false
      } else {
        return true
      }
    }

    //过滤节点
    const handleFilter = (value: any, data: any) => {
      if (
        data.name == 'el-radio' ||
        data.name == 'el-checkbox' ||
        data.name == 'el-option'
      ) {
        return false
      }
      return true
    }

    return {
      ...toRefs(data),
      treeRef,
      node_info,
      attribute,
      handleClickAddRadioItem,
      handleClickDeleteRadioItem,
      handleClickAddCheckBoxItem,
      handleClickDeleteCheckBoxItem,
      handleClickAddSelectItem,
      handleClickDeleteSelectItem,
      handleClickAddDescriptionsItem,
      handleClickDeleteDescriptionsItem,
      handleClickTreeNode,
      handleMouseOverTreeNode,
      handleMouseOutTreeNode,
      handleAllowDrop,
      handleFilter,
    }
  },
})
</script>
<style lang="scss" scoped>
.attribute-bar {
  padding: 20px;
  background: #ffffff;
  border-left: 1px solid #e6e6e6;
  .icon {
    fill: $white;
  }
  .tab-label {
    .icon {
      fill: $h3c;
    }
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    height: 100%;
  }
  .custom-tree-node-block {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .el-desc-item-top {
    padding-top: 6px;
    border-top: 1px solid #ececec;
  }
  .el-desc-item {
    padding-top: 2px;
    padding-bottom: 6px;
  }
}
</style>