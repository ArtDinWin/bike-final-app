import "./Main.scss";
import classNames from "classnames";
import Button from "./../elements/button";
import mainImageOne from "./../../assets/main-img1.jpg";
import mainImageTwo from "./../../assets/main-img2.jpg";
import mainImageThree from "./../../assets/main-img3.jpg";
import stepOne from "./../../assets/step-1.jpg";
import stepTwo from "./../../assets/step-2.png";
import stepThree from "./../../assets/step-3.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";

let intervalId;
let Animation = styled.div`
  animation: 2s ${keyframes`${fadeIn}`} linear;
`;

function Main() {
  const navigate = useNavigate();
  const [activeSlider, setActiveSlider] = useState(0);
  const sliderInfo = [
    {
      id: "0",
      subtitle: "Не можете найти свой велосипед?",
      title: "Оставили во дворе? А может потеряли? Возможно украли?",
      text: "Тогда не теряйте времени и обратитесь к нам. Сообщить о пропаже велосипеда Вы можете, заполнив специальную форму на нашем сайте.",
      imgPath: mainImageOne,
    },
    {
      id: "1",
      subtitle: "Внимательно осмотритесь!",
      title: "На месте угона могут остаться какие-то улики",
      text: "Осмотритесь по сторонам - возможно угонщик ещё не смог далеко уехать или по каким-либо причинам бросил Ваш велосипед неподалёку.",
      imgPath: mainImageTwo,
    },
    {
      id: "2",
      subtitle: "Сообщите о вашей пропаже ",
      title: "Поиск затрудняет пассивная позиция граждан",
      text: "Сообщение о самом незначительном преступлении или правонарушении может привести по итогу к задержанию очень опасного человека",
      imgPath: mainImageThree,
    },
  ];

  const blockInfo = [
    {
      id: "0",
      title: "Пропал велосипед?",
      text: "Постарайтесь справиться с эмоциями и возьмите себя в руки.",
      imgPath: stepOne,
    },
    {
      id: "1",
      title: "Внимательно осмотрите",
      text: "место угона на наличие каких-либо существенных улик.",
      imgPath: stepTwo,
    },
    {
      id: "2",
      title: "Оставьте заявку",
      text: "на сайте, указав все данные о пропаже вашего велосипеда.",
      imgPath: stepThree,
    },
  ];

  const runningSlider = () => {
    setActiveSlider((prevState) => {
      if (prevState === 2) {
        return 0;
      } else {
        return prevState + 1;
      }
    });
  };

  const handleNavSlider = (e) => {
    clearInterval(intervalId);
    const activeSlider = +e.target.dataset.id;
    if (activeSlider) {
      setActiveSlider(activeSlider);
    } else {
      setActiveSlider(0);
    }
    intervalId = setInterval(runningSlider, 8000);
  };

  useEffect(() => {
    intervalId = setInterval(runningSlider, 8000);
    document.title = "Главная стр. / Поиск пропавших велосипедов";
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    Animation = styled.div`
      animation: ${activeSlider}s ${keyframes`${fadeIn}`} linear;
    `;
  }, [activeSlider]);

  const ZoomIn = Animation;

  return (
    <section className={classNames("main", "plr-30")}>
      <div className={classNames("main__wrapper", "block-center")}>
        <div className="main__container">
          <ZoomIn>
            <div className="main__info">
              <div className="main__left-blok">
                <h2>{sliderInfo[activeSlider].subtitle}</h2>
                <h1>{sliderInfo[activeSlider].title}</h1>
                <p>{sliderInfo[activeSlider].text}</p>
                <div className="main__report">
                  <Button
                    text="Сообщить о краже"
                    onClick={() => {
                      navigate("/report");
                    }}
                  />
                </div>
              </div>

              <div className="main__nav-buttons">
                {sliderInfo.map((item, index) => (
                  <span
                    key={item.id}
                    className={activeSlider === index ? "active" : ""}
                    data-id={index}
                    onClick={handleNavSlider}
                  >
                    <div data-id={index}></div>
                  </span>
                ))}
              </div>

              <div className="main__right-blok">
                <div className="main__image-wrapper">
                  <img
                    className=""
                    src={sliderInfo[activeSlider].imgPath}
                    alt="Поиск пропавших велосипедов"
                    width="100%"
                  />
                </div>
              </div>
            </div>
          </ZoomIn>
          <div className="main__block-steps">
            {blockInfo.map((item) => (
              <div className="main__block-item" key={item.id}>
                <div className="main__block-image">
                  <img
                    className=""
                    src={item.imgPath}
                    alt="Поиск пропавших велосипедов"
                    width="100%"
                  />
                </div>
                <div className="main__block-text">
                  <div className="main__block-top">
                    <h4>{item.title}</h4>
                  </div>
                  <div className="main__block-bottom">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
