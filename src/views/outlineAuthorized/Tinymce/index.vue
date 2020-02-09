<template>
    <div class="app-container">
      <div class="main-wrapper">
        <div class="main-header"><el-button type="warning" size="mini" @click="goBack">返回</el-button></div>
        <div class="main-content editArea">
          <div class="catalogAside">
            <h3 class="title">XXX城市道路规划大纲</h3>
            <p>添加章节标题后会在此显示</p>
          </div>
          <div :class="{fullscreen:fullscreen}" class="tinymce-container editWrap" :style="{width:containerWidth}">
            <textarea :id="tinymceId" class="tinymce-textarea" />
            <div class="editor-custom-btn-container">
              <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
            </div>
            <p class="saveBtn">
              <el-button type="warning">另存为</el-button>
              <el-button type="primary">保存</el-button>
            </p>
          </div>
         <div class="intelligenceApp">
          <ul class="intelligenceTool">
            <li>
              <i class="iconfont iconbiaoti"></i>
              <span>拟定标题</span>
            </li>
            <li>
              <i class="iconfont iconkuangjia"></i>
              <span>搭建框架</span>
            </li>
            <li>
              <i class="iconfont iconxiezuo"></i>
              <span>智能写作</span>
            </li>
            <li>
              <i class="iconfont iconfenxi"></i>
              <span>文本分析</span>
            </li>
            <li>
              <i class="iconfont iconshuju"></i>
              <span>数据分析</span>
            </li>
          </ul>
          <div class="tmplONe" @click="showTmpl">发展规划模板</div>
          <div class="tmplONe">专项规划模板</div>
          <div class="tmplONe">区域规划模板</div>
         </div>
        </div>
      </div>
      
    <el-dialog
      title="模板"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="50%">
      <el-tree
          :data="setTree"
          :props="defaultProps"
          node-key="id"
          ref="SlotMenuList"
          default-expand-all
          :filter-node-method="filterNode"
          @node-contextmenu='rihgtClick'
        >
        <span class="slot-t-node" slot-scope="{ node, data }">
          <span v-show="!node.isEdit">
            <span v-show="data.children && data.children.length >= 1">
              <span :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']">{{node.label}}</span>
            </span>
            <span v-show="!data.children || data.children.length == 0">
              <span :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']">{{node.label}}</span>
            </span>
          </span>
          <!-- 编辑输入框 -->
          <span v-show="node.isEdit">
            <el-input class="slot-t-input" size="mini" autofocus
              v-model="data.name"
              :ref="'slotTreeInput'+data.id"
              @blur.stop="NodeBlur(node, data)"
              @keyup.enter.native="NodeBlur(node, data)"></el-input>
          </span>
        </span>
        </el-tree>
        <!--鼠标右键点击出现页面-->
        <el-menu
          v-show="menuVisible"
          id = "rightClickMenu"
          class="el-menu-vertical"
          @select="handleRightSelect"
          active-text-color="#fff"
          text-color="#fff">
          <el-menu-item index="1" class="menuItem">
            <span slot="title">添加分类</span>
          </el-menu-item>
          <el-menu-item index="2" class="menuItem">
            <span slot="title">修改分类</span>
          </el-menu-item>
          <el-menu-item index="3" class="menuItem">
            <span slot="title">删除分类</span>
          </el-menu-item>
        </el-menu>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="importTmpl">导 入</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import editorImage from './components/EditorImage'
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
import treeData1 from '../../../utils/treeData'
const treeData2 = JSON.stringify(treeData1)
const treeData = JSON.parse(treeData2)
const id = 1000

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'

