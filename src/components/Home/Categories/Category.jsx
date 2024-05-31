import PropTypes from "prop-types";
export default function Category({ item }) {
  const { name, image } = item || {};
  return (
    <div className="bg-white flex justify-center border p-5 border-opacity-20">
      <div>
        <div>
          <img className="w-24" src={image} alt="" />
        </div>
        <h1 className="text-center text-lg">{name}</h1>
      </div>
    </div>
  );
}

Category.propTypes = {
  item: PropTypes.object,
};
