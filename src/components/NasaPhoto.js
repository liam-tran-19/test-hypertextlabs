import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import DatePicker from "react-datepicker";
import { FcNext, FcPrevious } from "react-icons/fc";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/actions/favoriteAction";

const apiKey = process.env.REACT_APP_NASA_KEY;

export default function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [favor, setFavor] = useState();

  useEffect(() => {
    fetchPhoto();

    async function fetchPhoto() {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${formatDate(
          startDate
        )}`
      );
      const data = await res.json();
      setPhotoData(data);
      console.log(data);
      console.log(favorite.length);
      if (favorite.length > 0) {
        let found = favorite.filter((i) => i.photo === data.url);
        console.log(found);
        if (found.length > 0) {
          setFavor(true);
        } else {
          setFavor(false);
        }
      }
    }
  }, [startDate]);
  console.log(favor);
  const dispatch = useDispatch();

  const { favorite } = useSelector((state) => state.favorite);
  console.log(favorite);
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const previousDate = () => {
    let date = new Date(startDate);
    let newDate = date.setDate(date.getDate() - 1);
    setStartDate(newDate);
  };
  const nextDate = () => {
    let date = new Date(startDate);
    let newDate = date.setDate(date.getDate() + 1);
    setStartDate(newDate);
  };

  const handleLike = () => {
    
    if (favor) {
      dispatch(removeFavorite(photoData.url, photoData.date));
      setFavor(false);
      console.log("dislike");
    } else {
      dispatch(addFavorite(photoData.url, photoData.date));
      console.log("like");
      setFavor(true);
    }
  };

  if (!photoData) return <div />;

  return (
    <>
      <NavBar />
      <div className="nasa-photo">
        {photoData.media_type === "image" ? (
          <img src={photoData.url} alt={photoData.title} className="photo" />
        ) : (
          <iframe
            title="space-video"
            src={photoData.url}
            frameBorder="0"
            gesture="media"
            allow="encrypted-media"
            allowFullScreen
            className="photo"
          />
        )}
        <div>
          <h1>{photoData.title}</h1>
          <div className="date-show">
            <p className="date">{photoData.date}</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>

          <p className="explanation">{photoData.explanation}</p>
          <div className="action">
            <FcPrevious size={50} onClick={previousDate} />
            <FcNext size={50} onClick={nextDate} />
            <div onClick={handleLike}>
              {!favor ? (
                <MdFavoriteBorder size={50} />
              ) : (
                <MdFavorite size={50} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="favorite-album">
        <p>Favorite picture</p>
        <div className="favorite-pictures">
          {favorite.length > 0 ? (
            favorite.map((item) => {
              return (
                <div className="fa-pic" key={item.key}>
                  <img src={item.photo} alt="" className="img-show" />
                </div>
              );
            })
          ) : (
            <p>Add your favorite picture</p>
          )}
        </div>
      </div>
    </>
  );
}
