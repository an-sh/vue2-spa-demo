
import Vue from 'vue'
import VueI18n from 'vue-i18n'

const locales = {
  en: {
    ui: {
      auth: 'Login',
      blacklist: 'Blacklist',
      error: 'Error',
      login: 'Login',
      message: 'Type a message...',
      messages: 'Messages',
      password: 'Password',
      phint: 'leave empty for a demo mode',
      users: 'Users',
      welcome: 'Welcome'
    }
  },
  ru: {
    ui: {
      auth: 'Войти',
      blacklist: 'Чёрный список',
      error: 'Ошибка',
      login: 'Логин',
      message: 'Напишите сообщение...',
      messages: 'Сообщения',
      password: 'Пароль',
      phint: 'не требуется в демо режиме',
      users: 'Пользователи',
      welcome: 'Добро пожаловать'
    }
  }
}

export default function initLocales () {
  Vue.use(VueI18n)
  Vue.config.lang = 'en'
  Object.keys(locales).forEach(lang => {
    Vue.locale(lang, locales[lang])
  })
}
