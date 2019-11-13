import { SET_USER, CHECK_SESSION } from './constants';



export const setUser = (email) => {
    console.log("action setUser() 호출", email)
    return (
        { type: SET_USER, payload: email }

    )
}

export const checkSession = () => dispatch => {
    console.log("action checkSession 호출")
    return (
        fetch('/api/checksession')
            .then(function (response) {
                return response.json()
            })
            .then(function (sess) {
                console.log("action cheksession sess확인", sess)
                if (sess.userid) {
                    dispatch({ type: CHECK_SESSION, payload: { id: sess.userid, name: sess.name, email: sess.email } }
                    )
                } else {
                    dispatch({ type: CHECK_SESSION, payload: null })
                }
            })
    )

}

