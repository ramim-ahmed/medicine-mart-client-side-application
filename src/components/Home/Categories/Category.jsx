import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function Category({ item }) {
  const { _id, name, photo } = item || {};
  return (
    <Link to={`/${name}/${_id}`}>
      <div className="bg-white cursor-pointer flex justify-center border p-5 border-opacity-20">
        <div>
          <div>
            <img className="w-24" src={photo} alt="" />
          </div>
          <h1 className="text-center text-lg mt-2 font-medium">{name}</h1>
        </div>
      </div>
    </Link>
  );
}

Category.propTypes = {
  item: PropTypes.object,
};
