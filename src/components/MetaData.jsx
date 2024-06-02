import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
export default function MetaData({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

MetaData.propTypes = {
  title: PropTypes.string,
};
