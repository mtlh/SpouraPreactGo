async function Auth() {
    const currentCookieval = getCookiesWithValue("spoura_session")
    if (currentCookieval == null) {
        const session = await NewSession();
        document.cookie = "spoura_session" + "=" + session +"; path=/";
        const user = await GetSession(session);
        return user;
    } else {
        const user = await GetSession(currentCookieval);
        if (user == null) {
            const session = await NewSession();
            document.cookie = "spoura_session" + "=" + session +"; path=/";
            const user = await GetSession(currentCookieval);
            return user;
        } else {
            return user;
        }
    }
}

export async function AuthWrapper () {
    const user = await Auth();
    try {
        return JSON.parse(user);
    } catch (e) {
        document.cookie = "";
        location.reload()
    }
}

async function NewSession() {
    try {
        const response = await fetch('https://spoura-go-api.vercel.app/api/createsession');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.text();
        return result;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}

async function GetSession(cookieVal: string) {
    try {
        const response = await fetch('https://spoura-go-api.vercel.app/api/session/' + encodeURIComponent(cookieVal));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.text();
        return result;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}

export function getCookiesWithValue(value) {
    var cookies = document.cookie.split(';');
    // console.log(cookies)
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(value + '=') == 0) {
            return cookie.split("=")[1];
        }
    }
    return null;
}