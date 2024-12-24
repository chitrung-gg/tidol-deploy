import { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { toast } from 'react-hot-toast'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Cookies from 'js-cookie';

export default function AuthComponent({ isOpen, setIsOpen }) {
    const [type, setType] = useState("login")
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const [password, setPassword] = useState(null)
    const [username, setUsername] = useState(null)

    const csrfToken = Cookies.get('csrftoken');

    const postRegister = async () => {
        const res = await fetch("/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        })
        const data = await res.json()
        if (data.success) {
            toast.success(data.data.message)
            setType("login")
        }
        return data
    }

    const postLogin = async () => {
        if (!username || !password) {
            toast.error("Seeems like you forgot something?");
            return;
        }
        try {
            const res = await fetch("/api/auth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            })
            const data = await res.json()
            console.log('Response Data:', data);
            if (res.status === 200) {
                console.log(data);
                toast.success("Login successful");
                localStorage.setItem("access_token", data.access);
                localStorage.setItem("refresh_token", data.refresh);
                window.location.reload()
            } else if (res.status === 400) {
                toast.error("Invalid username or password")
            }
            return data
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    const tryLogin = async () => {
        const token = localStorage.getItem("access_token")
        const refreshToken = localStorage.getItem("refresh_token")

        // Open login form when access token is not available
        if (!token) {
            setType("login");
            console.log("Don't have access token");
            return;
        }

        // Verify access token
        try {
            const res = await fetch("/api/auth/token/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({
                    token: token
                }),
            }, [])
            if (res.status === 200) {
                console.log("Access token is valid");
                setType("loged");
                return;
            } else {
                console.log("Token expired");
                setType("login");
                localStorage.removeItem("access_token");
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }

        // Try to refresh the token
        if (refreshToken) {
            const refreshRes = await fetch("/api/auth/token/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({
                    refresh: refreshToken
                }),
            })
            if (refreshRes.status === 200) {
                const data = await refreshRes.json();
                localStorage.setItem("access_token", data.access);
                console.log("Access token refreshed");
                setType("loged");
            } else {
                console.log("Refresh token is invalid");
                localStorage.removeItem("refresh_token");
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setType("login");
        window.location.reload();
    }

    
    
    const getUserInfo = async () => {
    const token = localStorage.getItem("access_token")
    if (!token) { return; }
    
    try {
        const res = await fetch("/api/auth/whoami", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                'X-CSRFToken': csrfToken,
            },
        }, [])
        if (res.status === 200) {
            setUser(await res.json());
        } else {
            console.error("Failed to get user info");
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
    
    async function handleButton() {
        if (type == "login") {
            postLogin();
        } else if (type == "loged") {
            logout();
        }else if (type == "register") {
            postRegister();
        }
    }
    
    useEffect(() => {
        if (isOpen) {
        setLoading(true);
        async function fetchData() {
            await tryLogin();
            await getUserInfo();
            setLoading(false);
        }
        fetchData();
}
    }, [isOpen])
    
    let content = null;
    if (loading) {
        content = (
            <div className="px-[50px]">
                <SkeletonTheme baseColor="#202020" highlightColor="#232323">
                    <Skeleton height={40} />
                    <Skeleton height={20} count={2} />
                </SkeletonTheme>
                <div className="flex justify-center mt-4">
                    <button className={`button-animate w-28 h-10 text-sm flex text-center justify-center items-center cursor-pointer mt-2 rounded-lg bg-zinc-700/40 border border-zinc-700/20 hover:bg-zinc-700/60`}>
                        Loading...
                    </button>
                </div>
            </div>
        );
    } else {
        if (type == "login") {
            content = (
                <div className="px-[50px]">
                    <p className="mt-2 text-[#b9b9b9] text-[12px] text-center">All that's missing is your username & password! Enter it and log in!</p>
                    <div className="mt-4">
                        <p className="text-[12px] text-[#b9b9b9]" style={{ textAlign: "left" }}>
                            Username
                        </p>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="username"
                            className={`focus:border-zinc-700/40 border-zinc-700/20 mt-1 h-[32px] w-full text-[12px] outline-none px-3 duration-200 transition-all bg-zinc-700/20 border text-[#e3e3e3] rounded-[4px]`}
                        />
                    </div>
                    <div className="mt-4">
                        <p className="text-[12px] text-[#b9b9b9]" style={{ textAlign: "left" }}>
                            Password
                        </p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="*********"
                            className={`focus:border-zinc-700/40 border-zinc-700/20 mt-1 h-[32px] w-full text-[12px] outline-none px-3 duration-200 transition-all bg-zinc-700/20 border text-[#e3e3e3] rounded-[4px]`}
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <button onClick={handleButton} className={`button-animate w-28 h-10 text-sm flex text-center justify-center items-center cursor-pointer mt-2 rounded-lg bg-zinc-700/40 border border-zinc-700/20 hover:bg-zinc-700/60`}>
                            Login
                        </button>
                    </div>
                </div>
            );
        } else if (type == "loged") {
            content = (
                <div className="px-[50px]">
                    <h4 className="mt-4 pb-4 text-[#e3e3e3] text-[18px] font-semibold text-center">{user.username}</h4>
                    <p className="text-[#e3e3e3] text-[12px]">You are logged in as 
                        <span className="font-semibold"> {user.first_name} {user.last_name}</span>
                    </p>
                    <div className="flex justify-center mt-4">
                        <button onClick={handleButton} className={`button-animate w-28 h-10 text-sm flex text-center justify-center items-center cursor-pointer mt-2 rounded-lg bg-zinc-700/40 border border-zinc-700/20 hover:bg-zinc-700/60`}>
                            Logout
                        </button>
                    </div>
                </div>
            );
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/60 bg-opacity-25" />
                </Transition.Child>

                <div style={{ zIndex: "90" }} className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-md bg-[#111112] p-4 text-left align-middle shadow-2xl transition-all">
                                <img className="mt-12 w-[80px] h-[80px] justify-center mx-auto rounded-full" src="/logo.png" />
                                <h3 className="mt-4 text-[#e3e3e3] text-[18px] font-semibold text-center">Welcome!</h3>
                                <div className="mt-6 justify-center mx-auto text-center">
                                    {content}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>

    )
}