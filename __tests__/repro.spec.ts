import { createApp, h } from 'vue'
import {
  RouterLink,
  RouterView,
  createMemoryHistory,
  createRouter,
} from '../src'

export const posts = [
  { id: '1', title: 'Vue' },
  { id: '2', title: 'Vuex' },
  { id: '3', title: 'VueRouter' },
]

const App = {
  setup() {
    return () => [h(RouterLink, { to: '/posts', id: 'post' }), h(RouterView)]
  },
}

const Index = {
  setup() {
    return () => h('div', 'Index')
  },
}

const Posts = {
  setup() {
    return () => h('div', 'Posts')
  },
}

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: Index },
    { path: '/posts', component: Posts },
  ],
})

it("erors out with TypeError: Cannot read property '_history' of null", async () => {
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)

  const app = createApp(App)
  app.use(router)
  router.push('/')
  await router.isReady()
  app.mount(el)
  const event = document.createEvent('Event')
  event.initEvent('click')
  document.getElementById('post')!.dispatchEvent(event)
  console.log(document.body.outerHTML)
})
