import React from "react";
import InputBox from "../components/InputBox";

const InventoryItemEdit = ({ item }) => {
  const [ProductName, setProductName] = useState(null);

  return (
    <div>
      <InputBox placeholder={item.name} value={item.name} />
    </div>
  );
};
export default InventoryItemEdit;
