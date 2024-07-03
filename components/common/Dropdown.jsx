
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";
import { useEffect, useState } from "react";

const Dropdown = ({ value, onChangeHandler }) => {

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      setCategories(categoryList);
      setLoading(false);
    }
    getCategories();
  }, [])

  return (
    <Select onValueChange={onChangeHandler} value={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {loading ? (
          <SelectItem disabled>Loading...</SelectItem>
        ) : (
          categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category.id.toString()}
              value={category.id.toString()}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
