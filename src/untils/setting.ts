//设置主题
const theme_key = 'theme_key'
export function getTheme() {
  return typeof localStorage.getItem(theme_key) !== 'undefined'
    ? localStorage.getItem(theme_key)
    : false
}
export function setTheme(string: string) {
  localStorage.setItem(theme_key, string)
}
export function removeTheme() {
  return localStorage.removeItem(theme_key)
}
