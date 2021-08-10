import Datastore, { RemoveOptions, UpdateOptions } from 'nedb'
// import path from 'path'
// const remote = require('@electron/remote')

type Query<T> = Partial<T> & {
  [prop: string]: string
}

// type 类似于interface 但是是用=号
// & 相当于extends 一个接口
// 使用 [prop: string] 定义了任意属性取 string 类型的值。其他属性必须是string的字书写
// Partial<T> 相当于解构 T {a:string|undefined,b:number|undefined}

class Db<T> {
  //db属性
  db: Datastore

  /**
   * 构造方法
   * @param db_path  可以是相对路径，也可以是绝对路径 nedb 本地化 见vue.config.js
   */
  constructor(db_path: string) {
    this.db = new Datastore({
      autoload: true,
      filename: db_path //path.join(__dirname, './dbtmp.db')  //path.join(remote.app.getPath('userData'), './dbtmp.db') //E:/codetool/code-auto-tool/dbtmp.db
    })
  }

  /**
   * 新增一条或多条记录
   * @param data | array | object 数据对象或数组
   * @returns 新增的数据
   */
  insert(data: T): Promise<T> {
    return new Promise((reslove, reject) => {
      this.db.insert(data, function(err: any, newDoc: T) {
        if (err) return reject(err)
        reslove(newDoc)
      })
    })
  }

  /**
   * 查找符合条件的所有数据
   * @param query | object 查找条件
   * @returns 数据集
   */
  find(query: Query<T>): Promise<T[]> {
    return new Promise((reslove, reject) => {
      this.db.find(query, function(err: any, docs: T[]) {
        if (err) return reject(err)
        reslove(docs)
      })
    })
  }

  /**
   * 查找符合条件的一条记录 例如查找ID
   * @param query | object 查找条件
   * @returns 一条记录
   */
  findOne(query: Query<T>): Promise<T> {
    return new Promise((reslove, reject) => {
      this.db.findOne(query, function(err: any, doc: T) {
        if (err) return reject(err)
        reslove(doc)
      })
    })
  }

  /**
   *
   * 查找符合条件的所有数据 并分页
   * @param query | object 查找条件
   * @param page | number 当前页
   * @param page_size | number 分页页数
   * @param sort | object 排序方式 默认id降序
   * @returns 数据集
   */
  limit(
    query: Query<T>,
    page: number,
    page_size: number,
    sort: object = { _id: -1 }
  ): Promise<T[]> {
    return new Promise((reslove, reject) => {
      this.db
        .find(query)
        .sort(sort)
        .skip((page - 1) * page_size)
        .limit(page_size)
        .exec(function(err: any, docs: T[]) {
          if (err) return reject(err)
          reslove(docs)
        })
    })
  }

  /**
   * 统计符合条件的记录数量
   * @param query | object 查找条件
   * @returns
   */
  count(query: Query<T>): Promise<number> {
    return new Promise((reslove, reject) => {
      this.db.count(query, function(err: any, amount: number) {
        if (err) return reject(err)
        reslove(amount)
      })
    })
  }

  /**
   * 更新符合条件的记录
   * @param query | object 查找条件
   * @param update | 更新的数据 {$set:update} 只修改要修改的值 不会替换整条记录
   * @param options | 配置 {multi: true} 更新多个 upsert(默认为false)属性混入的意思，如果query没有匹配到结果集，
   * 有两种情况需要考虑，一个是update是一个简单的对象(不包含任何修饰符)，另一种情况是带有修饰符，对第一种情况会直接将该文档插入，对第二种情况会将通过修饰符更改后的文档插入
   * $inc 自增 入栈 出栈 等等 基本都有了 # https://github.com/louischatriot/nedb#updating-documents
   * @returns
   */
  update(
    query: Query<T>,
    update: Partial<T>,
    options: UpdateOptions = {}
  ): Promise<number> {
    return new Promise((reslove, reject) => {
      this.db.update(query, update, options, function(
        err: any,
        numAffected: number
      ) {
        if (err) return reject(err)
        reslove(numAffected)
      })
    })
  }

  /**
   * 删除符合条件的所有数据
   * @param query | object 查找条件
   * @param options 配置 {multi: true} 删除多个
   * @returns
   */
  remove(query: Query<T>, options: RemoveOptions = {}): Promise<number> {
    return new Promise((reslove, reject) => {
      this.db.remove(query, options, function(err: any, numRemoved: number) {
        if (err) return reject(err)
        reslove(numRemoved)
      })
    })
  }
}

export default Db
// new Db().db  db是nedb的属性
