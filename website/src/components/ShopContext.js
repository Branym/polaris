import React, { useState } from "react";
import { getCategories, getChannels } from "../services/initials";

const ShopContext = React.createContext([{}, () => {}]);

const ShopProvider = (props) => {
  const [channels, setChannels] = useState([]);
  const [categories, setCategories] = useState([]);

  React.useEffect(async () => {
    const _cat = await getCategories()
    setCategories(_cat);
    const _ch = await getChannels()
    setChannels(_ch);
  }, [])

  return (
    <ShopContext.Provider value={{categories, channels}}>
      {props.children}
    </ShopContext.Provider>
  );
};

export { ShopContext, ShopProvider };