export default {
  name: 'Tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 500
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data() {
    return {
      aaa: '',
      dialogVisible: false,
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'zh': 'zh_CN',
        'en': 'en',
        'es': 'es_MX',
        'ja': 'ja'
      },
      setTree: [], // 节点树数据
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      DATA: null,
      NODE: null,
      maxexpandId: treeData.maxexpandId, // 新增节点开始id
      non_maxexpandId: treeData.maxexpandId, // 新增节点开始id(不更改)
      isLoadingTree: true, // 是否加载节点树
      filterText: '',
      input: '',
      input2: '',
      currentPage4: 4,
      editObj: {},
      menuVisible: false,
      objectID: null,
      // 分类修改
      menuVisible2: false,
      objectID2: null
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList['zh'],
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      })
    },
    destroyTinymce() {
      const cc = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
      })
    },
    showTmpl() {
      this.dialogVisible = true
      this.setTree = JSON.parse(treeData2).treelist
    },
    importTmpl() {
      function switchChinese(num) {
        switch (num) {
          case 0:
            return '一'
            break
          case 1:
            return '二'
            break
          case 2:
            return '三'
            break
          case 3:
            return '四'
            break
          case 4:
            return '五'
            break
          case 5:
            return '六'
            break
          case 6:
            return '七'
            break
          case 7:
            return '八'
            break
          case 8:
            return '九'
            break
          case 9:
            return '十'
            break
          case 10:
            return '十一'
            break
          case 11:
            return '十二'
            break
        }
      }
      let html = ' <h3 class="foreword">前言</h3>'
      const tmpl = addrs =>
        `${addrs
          .map(
            (addr, i) =>
              `<h3 style="text-indent: 35px; font-size: 16px;">（${switchChinese(
                i
              )}）${addr.name}</h3>`
          )
          .join('')}`
      for (let i = 0; i < this.setTree.length; i++) {
        html += `
            <h2 style="font-size: 18px;"><span style="margin-right: 10px;">${switchChinese(i)}、</span><span>${this.setTree[i].name}</span></h2>
            ${tmpl(this.setTree[i].children)}
          `
      }
      this.aaa = html
      console.log(html)
      this.dialogVisible = false
      this.setContent(this.aaa)
    },

    getEditContent() {
      console.log(this.editor.getContent())
      this.$refs.html.innerHTML = this.editor.getContent()
      console.log(this.editor.getPlainTxt())
    },
    goBack() {
      this.$router.go(-1)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleRightSelect(key) {
      if (key == 1) {
        this.NodeAdd(this.NODE, this.DATA)
        this.menuVisible = false
      } else if (key == 2) {
        this.NodeEdit(this.NODE, this.DATA)
        this.menuVisible = false
      } else if (key == 3) {
        this.NodeDel(this.NODE, this.DATA)
        this.menuVisible = false
      }
    },
    NodeBlur(n, d) {
      // 输入框失焦
      console.log(n, d)
      if (n.isEdit) {
        this.$set(n, 'isEdit', false)
      }
      this.$nextTick(() => {
        this.$refs['slotTreeInput' + d.id].$refs.input.focus()
      })
    },
    NodeEdit(n, d) {
      // 编辑节点
      console.log(n, d)
      if (!n.isEdit) {
        // 检测isEdit是否存在or是否为false
        this.$set(n, 'isEdit', true)
      }
    },
    NodeDel(n, d) {
      // 删除节点
      console.log(n, d)
      const that = this
      if (d.children && d.children.length !== 0) {
        this.$message.error('此节点有子级，不可删除！')
        return false
      } else {
        // 新增节点可直接删除，已存在的节点要二次确认
        // 删除操作
        const DelFun = () => {
          const _list = n.parent.data.children || n.parent.data // 节点同级数据
          const _index = _list.map(c => c.id).indexOf(d.id)
          console.log(_index)
          _list.splice(_index, 1)
          this.$message.success('删除成功！')
        }
        // 二次确认
        const ConfirmFun = () => {
          this.$confirm('是否删除此节点？', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              DelFun()
            })
            .catch(() => {})
        }
        // 判断是否是新增节点
        d.id > this.non_maxexpandId ? DelFun() : ConfirmFun()
      }
    },
    // 新增节点
    NodeAdd(n, d) {
      // 新增数据
      d.children.push({
        id: ++this.maxexpandId,
        name: '新增节点',
        pid: d.id,
        children: []
      })
      // 同时展开节点
      if (!n.expanded) {
        n.expanded = true
      }
    },
    rihgtClick(event, object, value, element) {
      if (this.objectID !== object.id) {
        this.objectID = object.id
        this.menuVisible = true
        this.DATA = object
        this.NODE = value
      } else {
        this.menuVisible = !this.menuVisible
      }
      document.addEventListener('click', e => {
        this.menuVisible = false
      })
      const menu = document.querySelector('#rightClickMenu')
      // 菜单定位基于鼠标点击位置
      menu.style.left = event.clientX + 20 + 'px'
      menu.style.top = event.clientY - 30 + 'px'
      menu.style.position = 'fixed' // 为新创建的DIV指定绝对定位
      menu.style.width = 160 + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}


.editArea {
  display: flex;
  justify-content: space-between;
  .catalogAside,
  .editWrap,
  .intelligenceApp {
    width: 400px;
    height: 710px;
  }
  .editWrap {
    width: calc(100% - 400px - 430px)!important;
  }
  .catalogAside {
    padding: 10px;
    .title {
      padding: 5px 0;
      font-size: 18px;
      color: #999;
      text-align: center;
      border-bottom: 1px solid #999;
    }
    p{
      margin-top: 10px;
      color: #999;
      text-align: center;
    }
  }
  
  .firstLine{
    margin-top: 200px;
    font-size: 16px;
    color: #999;
    text-align: center;
  }
  .SecondLine{
    margin-top: 5px;
    font-size: 16px;
    color: #999;
    text-align: center;
  }
  .intelligenceTool {
    list-style: none;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    li {
      text-align: center;
      i,
      span {
        display: block;
        color: #999;
      }
      span {
        margin-top: 5px;
      }
    }
  }
  .saveBtn{
    margin: 10px;
    text-align: center;

  }
}
.rightMenus,.el-menu-vertical{
  background: #545c64;
}
  .foreword{
    font-size: 16px;
    font-weight: normal;
  }
  .title1{
    font-size: 18px;
    span{
      &:nth-child(1){
        margin-right: 10px;
      }
    }
  }
  .title2{
    text-indent: 35px;
    font-size: 16px;
  }
  .title3{
    text-indent: 65px;
    font-size: 14px;
  }
  .tmplONe{
    margin: 0 auto 10px auto;
    width: 95%;
    height: 100px;
    border: 1px solid #ccc;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
