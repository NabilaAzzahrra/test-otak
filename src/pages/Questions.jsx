import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/img/background.png";
import control from "../assets/img/question/control.png";
import planning from "../assets/img/question/planning.png";
import conclution1 from "../assets/img/question/conclutions1.png";
import conclution2 from "../assets/img/question/conclutions2.png";
import sleep from "../assets/img/question/sleep.png";
import dreambig from "../assets/img/question/dream-big.png";
import idea from "../assets/img/question/idea.png";
import art from "../assets/img/question/digital-drawing.png";
import math from "../assets/img/question/math.png";
import people from "../assets/img/question/people.png";
import awan from "../assets/img/awan-lp3i.json";
import question from "../assets/img/question.json";
import logoLp3i from "../assets/img/logo-lp3i.png";
import logoTagline from "../assets/img/tagline-warna.png";
import Lottie from "lottie-react";

const Questions = () => {
  const [skorKanan, setSkorKanan] = useState(0);
  const [skorKiri, setSkorKiri] = useState(0);
  const [selectedRadio, setSelectedRadio] = useState({});

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

  useEffect(() => {
    const radioButtons = document.querySelectorAll(".radio-button");

    const handleRadioChange = () => {
      let skorKananTotal = 0;
      let skorKiriTotal = 0;

      radioButtons.forEach((radio) => {
        if (radio.checked) {
          const kategori = radio.getAttribute("data-kategori");
          if (kategori === "kiri") {
            skorKiriTotal += parseInt(radio.value);
          } else if (kategori === "kanan") {
            skorKananTotal += parseInt(radio.value);
          }
        }
      });

      setSkorKanan(skorKananTotal);
      setSkorKiri(skorKiriTotal);
    };

    radioButtons.forEach((radioButton) => {
      radioButton.addEventListener("change", handleRadioChange);
    });

    return () => {
      radioButtons.forEach((radioButton) => {
        radioButton.removeEventListener("change", handleRadioChange);
      });
    };
  }, []);

  const handleBoxClick = (e) => {
    const radioButton = e.currentTarget.previousElementSibling;
    const name = radioButton.name;
    radioButton.checked = true;
    radioButton.dispatchEvent(new Event("change", { bubbles: true }));

    setSelectedRadio((prevState) => ({
      ...prevState,
      [name]: radioButton.dataset.kategori,
    }));
  };

  const getBoxStyle = (name, kategori) => {
    return selectedRadio[name] === kategori
      ? "w-7 h-7 border border-2 border-black bg-blue-500 rounded-full"
      : "w-7 h-7 border border-2 border-black hover:bg-black rounded-full";
  };

  return (
    <main
      style={mainStyle}
      className="flex flex-col p-5 md:p-20 items-center justify-center overflow-y-scroll"
    >
      <div style={backgroundImageStyle}></div>
      <div style={overlayStyle}></div>

      <div className="max-w-md md:mx-auto flex justify-center gap-5 mb-5 mt-10 mx-10">
        <img
          src={logoLp3i}
          alt="logo lp3i"
          className="h-10 md:h-14"
          // data-aos="fade-down"
        />
        <img
          src={logoTagline}
          alt="logo lp3i"
          className="h-10 md:h-14"
          // data-aos="fade-down"
          // data-aos-delay="100"
        />
      </div>

      <div className="w-full mb-12 flex text-center items-center justify-center font-bold text-xl md:text-2xl">
        TEST OTAK KIRI DAN OTAK KANAN
      </div>

      <div
        className="bg-white mb-20 pb-14 md:pb-10 p-10 shadow-lg rounded rounded-3xl w-full mx-20 flex flex-col md:flex-row md:flex gap-20 items-center justify-center"
        data-aos="fade-down"
        data-aos-delay="400"
      >
        <div className="gap-5 items-center justify-center md:w-[500px]">
          <div className="flex items-center justify-center mb-4">
            <img src={planning} alt="Planning" className="w-[150px] md:w-[200px]"/>
          </div>
          <div className="flex gap-5 border border-2 border-black px-3 p-4 rounded-md md:rounded-full items-center justify-center">
            <div>Saya menikmati merencanakan hal baru dengan detail</div>
            <div>
              <label>
                <input
                  type="radio"
                  name="satu"
                  value="1"
                  data-kategori="kiri"
                  className="radio-button hidden"
                />
                <div
                  className={getBoxStyle("satu", "kiri")}
                  onClick={handleBoxClick}
                ></div>
              </label>
            </div>
          </div>
        </div>

        <div className="gap-5 items-center justify-center md:w-[500px]">
          <div className="flex items-center justify-center -mt-10 md:mt-0">
            <img src={control} alt="Planning" className="w-[180px] md:w-[220px]" />
          </div>
          <div className="flex gap-5 border border-2 border-black px-3 p-4 rounded-md md:rounded-full items-center justify-center">
            <div>Saya menikmati sesuatu yang baru pada kekangan gerakan</div>
            <div>
              <label>
                <input
                  type="radio"
                  name="satu"
                  value="1"
                  data-kategori="kanan"
                  className="radio-button hidden"
                />
                <div
                  className={getBoxStyle("satu", "kanan")}
                  onClick={handleBoxClick}
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div
        data-aos="fade-down"
        data-aos-delay="500"
        className="bg-white mb-20 pb-14 p-10 shadow-lg rounded rounded-3xl w-full mx-20 flex flex-col md:flex-row md:flex gap-20 items-center justify-center"
      >
        <div className="gap-5 items-center justify-center md:w-[500px]">
          <div className="flex items-center justify-center">
            <img src={conclution1} alt="Planning" className="w-[150px] md:w-[200px]" />
          </div>
          <div className="flex gap-5 border border-2 border-black px-3 p-4 rounded-md md:rounded-full items-center justify-center">
            <div>Saya sangat logis dan saya jarang membuat kesimpulan</div>
            <div>
              <label>
                <input
                  type="radio"
                  name="dua"
                  value="1"
                  data-kategori="kiri"
                  className="radio-button hidden"
                />
                <div
                  className={getBoxStyle("dua", "kiri")}
                  onClick={handleBoxClick}
                ></div>
              </label>
            </div>
          </div>
        </div>

        <div className="gap-5 items-center justify-center md:w-[500px]">
        <div className="flex items-center justify-center -mt-10 md:mt-0">
            <img src={conclution2} alt="Planning" className="w-[160px] md:w-[200px]" />
          </div>
          <div className="flex gap-5 border border-2 border-black px-3 p-4 rounded-md md:rounded-full items-center justify-center">
            <div>
              Saya bisa mencapai kesimpulan tanpa mengikuti semua argumen secara
              mendetail
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="dua"
                  value="1"
                  data-kategori="kanan"
                  className="radio-button hidden"
                />
                <div
                  className={getBoxStyle("dua", "kanan")}
                  onClick={handleBoxClick}
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-white mb-20 pb-14 p-10 shadow-lg rounded rounded-3xl w-full mx-20 flex flex-col md:flex-row md:flex gap-20 items-center justify-center"
        data-aos="fade-down"
        data-aos-delay="400"
      >
        <div className="gap-5 items-center justify-center md:w-[500px]">
          <div className="flex items-center justify-center mb-4">
            <img src={sleep} alt="Planning" className="w-[150px] md:w-[180px] ml-10 md:ml-0" />
          </div>
          <div className="flex gap-5 border border-2 border-black px-3 p-4 rounded-md md:rounded-full items-center justify-center">
            <div>
              Saya jarang bermimpi siang hari atau mengingat mimpi buruk saya
              malam hari
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="tiga"
                  value="1"
                  data-kategori="kiri"
                  className="radio-button hidden"
                />
                <div
                  className={getBoxStyle("tiga", "kiri")}
                  onClick={handleBoxClick}
                ></div>
              </label>
            </div>
          </div>
        </div>

        <div className="gap-5 items-center justify-center md:w-[500px]">
        <div className="flex items-center justify-center -mt-10 md:mt-0">
            <img src={dreambig} alt="Planning" className="w-[180px] md:w-[200px]" />
          </div>
          <div className="flex gap-5 border border-2 border-black px-3 p-4 rounded-md md:rounded-full items-center justify-center">
            <div>
              Mimpi saya terlihat begitu jelas dan saya sering bermimpi di siang
              hari
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="tiga"
                  value="1"
                  data-kategori="kanan"
                  className="radio-button hidden"
                />
                <div
                  className={getBoxStyle("tiga", "kanan")}
                  onClick={handleBoxClick}
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-white mb-20 pb-14 p-10 shadow-lg rounded rounded-3xl w-full mx-20 flex flex-col md:flex-row md:flex gap-20 items-center justify-center"
        data-aos="fade-down"
        data-aos-delay="400"
      >
        <div className="gap-5 items-center justify-center md:w-[500px]">
          <div className="flex items-center justify-center">
            <img src={idea} alt="Planning" className="w-[180px] md:w-[200px]" />
          </div>
          <div className="flex gap-5 border border-2 border-black px-3 p-4 rounded-md md:rounded-full items-center justify-center">
            <div>Saya berusaha menemukan alasan dari perilaku orang lain</div>
            <div>
              <label>
                <input
                  type="radio"
                  name="empat"
                  value="1"
                  data-kategori="kiri"
                  className="radio-button hidden"
                />
                <div
                  className={getBoxStyle("empat", "kiri")}
                  onClick={handleBoxClick}
                ></div>
              </label>
            </div>
          </div>
        </div>

        <div className="gap-5 items-center justify-center md:w-[500px]">
        <div className="flex items-center justify-center -mt-10 md:mt-0">
            <img src={people} alt="Planning"  className="w-[180px] md:w-[190px] mb-4" />
          </div>
          <div className="flex gap-5 border border-2 border-black px-3 p-4 rounded-md md:rounded-full items-center justify-center">
            <div>
              Saya sering melihat motivasi terpendam dari perilaku orang lain
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="empat"
                  value="1"
                  data-kategori="kanan"
                  className="radio-button hidden"
                />
                <div
                  className={getBoxStyle("empat", "kanan")}
                  onClick={handleBoxClick}
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-white mb-20 pb-14 p-10 shadow-lg rounded rounded-3xl w-full mx-20 flex flex-col md:flex-row md:flex gap-20 items-center justify-center animate-slide-down"
        data-aos="fade-down"
        data-aos-delay="400"
      >
        <div className="gap-5 items-center justify-center md:w-[500px]">
          <div className="flex items-center justify-center mb-3">
            <img src={math} alt="Planning" className="w-[135px] md:w-[190px]" />
          </div>
          <div className="flex gap-5 border border-2 border-black px-3 p-4 rounded-md md:rounded-full items-center justify-center">
            <div>
              Saya lebih memilih matematika dan masalah ilmiah daripada masalah
              seni
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="lima"
                  value="1"
                  data-kategori="kiri"
                  className="radio-button hidden"
                />
                <div
                  className={getBoxStyle("lima", "kiri")}
                  onClick={handleBoxClick}
                ></div>
              </label>
            </div>
          </div>
        </div>

        <div className="gap-5 items-center justify-center md:w-[500px]">
        <div className="flex items-center justify-center -mt-10 md:mt-0">
            <img src={art} alt="Planning" className="w-[135px] md:w-[190px] mb-4" />
          </div>
          <div className="flex gap-5 border border-2 border-black px-3 p-4 rounded-md md:rounded-full items-center justify-center">
            <div>Saya memilih masalah seni dari pada matematika dan ilmiah</div>
            <div>
              <label>
                <input
                  type="radio"
                  name="lima"
                  value="1"
                  data-kategori="kanan"
                  className="radio-button hidden"
                />
                <div
                  className={getBoxStyle("lima", "kanan")}
                  onClick={handleBoxClick}
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden">
        <div className="flex">
          Kanan
          <input type="number" id="skor_kanan" value={skorKanan} readOnly />
        </div>
        <div className="flex">
          Kiri
          <input type="number" id="skor_kiri" value={skorKiri} readOnly />
        </div>
      </div>
    </main>
  );
};

export default Questions;
