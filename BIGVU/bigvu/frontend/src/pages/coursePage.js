import classes from "./coursePage.module.css";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ChapterItem from "../component/chapterItem";
import Spinner from "../UI/Spinner";

const CoursePage = () => {
  const params = useParams();
  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPlay, setCurrentPlay] = useState({
    url: "",
    index: "",
    id: "",
  });
  const videoRef = useRef();

  function saveProgress(videoID, timestamp) {
    localStorage.setItem(videoID, timestamp);
  }

  function deleteProgress(videoID) {
    localStorage.removeItem(videoID);
  }

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch(`/course/${params.id}`);

      if (!response.ok) {
        console.log("Fetching events failed.");
      } else {
        const resData = await response.json();
        setCourse(resData);
        const lastPlayingId = JSON.parse(
          localStorage.getItem(params.id + "last")
        );
        let index = 0;
        if (lastPlayingId) {
          const tempIndex = resData.chapters.findIndex(
            (obj) => obj.id === lastPlayingId
          );
          if (tempIndex !== -1) {
            index = tempIndex;
          }
        }
        setCurrentPlay({
          url: resData.chapters[index].asset.resource.stream.url,
          index: index,
          id: resData.chapters[index].id,
        });
      }
      if (!localStorage.getItem(params.id)) {
        localStorage.setItem(params.id, []);
      }
      setIsLoading(false);
    }

    fetchEvents();
  }, [params.id]);

  // useEffect(() => {
  //   async function fetchEvents() {
  //     setIsLoading(true);
  //     const response = await fetch(`/course/${params.id}`, {
  //       headers: {
  //         Authorization: "Basic " + btoa("bigvu:interview"),
  //       },
  //     });

  //     if (!response.ok) {
  //       console.log("Fetching events failed.");
  //     } else {
  //       const resData = await response.json();
  //       setCourse(resData);
  //       const lastPlaying = localStorage.getItem(params.id + "last");
  //       if (lastPlaying) {
  //         setCurrentPlay(JSON.parse(lastPlaying));
  //       } else {
  //         setCurrentPlay({
  //           url: resData.chapters[0].asset.resource.stream.url,
  //           index: 0,
  //           id: resData.chapters[0].id,
  //         });
  //       }
  //     }
  //     if (!localStorage.getItem(params.id)) {
  //       localStorage.setItem(params.id, []);
  //     }
  //     setIsLoading(false);
  //   }

  //   fetchEvents();
  // }, [params.id]);

  if (isLoading) {
    return <Spinner />;
  }

  const chapterEnd = () => {
    if (videoRef.current) {
      if (!watchedArray.includes(currentPlay.id)) {
        const updatedWatched = [...watchedArray, currentPlay.id];
        localStorage.setItem(params.id, JSON.stringify(updatedWatched));
      }
    }
    deleteProgress(currentPlay.id);

    const index = currentPlay.index + 1;
    if (index < course.chapters.length) {
      setCurrentPlay({
        url: course.chapters[index].asset.resource.stream.url,
        index: index,
        id: course.chapters[index].id,
      });

      localStorage.setItem(
        params.id + "last",
        JSON.stringify(course.chapters[index].id)
      );
    }
  };

  const watched = localStorage.getItem(params.id);
  const watchedArray = watched ? JSON.parse(watched) : [];

  const CurrentTimeHandler = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      saveProgress(currentPlay.id, currentTime);
      if (!watchedArray.includes(currentPlay.id) && currentTime >= 10) {
        const updatedWatched = [...watchedArray, currentPlay.id];
        localStorage.setItem(params.id, JSON.stringify(updatedWatched));
      }
    }
  };

  const chapters = course.chapters.map((item, index) => (
    <ChapterItem
      id={item.id}
      key={index}
      number={index}
      title={item.title}
      background={currentPlay.index}
      isWatched={watchedArray.includes(item.id)}
      url={item.asset.resource.stream.url}
      duration={item.asset.resource.duration}
      onClick={(url, index, id) => {
        CurrentTimeHandler();
        setCurrentPlay({
          url: url,
          index: index,
          id: id,
        });
        localStorage.setItem(
          params.id + "last",
          JSON.stringify(course.chapters[index].id)
        );
      }}
    ></ChapterItem>
  ));

  return (
    <div className={classes.container}>
      <video
        controls
        muted
        autoPlay
        id="main-Video"
        ref={videoRef}
        onEnded={chapterEnd}
        onPause={CurrentTimeHandler}
        src={`${currentPlay.url}#t=${localStorage.getItem(currentPlay.id)}`}
        // onTimeUpdate={(event) => {
        //   localStorage.setItem(currentPlay.id, event.target.currentTime);
        //   if (
        //     !watchedArray.includes(currentPlay.id) &&
        //     event.target.currentTime >= 10
        //   ) {
        //     const updatedWatched = [...watchedArray, currentPlay.id];
        //     localStorage.setItem(params.id, JSON.stringify(updatedWatched));

        //   }
        // }}
      ></video>
      <div className={classes.right}>
        <div className={classes.title}>
          <span>{course.headline}</span>
          <div className={classes.complete}>
            <MdOutlineWorkspacePremium />
            {watchedArray.length}/{course.chapters.length}
          </div>
        </div>
        <div className={classes.chapters}>
          <ul>{chapters}</ul>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
