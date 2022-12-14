const TOKEN_KEY = 'jwt_token'
const REFRESH_KEY = 'jwt_refresh'
const ADMIN_KEY = 'admin'

// 获取 token
export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

// 本地存储 token
export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
}

// 删除 token
export function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
}

// 判断有无 token
export function hasToken() {
    return !!getToken()
}

// 获取 token
export function getRefresh() {
    return localStorage.getItem(REFRESH_KEY)
}

// 本地存储 token
export function setRefresh(token) {
    localStorage.setItem(REFRESH_KEY, token)
}

// 删除 token
export function removeFresh() {
    localStorage.removeItem(REFRESH_KEY)
}

// 判断有无 token
export function hasRefresh() {
    return !!getRefresh()
}

export function getAdmin() {
    return localStorage.getItem(ADMIN_KEY)
}

// 本地存储 token
export function setLocalAdmin(token) {
    localStorage.setItem(ADMIN_KEY, token)
}

// 删除 token
export function removeAdmin() {
    localStorage.removeItem(ADMIN_KEY)
}

// 判断有无 token
export function hasAdmin() {
    return !!getAdmin()
}
