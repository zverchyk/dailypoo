const server = require('./server');
const validator = require('validator');
const { createBubbleChart } = require('./graph');
const bridge = require('./bridge');

const state = {
    mode: undefined,
    sessionUpdated: true,
    user: {
        email: '',
        password: '',
        id: '',
        icon: '',
        pic: ''
    },
    poo: {
        day: '',
        times: [],
        sizes: []
    },
    updatedUser: {
        newEmail: '',
        newPassword: '',
        newPic: '',
        newIcon: ''
    }
};



// ####### USER FUNCTIONS #######
async function createUser() {
    try {
        const response = await server.createUser({ email: state.user.email, password: state.user.password, day: state.poo.day });
        state.user.id = response.userId;
        // bridge.openWebSocket(state.user.id);
        server.connectUser(state.user.id)
        return response.message;
    } catch (err) {
        throw err;
    }
}

async function updateUser() {
    try {
        const userInfo = {
            email: state.updatedUser.newEmail,
            password: state.updatedUser.newPassword,
            icon: state.updatedUser.newIcon
        };

        const removeKeys = (obj, keysToRemove) => Object.fromEntries(
            Object.entries(obj).filter(([key]) => !keysToRemove.includes(key))
        );

        let keysToRemove = [];

        Object.keys(userInfo).forEach(item => {
            if (userInfo[item] === "" || userInfo[item] === state.user[item]) keysToRemove.push(item);
        });

        const checkedUserInfo = removeKeys(userInfo, keysToRemove);

        if (Object.keys(checkedUserInfo).length === 0) throw 'nothing to update';

        const response = await server.updateUser({ ...checkedUserInfo, userId: state.user.id });

        Object.keys(checkedUserInfo).forEach(item => {
            state.user[item] = checkedUserInfo[item];
        });

        Object.keys(state.updatedUser).forEach(item => {
            state.updatedUser[item] = '';
        });

        return response.message;
    } catch (err) {
        throw err;
    }
}

async function loginUser() {
    try {
        const response = await server.loginUser({ email: state.user.email, password: state.user.password, day: state.poo.day });
        state.user.id = response.userId;
        state.user.icon = response.icon;
        // bridge.openWebSocket(state.user.id);
        server.connectUser(state.user.id)
        if (!response.session) {
            state.poo.times = [];
            state.poo.sizes = [];
            return response.message;
        }
        state.poo.times = response.session.times;
        state.poo.sizes = response.session.sizes;
        return response.message;
    } catch (err) {
        throw err;
    }
}

async function deleteUser() {
    try {
        return await server.deleteUser(state.user.id);
    } catch (err) {
        throw err;
    }
}

async function logout() {
    try {
        bridge.closeWebSocket(state.user.id);
        return await server.logout();
    } catch (err) {
        throw err;
    }
}

// ####### SESSION MANAGEMENT #######
async function updateSession() {
    try {
        const sessionInfo = {
            userId: state.user.id,
            day: state.poo.day,
            times: state.poo.times,
            sizes: state.poo.sizes
        };
        const response = await server.updateSession(sessionInfo);
        state.sessionUpdated = true;
        return response;
    } catch (err) {
        throw err;
    }
}




// ####### GRAPH FUNCTIONS #######
async function createGraph() {
    try {
        const rawData = await server.getSessions(state.user.id);
        if (!rawData[0].times.length) throw 'no data to create a chart';
        return createBubbleChart(rawData);
    } catch (err) {
        throw err;
    }
}

function downloadChart() {
    const canvas = document.getElementById("bubbleChartCanvas");
    const imageURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "month_poo_chart.png";
    link.click();
    return 'ready to download';
}

// ####### EMAIL FUNCTIONS #######
async function sendChart() {
    try {
        const email = state.user.email;
        const canvas = document.getElementById('bubbleChartCanvas');
        const imageData = canvas.toDataURL('image/png');
        return await server.sendChart(email, imageData);
    } catch (err) {
        throw err;
    }
}

async function getAdvice() {
    return await server.getAdvice();
}

// ####### GENERAL METHODS #######
function createToday() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    state.poo.day = `${day}${month}${year}`;
}

function validatePassword(password) {
    if (!/.{8,}/.test(password)) return "Password must be at least 8 characters long.";
    if (!/[a-zA-Z]/.test(password)) return "Password must contain at least one letter.";
    if (!/\d/.test(password)) return "Password must contain at least one number.";
    return true;
}

function validateEmail(email) {
    return validator.isEmail(email);
}

function resetState() {
    for (const key in state) {
        if (typeof state[key] === 'object' && !Array.isArray(state[key])) {
            for (const subKey in state[key]) {
                state[key][subKey] = Array.isArray(state[key][subKey]) ? [] : '';
            }
        } else {
            state[key] = undefined;
        }
    }
}

module.exports = {
    state,
    createUser,
    updateUser,
    loginUser,
    deleteUser,
    logout,
    updateSession,
    createGraph,
    downloadChart,
    sendChart,
    getAdvice,
    createToday,
    validatePassword,
    validateEmail,
    resetState
};
