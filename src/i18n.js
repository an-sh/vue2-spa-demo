
import Vue from 'vue'
import VueI18n from 'vue-i18n'

const locales = {
  en: {
    ui: {
      welcome: 'Welcome',
      login: 'Login',
      password: 'Password',
      auth: 'Login',
      message: 'Message...',
      messages: 'Messages',
      users: 'Users',
      blacklist: 'Blacklist'
    }
  },
  ru: {
    ui: {
      welcome: 'Добро пожаловать',
      login: 'Логин',
      password: 'Пароль',
      auth: 'Войти',
      message: 'Сообщение...',
      messages: 'Сообщения',
      users: 'Пользователи',
      blacklist: 'Чёрный список'

    }
  }
}

export function initlocales () {
  Vue.use(VueI18n)
  Vue.config.lang = 'en' // TODO use a dynamic locale detection
  Object.keys(locales).forEach(lang => {
    Vue.locale(lang, locales[lang])
  })
}
