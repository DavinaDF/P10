import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // Vérifier si data.focus est défini et qu'il s'agit d'un tableau

  const byDateDesc =
    data?.focus && Array.isArray(data.focus)
      ? data.focus.sort((evtA, evtB) =>
          // Changement de l'ordre
          new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
        )
      : [];

  const nextCard = () => {
    setTimeout(
      // Ajout de -1 dans la condition pour enlever side vide
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };

  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      ;
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={event.title}
              type="radio"
              name="radio-button"
              // erreur d'écriture : index et non idx
              checked={index === radioIdx}
              // erreur console, il manquait readOnly (ou onChange)
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
