import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoLp3i from '../../assets/img/logo-lp3i.png'
import logoTagline from '../../assets/img/tagline-warna.png'

const Login = () => {
    const navigate = useNavigate();

    const [errorPage, setErrorPage] = useState(false);

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandle = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (email !== '' && password !== '') {
            await axios.post('https://pmb-api.politekniklp3i-tasikmalaya.ac.id/auth/login/v2', {
                email: email,
                password: password,
            }, { withCredentials: true })
                .then((response) => {
                    localStorage.setItem('LP3IPSYBRAIN:token', response.data.token)
                    alert(response.data.message);
                    navigate('/home');
                })
                .catch((error) => {
                    if (error.response.status == 500) {
                        alert(`Mohon maaf server sedang tidak tersedia, silahkan hubungi Administrator.`);
                    }
                    if (error.response.status == 401) {
                        alert(error.response.data.message);
                    }
                    if (error.response.status == 404) {
                        alert(error.response.data.message);
                    }
                    setLoading(false);
                });
        } else {
            alert('Ada form yang belum diisi!');
            setLoading(false);
        }
    }

    const getInfo = async () => {
        try {
            const token = localStorage.getItem('LP3IPSYBRAIN:token');
            if (!token) {
                return navigate('/');
            }

            const fetchProfile = async (token) => {
                const response = await axios.get('https://pmb-api.politekniklp3i-tasikmalaya.ac.id/profiles/v1', {
                    headers: { Authorization: token },
                    withCredentials: true,
                });
                console.log(response.data);
                return response.data;
            };

            try {
                const profileData = await fetchProfile(token);
                if (profileData) {
                    navigate('/home');
                }
            } catch (profileError) {
                if (profileError.response && profileError.response.status === 403) {
                    try {
                        const response = await axios.get('https://pmb-api.politekniklp3i-tasikmalaya.ac.id/auth/token/v2', {
                            withCredentials: true,
                        });

                        const newToken = response.data;
                        localStorage.setItem('LP3IPSYBRAIN:token', newToken);
                        const newProfileData = await fetchProfile(newToken);
                        if (newProfileData) {
                            navigate('/home');
                        }
                    } catch (error) {
                        console.error('Error refreshing token or fetching profile:', error);
                        if (error.response && error.response.status === 400) {
                            localStorage.removeItem('LP3IPSYBRAIN:token');
                        }
                    }
                } else {
                    console.error('Error fetching profile:', profileError);
                    setErrorPage(true);
                }
            }
        } catch (error) {
            if (error.response) {
                if ([400, 403].includes(error.response.status)) {
                    localStorage.removeItem('LP3IPSYBRAIN:token');
                    navigate('/');
                } else {
                    console.error('Unexpected HTTP error:', error);
                    setErrorPage(true);
                }
            } else if (error.request) {
                console.error('Network error:', error);
                setErrorPage(true);
            } else {
                console.error('Error:', error);
                setErrorPage(true);
            }
            navigate('/');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <section className='bg-gray-50 flex items-center justify-center h-screen'>
            <main className='w-full container mx-auto space-y-8 px-5'>
                <div className='max-w-md mx-auto flex justify-center gap-5'>
                    <img src={logoLp3i} alt='logo lp3i' className='h-10 md:h-14' />
                    <img src={logoTagline} alt='logo lp3i' className='h-10 md:h-14' />
                </div>
                <form className="max-w-md bg-white border border-gray-100 shadow-lg mx-auto px-8 py-8 rounded-3xl" onSubmit={loginHandle}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border font-reguler border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@email.com" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div className='space-x-3'>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-reguler rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center">Masuk</button>
                        <a href={`/register`} className='text-sm text-gray-700 hover:underline'>
                            <span>Belum punya akun? </span>
                            <span className='font-medium'>Daftar disini</span>
                        </a>
                    </div>
                </form>
            </main>
        </section>
    )
}

export default Login
