enum Key {
  TOKEN = 'token',
  EMAIL = 'email',
}

const storage = {
  setToken: (token: string) => window.localStorage.setItem(Key.TOKEN, token),
  getToken: () => window.localStorage.getItem(Key.TOKEN),
  removeToken: () => window.localStorage.removeItem(Key.TOKEN),
  setEmail: (email: string) => window.localStorage.setItem(Key.EMAIL, email),
  getEmail: () => window.localStorage.getItem(Key.EMAIL),
  removeEmail: () => window.localStorage.removeItem(Key.EMAIL),
};

export default storage;
