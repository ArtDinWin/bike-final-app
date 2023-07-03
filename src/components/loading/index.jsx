import "./Loading.scss";
import mainImage from "./../../assets/loading2.gif";

function Loading() {
  return (
    <div className="loading">
      <div className="loading__image-wrap">
        <img
          className=""
          src={mainImage}
          alt="Поиск пропавших велосипедов"
          width="100%"
        />
      </div>

      <div className="loading__text-wrap">
        <div className="load-6">
          <div className="letter-holder">
            <div className="l-1 letter">З</div>
            <div className="l-2 letter">а</div>
            <div className="l-3 letter">г</div>
            <div className="l-4 letter">р</div>
            <div className="l-5 letter">у</div>
            <div className="l-6 letter">з</div>
            <div className="l-7 letter">к</div>
            <div className="l-8 letter">а</div>
            <div className="l-9 letter">.</div>
            <div className="l-10 letter">.</div>
            <div className="l-11 letter">.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
