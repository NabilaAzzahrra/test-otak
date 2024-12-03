/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import awanLp3i from "../assets/img/awan-lp3i.json";
import logoLp3i from "../assets/img/logo-lp3i.png";
import logoTagline from "../assets/img/tagline-warna.png";
import { checkTokenExpiration } from "../middlewares/middleware";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState({});
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [hasil, setHasil] = useState('belum ada');

  const getUser = async () => {
    checkTokenExpiration()
      .then(() => {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);

        const userId = decoded.id;
        const userName = decoded.name;
        const userEmail = decoded.email;
        const userPhone = decoded.phone;
        const userSchool = decoded.school ?? "Tidak diketahui";
        const userClasses = decoded.class ?? "Tidak diketahui";
        const userStatus = decoded.status;

        const data = {
          id: userId,
          name: userName,
          email: userEmail,
          phone: userPhone,
          school: userSchool,
          classes: userClasses,
          status: userStatus,
        };

        setUser(data);
        getResult(data);
      })
      .catch((error) => {
        console.log(error);
        // navigate("/");
      });
  };

  const getResult = async (data) => {
    await axios
      .get(
        `https://psikotest-otak-backend.politekniklp3i-tasikmalaya.ac.id/hasils/${data.id}`
      )
      .then((response) => {
        const data = response.data;
        setResult(data);

        if (data.length == 0) {
          setLoading(false);
          setError(false);
        } else {
          const result = response.data[0];

          const hasil = result.hasil;

          setHasil(hasil[0]);
          setLoading(false);
          setError(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(false);
        setLoading(false);
      });
  };

  const logoutFunc = () => {
    localStorage.removeItem("LP3IPSYBRAIN:token");
    localStorage.removeItem("bucket");
    navigate("/");
  };

  const startTest = async () => {
    try {
      const responseUserExist = await axios.get(
        `https://psikotest-kecerdasan-backend.politekniklp3i-tasikmalaya.ac.id/users/${user.id}`
      );
      if (responseUserExist.data) {
        // navigate("/question");
      } else {
        const data = {
          id_user: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          school: user.school,
          classes: user.classes,
        };
        await axios
          .post(
            `https://psikotest-kecerdasan-backend.politekniklp3i-tasikmalaya.ac.id/users`,
            data
          )
          .then(() => {
            // navigate("/question");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInfo = async () => {
    // setLoading(true);

    try {
      const token = localStorage.getItem('LP3IPSYBRAIN:token');
      if (!token) {
        return navigate('/');
      }

      const decoded = jwtDecode(token);
      console.log(decoded.data);
      setUser(decoded.data);

      const fetchProfile = async (token) => {
        const response = await axios.get('https://pmb-api.politekniklp3i-tasikmalaya.ac.id/profiles/v1', {
          headers: { Authorization: token },
          withCredentials: true,
        });
        return response.data;
      };

      try {
        const profileData = await fetchProfile(token);
        const data = {
          id: profileData.applicant.identity,
          name: profileData.applicant.name,
          email: profileData.applicant.email,
          phone: profileData.applicant.phone,
          school: profileData.applicant.school ?? "Tidak diketahui",
          classes: profileData.applicant.class ?? "Tidak diketahui",
          status: profileData.applicant.status == "1" ? "Aktif" : "Tidak Aktif",
        };
        console.log(data);
      } catch (profileError) {
        if (profileError.response && profileError.response.status === 403) {
          try {
            const response = await axios.get('https://pmb-api.politekniklp3i-tasikmalaya.ac.id/auth/token/v2', {
              withCredentials: true,
            });
            const newToken = response.data;
            const decodedNewToken = jwtDecode(newToken);
            localStorage.setItem('LP3IPSYBRAIN:token', newToken);
            console.log(decodedNewToken.data);
            setUser(decodedNewToken.data);
            const newProfileData = await fetchProfile(newToken);
            const data = {
              id: newProfileData.applicant.identity,
              name: newProfileData.applicant.name,
              email: newProfileData.applicant.email,
              phone: newProfileData.applicant.phone,
              school: newProfileData.applicant.school ?? "Tidak diketahui",
              classes: newProfileData.applicant.class ?? "Tidak diketahui",
              status: newProfileData.applicant.status == "1" ? "Aktif" : "Tidak Aktif",
            };
            console.log(data);
          } catch (error) {
            console.error('Error refreshing token or fetching profile:', error);
            if (error.response && error.response.status === 400) {
              localStorage.removeItem('LP3IPSYBRAIN:token');
              navigate('/')
            }
          }
        } else {
          console.error('Error fetching profile:', profileError);
          localStorage.removeItem('LP3IPSYBRAIN:token');
          // setErrorPage(true);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if ([400, 403].includes(error.response.status)) {
          localStorage.removeItem('LP3IPSYBRAIN:token');
          navigate('/');
        } else {
          console.error('Unexpected HTTP error:', error);
          // setErrorPage(true);
        }
      } else if (error.request) {
        console.error('Network error:', error);
        // setErrorPage(true);
      } else {
        console.error('Error:', error);
        // setErrorPage(true);
      }
      navigate('/');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };


  useEffect(() => {
    getInfo();
  }, []);

  return (
    <section className="bg-white h-screen relative bg-cover">
      <main className="container mx-auto flex flex-col justify-center items-center h-screen px-5 gap-5">
        <div className="flex justify-between gap-5">
          <img src={logoLp3i} alt="logo lp3i" className="h-14" />
          <img src={logoTagline} alt="logo lp3i" className="h-12" />
        </div>
        <div className="">
          <Lottie animationData={awanLp3i} loop={true} className="h-52" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="uppercase font-bold text-3xl">Tes Otak Kanan Kiri</h2>
          <p className="text-sm">
            Puncak kebahagiaan dan kesuksesan tercapai saat kita memanfaatkan
            kecerdasan otak kanan dan kiri secara optimal.
            <br></br>
            Fokuslah pada pembelajaran dan pekerjaan yang sesuai dengan kekuatan
            alami otak kita.
            <br></br>
            Dengan begitu, kita membuka pintu menuju pencapaian dan kebahagiaan
            yang tak terbatas.
          </p>
        </div>
        {loading ? (
          <p className="text-gray-900 text-sm">Loading...</p>
        ) : error ? (
          <div className="text-center space-y-3">
            <div className="border-2 border-red-500 text-base bg-red-500 rounded-xl text-white px-5 py-3">
              <p>Mohon maaf, server sedang tidak tersedia.</p>
            </div>
            <button
              type="button"
              onClick={logoutFunc}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl text-sm"
            >
              <i className="fa-solid fa-right-from-bracket"></i> Keluar
            </button>
          </div>
        ) : result.length > 0 ? (
          <div className="text-center space-y-3">
            <div className="border-2 border-gray-900 text-base px-5 py-3">
              <p>
                <span>Nama Lengkap: </span>
                <span className="font-bold underline">{user.name}</span>
              </p>
              <p>
                <span>Dominan: </span>
                <span className="font-bold underline">
                  <span className="uppercase">{result[0].hasil}</span>
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={logoutFunc}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl text-sm"
            >
              <i className="fa-solid fa-right-from-bracket"></i> Keluar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={startTest}
            className="border-2 border-gray-900 text-sm uppercase font-bold hover:bg-gray-900 hover:text-white px-3 py-1"
          >
            <span>Mulai</span>
          </button>
        )}
      </main>
    </section>
  );
}

export default Home;
