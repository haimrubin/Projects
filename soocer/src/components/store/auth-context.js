import React, { useEffect, useState } from "react";



const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: (username, password) => {},
  onLogout: () => {},


  // players: [],
  // playingToday: [],
  // notPlaying: [],
  // addPlayerToday: (player) => {},
  // rmvPlayerToday: (id) => {},
  // newPlayer: (player) => {},
  // deletePlayer: (player) => {},
  // makeChoose: () => {},
 });
// const defaultPlayers = {
//   players: [...data],
//   playing: [],
//   notPlaying: [...data],
// // };
// const playerReducer = (state, action) => {
//   if (action.type === "ADD") {
//     const newPlayingList = state.playing.concat(action.player);
//     let newNotPlaying = state.notPlaying.filter(
//       (item) => action.player.id !== item.id
//     );
//     return {
//       playing: newPlayingList,
//       notPlaying: newNotPlaying,
//       players: state.players,
//     };
//   } else if (action.type === "RMV") {
//     const playerIndex = state.playing.findIndex(
//       (item) => item.id === action.id
//     );
//     const rmvPlayer = state.playing[playerIndex];
//     const newNotPlaying = [rmvPlayer, ...state.notPlaying];
//     const newPlayingList = state.playing.filter(
//       (item) => item.id !== rmvPlayer.id
//     );

//     return {
//       playing: newPlayingList,
//       notPlaying: newNotPlaying,
//       players: state.players,
//     };
//   } else if (action.type === "NEW") {
//     const newList = state.players.concat(action.player);
//     const newNotPlaying = [action.player, ...state.notPlaying];
//     return {
//       playing: state.playing,
//       notPlaying: newNotPlaying,
//       players: newList,
//     };
//   } else if (action.type === "DEL") {
//     const newList = state.players.filter((item) => item.id !== action.id);
//     const newNotPlaying = state.notPlaying.filter(
//       (item) => item.id !== action.id
//     );

//     return {
//       playing: state.playing,
//       notPlaying: newNotPlaying,
//       players: newList,
//     };
//   } else if (action.type === "CHOOSE") {
//     let sortList = [...state.playing];
//     sortList = sortList.sort((a, b) =>
//       a.level > b.level ? -1 : b.level > a.level ? 1 : 0
//     );
//     let playersInTeam;
//     if (sortList.length > 15) {
//       playersInTeam = 4;
//     } else {
//       playersInTeam = 3;
//     }
//     const colors = ["red", "blue", "yellow", "white"];

//     for (let index = 0; index < sortList.length; index++) {
//       sortList[index].team = colors[index % playersInTeam];
//     }
//     return {
//       playing: sortList,
//       notPlaying: state.notPlaying,
//       players: state.players,
//     };
//   }

//   return defaultPlayers;
// };

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const [playersState, dispatchPlayerState] = useReducer(
  //   playerReducer,
  //   defaultPlayers
  // );

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") setIsLoggedIn(true);
  }, [isLoggedIn]);

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logouthandler = () => {
    localStorage.setItem("isLoggedIn", "0");
    setIsLoggedIn(false);
  };

  // const chooseHandler = () => {
  //   dispatchPlayerState({ type: "CHOOSE" });
  // };

  // const addPlayerTodayHandler = (player) => {
  //   dispatchPlayerState({ type: "ADD", player: player });
  // };
  // const rmvPlayerTodayHandler = (id) => {
  //   dispatchPlayerState({ type: "RMV", id: id });
  // };
  // const newPlayerHandler = (player) => {
  //   dispatchPlayerState({ type: "NEW", player: player });
  // };
  // const delPlayerHandler = (id) => {
  //   dispatchPlayerState({ type: "DEL", id: id });
  // };

  return (
    <AuthContext.Provider
      value={{
        // players: data,
        // playingToday: playersState.playing,
        // notPlaying: playersState.notPlaying,
        // addPlayerToday: addPlayerTodayHandler,
        // rmvPlayerToday: rmvPlayerTodayHandler,
        // newPlayer: newPlayerHandler,
        // deletePlayer: delPlayerHandler,
        // makeChoose: chooseHandler,

        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logouthandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
