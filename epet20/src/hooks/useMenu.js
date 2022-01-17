import React from 'react'

export const useMenu = () => {
    const [menu, setMenu] = React.useState(false);
    const showMenu = () => {
        setMenu(!menu);
      };
    return {menu,setMenu,showMenu};
}
