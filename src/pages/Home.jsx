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
  const navigate = useNavigate();

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
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  };

  const startTest = async () => {
    try {
      const responseUserExist = await axios.get(
        `https://api.politekniklp3i-tasikmalaya.ac.id/kecerdasan/users/${user.id}`
      );
      if (responseUserExist.data) {
        navigate("/question");
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
            `https://api.politekniklp3i-tasikmalaya.ac.id/kecerdasan/users`,
            data
          )
          .then(() => {
            navigate("/question");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkTokenExpiration()
      .then(() => {
        getUser();
      })
      .catch(() => {
        navigate("/");
      });
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
          Puncak kebahagiaan dan kesuksesan tercapai saat kita memanfaatkan kecerdasan otak kanan dan kiri secara optimal. 
          <br></br>
          Fokuslah pada pembelajaran dan pekerjaan yang sesuai dengan kekuatan alami otak kita. 
          <br></br>
          Dengan begitu, kita membuka pintu menuju pencapaian dan kebahagiaan yang tak terbatas.
          </p>
        </div>
        <button
          type="button"
          onClick={startTest}
          className="border-2 border-gray-900 text-sm uppercase font-bold hover:bg-gray-900 hover:text-white px-3 py-1"
        >
          <span>Mulai</span>
        </button>
      </main>
    </section>
  );
}

export default Home;
