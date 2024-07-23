import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatableSelect from "react-select/creatable";
import axios from 'axios';
import { checkTokenExpiration } from '../../middlewares/middleware';
import "../../assets/css/select-react.css";
import logoLp3i from '../../assets/img/logo-lp3i.png'
import logoTagline from '../../assets/img/tagline-warna.png'

const Register = () => {
    const [nameReg, setNameReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [schoolReg, setSchoolReg] = useState('');
    const [classReg, setClassReg] = useState('');
    const [phoneReg, setPhoneReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [passwordConfReg, setPasswordConfReg] = useState('');

    const [errorsName, setErrorsName] = useState([]);
    const [errorsSchool, setErrorsSchool] = useState([]);
    const [errorsClasses, setErrorsClasses] = useState([]);
    const [errorsEmail, setErrorsEmail] = useState([]);
    const [errorsPhone, setErrorsPhone] = useState([]);
    const [errorsPassword, setErrorsPassword] = useState([]);

    const [selectedSchool, setSelectedSchool] = useState(null);

    const [schoolsAPI, setSchoolsAPI] = useState([]);

    const [isInvalid, setIsInvalid] = useState(false);

    const navigate = useNavigate();

    const handlePhoneChange = (e) => {
        let inputValue = e.target.value;
        const numericInput = inputValue.replace(/\D/g, '');
        const maxLength = 14;
        const truncatedInput = numericInput.slice(0, maxLength);

        let formattedValue = '';
        if (truncatedInput.length > 0) {
            formattedValue = '62';
            for (let i = 2; i < truncatedInput.length; i++) {
                if (i === 2 && truncatedInput[i] !== '8') {
                    formattedValue += '8';
                } else {
                    formattedValue += truncatedInput[i];
                }
            }
        }

        setIsInvalid(truncatedInput.length < 11); 
        setPhoneReg(formattedValue);
    };

    const getSchools = async () => {
        await axios
            .get(
                `https://database.politekniklp3i-tasikmalaya.ac.id/api/school/getall`
            )
            .then((res) => {
                let bucket = [];
                let dataSchools = res.data.schools;
                dataSchools.forEach((data) => {
                    bucket.push({
                        value: data.id,
                        label: data.name,
                    });
                });
                setSchoolsAPI(bucket);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const schoolHandle = (selectedOption) => {
        if (selectedOption) {
            setSchoolReg(selectedOption.value);
            setSelectedSchool(selectedOption);
        }
    };

    const registerFunc = async (e) => {
        e.preventDefault();
        const data = {
            name: nameReg,
            school: schoolReg,
            classes: classReg,
            email: emailReg,
            phone: phoneReg,
            password: passwordReg,
            password_confirmation: passwordConfReg
        }
        await axios.post(`https://database.politekniklp3i-tasikmalaya.ac.id/api/auth/psikotest/register`, data)
            .then((response) => {
                alert(response.data.message)
                navigate('/')
            })
            .catch((error) => {
                const errorCustom = error.response.data.message;
                setErrorsName(errorCustom.name);
                setErrorsSchool(errorCustom.school);
                setErrorsClasses(errorCustom.classes);
                setErrorsEmail(errorCustom.email);
                setErrorsPhone(errorCustom.phone);
                setErrorsPassword(errorCustom.password);
            });
    }

    useEffect(() => {
        checkTokenExpiration()
        .then(() => {
            window.history.back();
        })
        .catch(() => {
            getSchools();
        });
    }, []);

    return (
        <section className='bg-gray-50 flex items-center justify-center h-screen'>
            <main className='w-full container mx-auto space-y-8 px-5'>
                <div className='max-w-xl mx-auto flex justify-center gap-5'>
                    <img src={logoLp3i} alt='logo lp3i' className='h-14' />
                    <img src={logoTagline} alt='logo lp3i' className='h-12' />
                </div>
                <form className="max-w-2xl bg-white border border-gray-100 shadow-lg mx-auto px-8 py-8 space-y-5 rounded-3xl" onSubmit={registerFunc}>
                    <div className="grid grid-cols-1">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nama Lengkap</label>
                            <input type="text" id="name" value={nameReg} onChange={(e) => setNameReg(e.target.value)} className="bg-gray-50 border font-reguler border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Isi nama lengkap" required />
                            <small className='text-xs text-red-600'>{errorsName}</small>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 md:grid-cols-3 gap-5">
                        <div>
                            <label htmlFor="classes" className="block mb-2 text-sm font-medium text-gray-900">Kelas</label>
                            <select id="clasess" onChange={(e) => setClassReg(e.target.value)} className="bg-gray-50 border font-reguler border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" data-placeholder="Nabil" required>
                                {/*<option value="">Pilih</option>
                                <option value="MKP04">MKP04</option>
                                <option value="MP04">MP04</option>
                                <option value="MI23A">MI23A</option>
                                <option value="MI23B">MI23B</option>
                                <option value="TO23">TO23</option>
                                <option value="AB17">AB17</option>
                                <option value="NR2024">NR2024</option>*/}
                                <option value="">Pilih</option>
                                <option value="X1">X1</option>
                                <option value="X2">X2</option>
                                <option value="X3">X3</option>
                                <option value="X4">X4</option>
                                <option value="X5">X5</option>
                                <option value="X6">X6</option>
                                <option value="X7">X7</option>
                                <option value="X8">X8</option>
                                <option value="X9">X9</option>
                                <option value="X10">X10</option>
                                <option value="X11">X11</option>
                                <option value="X12">X12</option>
                                <option value="X13">X13</option>
                            </select>
                            <small className='text-xs text-red-600'>{errorsClasses}</small>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="school" className="block mb-2 text-sm font-medium text-gray-900">Sekolah</label>
                                <CreatableSelect type="text" id="school" styles={{ fontFamily: 'Rubik' }} options={schoolsAPI} value={selectedSchool} onChange={schoolHandle} placeholder='Sekolah' required />
                                <small className='text-xs text-red-600'>{errorsSchool}</small>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input type="email" id="email" value={emailReg} onChange={(e) => setEmailReg(e.target.value)} className="bg-gray-50 border font-reguler border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@email.com" required />
                            <small className='text-xs text-red-600'>{errorsEmail}</small>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">No. Telpon</label>
                            <input type="number" id="phone" value={phoneReg} onChange={handlePhoneChange} className={`bg-gray-50 border font-reguler border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `} placeholder="6281313608558" required />
                            {isInvalid && <small className="text-red-500 text-sm">Minimal 11 Karakter.</small>}
                            <small className='text-xs text-red-600'>{errorsPhone}</small>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" id="password" value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)} className="bg-gray-50 border font-reguler border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div>
                            <label htmlFor="passwordConf" className="block mb-2 text-sm font-medium text-gray-900">Konfirmasi Password</label>
                            <input type="password" id="passwordConf" value={passwordConfReg} onChange={(e) => setPasswordConfReg(e.target.value)} className="bg-gray-50 border font-reguler border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                            <small className='text-xs text-red-600'>{errorsPassword}</small>
                        </div>
                    </div>
                    <div className='space-x-3'>
                        <button type="submit" disabled={isInvalid} className={`text-white bg-blue-700 ${isInvalid ? 'bg-blue-800' : 'hover:bg-blue-800'} focus:ring-4 focus:outline-none focus:ring-blue-300 font-reguler rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center`}>Daftar</button>
                        <a href={`/`} className='text-sm text-gray-700 hover:underline'>
                            <span>Sudah punya akun? </span>
                            <span className='font-medium'>Masuk disini</span>
                        </a>
                    </div>
                </form>
            </main>
        </section>
    )
}

export default Register
