import { useState, useEffect } from "react";
import backgroundImage from "../assets/img/background.png";
import Lottie from "lottie-react";
import questionImage from "../assets/img/awan-lp3i.json";
import { checkTokenExpiration } from "../middlewares/middleware";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Result = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  const getUser = async () => {
    checkTokenExpiration()
      .then(() => {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);

        const userId = decoded.id;
        const userName = decoded.name;
        const userEmail = decoded.email;
        const userPhone = decoded.phone;
        const userStatus = decoded.status;

        const data = {
          id: userId,
          name: userName,
          email: userEmail,
          phone: userPhone,
          status: userStatus,
        };

        setUser(data);
        getResult(data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  };

  const getResult = async (data) => {
    await axios
      .get(`https://api.politekniklp3i-tasikmalaya.ac.id/brain/hasils/${data.id}`)
      .then((response) => {
        const data = response.data;

        if (data.length == 0) {
          return navigate("/home");
        }
        const resultOne = response.data[0];
        const resultTwo = response.data[1];
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logoutFunc = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("bucket");
    navigate("/");
  };

  useEffect(() => {
    checkTokenExpiration()
      .then(() => {
        getUser();
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  }, []);

  const mainStyle = {
    position: "relative",
    overflowX: "hidden", // Prevent horizontal scrolling
    overflowY: "auto", // Allow vertical scrolling if needed
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -2,
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(212, 212, 212, 0.5)",
    zIndex: -1,
  };
  return (
    <main
      style={mainStyle}
      className="flex flex-col p-5 md:p-20 items-center justify-center h-screen"
    >
      <div style={backgroundImageStyle}></div>
      <div style={overlayStyle}></div>
      <div>
        <Lottie animationData={questionImage} loop={true} className="h-40" />
      </div>
      <div className="bg-white shadow-xl p-4 text-center rounded-3xl">
        <div className="font-bold text-[30px] my-2">{user.name}</div>
        <hr className="border boreder-2 my-4 mx-4" />

        {result ? (
          <div className="text-2xl text-black uppercase font-bold" id="result">
            {result[0].hasil === "kanan" ? (
              <div className="p-4 normal-case text-md text-sm text-slate-700">
                Selamat, kamu dominan{" "}
                <span className="text-red-500 font-extrabold uppercase">
                  otak kanan
                </span>
                ! Kreativitas dan imajinasi yang tinggi adalah kekuatanmu.
              </div>
            ) : result[0].hasil === "kiri" ? (
              <div className="p-4 normal-case text-md text-sm text-slate-700">
                Selamat, kamu dominan<span className="text-red-500 font-extrabold uppercase">
                  otak kiri
                </span>! Kemampuan analitis dan logikamu
                sangat luar biasa.
              </div>
            ) : null}
          </div>
        ) : (
          <p className="text-sm text-black">Loading..</p>
        )}
        <button
          type="button"
          onClick={logoutFunc}
          className="bg-sky-700 hover:bg-sky-800 text-white px-5 py-2 rounded-xl text-sm"
        >
          <i className="fa-solid fa-right-from-bracket"></i> Keluar
        </button>
      </div>
    </main>
  );
};

export default Result;
