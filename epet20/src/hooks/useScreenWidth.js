import { useEffect,useState } from "react";


export const useScreenWidth = () => {
    const [screenWidth, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const changeWidth = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener("resize", changeWidth);

      return () => {
        window.removeEventListener("resize", changeWidth);
      }})
  return { screenWidth };
};
