
export const state = {
    user: '',
    password: ''
}


export const checkLogin = function(pass= null){
    if (!pass){
    if (state.user==='0' && state.password ==='0') return true}
    if (pass === state.password) return true
    else false
}