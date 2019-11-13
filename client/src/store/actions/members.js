import { SET_USER, CHECK_SESSION } from './constants';



export const setUser = (email) => {
    console.log("action setUser() 호출", email)
    return (
        { type: SET_USER, payload: email }

    )
}

export const checkSession = () => {
    console.log("action checkSession() 호출")
    return (
        fetch('/api/checksession')
            .then(function (response) {
                return response.json()
            })
            .then(function (sess) {
                //console.log(sess)
                if (sess.userid) {
                    return { type: CHECK_SESSION, payload: { id: sess.userid, name: sess.name, email: sess.email } }
                }
            })
    )

}

