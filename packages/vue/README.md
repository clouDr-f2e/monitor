# @mitojs/vue

### Vue2.6NPM包形式

**main.js**

```javascript
import MITO from '@mitojs/vue'
import Vue from 'vue'
Vue.use(MITO.MitoVue)
MITO.init({
  dsn: 'http://test.com/error',
  apikey: '123-2223-123-123',
})
```

**index.html**

```js
    <header>
      <script src="https://cdn.jsdelivr.net/npm/@zyf2e/mitojs/dist/index.min.js"></script>
      <script>
        Vue.use(MITO.MitoVue)
        MITO.init({
          // 服务器地址
          dsn: 'http://test.com/error',
          // 项目对应apikey
          apikey: '123-2223-123-123',
        });
      </script>
    </header>
```
### Vue3NPM包形式

**main.ts**

```javascript
import App from './App.vue';
import {createApp} from 'vue';
import MITO from '@mitojs/vue'
const app = createApp(App);
app.use(MITO.MitoVue)
MITO.init({
  dsn: 'http://test.com/error',
  apikey: '123-2223-123-123',
})
app.mount('#app');

```
