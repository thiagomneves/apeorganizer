import React, { useEffect, useState } from "react";
import CheckBox from '../../../components/shared/CheckBox'
import { checkShoppingListItem } from "../../../services/ShoppingListItems";

export default function ShoppingListItemItem({item}) {
  const [done, setDone] = useState(item.done)

  useEffect(() => {
    checkItem()
  }, [done])
  
  async function checkItem () {
    const newCheck = {
      id: item.id,
      done
    }
    await checkShoppingListItem(newCheck)
  }

  return (
    <CheckBox label={item.title} check={done} setCheck={setDone}/>
  )
}
