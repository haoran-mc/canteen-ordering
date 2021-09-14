import Vue from 'vue'
import {
  Button,
  Container,
  Card,
  Form,
  FormItem,
  Input,
  Image,
  Message,
  Aside,
  Menu,
  Drawer,
  Avatar,
  Header,
  Main,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Table,
  TableColumn,
  Popover,
  Tag,
  Upload,
  Notification,
  Dialog,
  MessageBox
} from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

Vue.use(Button)
Vue.use(Container)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Image)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Drawer)
Vue.use(Avatar)
Vue.use(Header)
Vue.use(Main)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(Tag)
Vue.use(Upload)
Vue.use(Dialog)
