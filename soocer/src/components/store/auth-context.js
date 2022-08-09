import React, { useEffect, useReducer, useState } from "react";

const data = [
  {
    id: 209467281,
    name: "haim",
    level: 2,
    team: 0,
  },
  {
    id: 4354354,
    name: "idan",
    level: 3,
    team: 0,
  },
  {
    id: 768954,
    name: "fser",
    level: 5,
    team: 0,
  },
  {
    id: 3,
    name: "haim",
    level: 2,
    team: 0,
  },
  {
    id: 2,
    name: "idan",
    level: 3,
    team: 0,
  },
  {
    id: 1,
    name: "fser",
    level: 5,
    team: 0,
  },
  {
    id: 6,
    name: "haim",
    level: 2,
    team: 0,
  },
  {
    id: 5,
    name: "idan",
    level: 3,
    team: 0,
  },
  {
    id: 4,
    name: "fser",
    level: 5,
    team: 0,
  },
  {
    id: 9,
    name: "haim",
    level: 2,
    team: 0,
  },
  {
    id: 8,
    name: "idan",
    level: 3,
    team: 0,
  },
  {
    id: 7,
    name: "fser",
    level: 5,
    team: 0,
  },
  {
    id: 12,
    name: "haim",
    level: 2,
    team: 0,
  },
  {
    id: 11,
    name: "idan",
    level: 3,
    team: 0,
  },
  {
    id: 10,
    name: "fser",
    level: 5,
    team: 0,
  },
];

const AuthContext = React.createContext({
  players: [],
  playingToday: [],
  notPlaying: [],
  isLoggedIn: false,
  addPlayerToday: (player) => {},
  rmvPlayerToday: (id) => {},
  onLogin: (username, password) => {},
  onLogout: () => {},
  newPlayer: (player) => {},
  deletePlayer: (player) => {},
});
const defaultPlayers = {
  players: [...data],
  playing: [],
  notPlaying: [...data],
};
const playerReducer = (state, action) => {
  if (action.type === "ADD") {
    const newPlayingList = state.playing.concat(action.player);
    let newNotPlaying = state.notPlaying.filter(
      (item) => action.player.id !== item.id
    );
    return {
      playing: newPlayingList,
      notPlaying: newNotPlaying,
      players: state.players,
    };
  } else if (action.type === "RMV") {
    const playerIndex = state.playing.findIndex(
      (item) => item.id === action.id
    );
    const rmvPlayer = state.playing[playerIndex];
    const newNotPlaying = [rmvPlayer, ...state.notPlaying];
    const newPlayingList = state.playing.filter(
      (item) => item.id !== rmvPlayer.id
    );
    return {
      playing: newPlayingList,
      notPlaying: newNotPlaying,
      players: state.players,
    };
  }
  else if (action.type === "NEW") {
    const newList = state.players.concat(action.player);
    const newNotPlaying = [action.player, ...state.notPlaying];
    return {
      playing: state.playing,
      notPlaying: newNotPlaying,
      players: newList,
    };
  }
  else if (action.type === "DEL") {
    const newList = state.players.filter(item => item.id !== action.id)
    const newNotPlaying = state.notPlaying.filter(item => item.id !== action.id)
    
    return {
      playing: state.playing,
      notPlaying: newNotPlaying,
      players: newList,
    };
  }

  return defaultPlayers;
};

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [playersState, dispatchPlayerState] = useReducer(
    playerReducer,
    defaultPlayers
  );

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

  const addPlayerTodayHandler = (player) => {
    dispatchPlayerState({ type: "ADD", player: player });
  };
  const rmvPlayerTodayHandler = (id) => {
    dispatchPlayerState({ type: "RMV", id: id });
  };
  const newPlayerHandler = (player) => {
    dispatchPlayerState({ type: "NEW", player: player });
  };
  const delPlayerHandler = (id) => {
    dispatchPlayerState({ type: "DEL", id: id });
  };

  return (
    <AuthContext.Provider
      value={{
        players: data,
        playingToday: playersState.playing,
        notPlaying: playersState.notPlaying,
        addPlayerToday: addPlayerTodayHandler,
        rmvPlayerToday: rmvPlayerTodayHandler,
        newPlayer: newPlayerHandler,
        deletePlayer: delPlayerHandler,

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
