import { createContext,useContext,useState,useEffect } from "react";


const AppContext = createContext();

const getInitialDarkMode = ()=>{
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)'
    ).matches;
  const storedDarkMode = localStorage.getItem('darkTheme')==="true";

  return storedDarkMode || prefersDarkMode
}

export const AppProvider = ({children})=>{
  const [isDarkTheme,setIsDarkTheme] = useState(getInitialDarkMode());
  const [userSearch,setUserSearch]=useState('panda');
  const toggleDarkTheme=()=>{
    const newDarkTheme = !isDarkTheme;  
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem('darkTheme',newDarkTheme)
    // changing class based on isDarkTheme 
  }

  useEffect(()=>{
    const body = document.querySelector('body');
    body.classList.toggle('dark-theme',isDarkTheme);
  },[isDarkTheme]);

  return <AppContext.Provider value={{isDarkTheme,toggleDarkTheme,userSearch,setUserSearch}} >
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = ()=> useContext(AppContext)