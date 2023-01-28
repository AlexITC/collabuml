function promptForSessionName() {
    var input = prompt('Choose the session name, your peers need to use this to collaborate with you, or ignore this to go to the test session') || '';
    input = input.trim();
    if (input.length == 0) {
        return 'test';
    } else {
        return input;
    }
}

function getSessionName() {
    var currentPath = window.location.pathname;
    if (currentPath.startsWith('/')) {
        var session = currentPath.substr(1).trim();
        if (session !== '') {
            return session;
        }
    }

    var session = promptForSessionName();
    var newPath = '/' + session;
    window.location.pathname = newPath;
}

function getUserName() {
    return 'unnamed';
}

export const collabuml = {
    padId: getSessionName(),
    userName: getUserName(),
    host: 'https://pad.collabuml.com',
    apikey: 'd73bfbe04a31195082be48dfd9dc22cb17bcedeedea0be2404be6cbe290440e6'
};
