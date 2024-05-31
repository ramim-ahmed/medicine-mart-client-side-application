import { categoriesData } from "./CategoriesData";
import Category from "./Category";

export default function Categories() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-3">
        <div className="text-center">
          <h3 className="text-2xl font-medium">Shop By Categories</h3>
          <div className="flex justify-center mt-2">
            <div className="border-b-2 border-themeColor w-44"></div>
          </div>
        </div>
        <div className="grid grid-cols-5 pt-10">
          {categoriesData.map((item) => (
            <Category key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
