
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const messages = {
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

export const i18n = new VueI18n({
  locale: 'en',
  messages
})
