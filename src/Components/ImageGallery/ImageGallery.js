import PropTypes from "prop-types";
import s from "../ImageGallery/ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

function ImageGallery({ images, onClick }) {
  return (
    <ul className={s.gallery}>
      {images.map((image) => (
        <ImageGalleryItem key={image.id} image={image} onClick={onClick} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
export default ImageGallery;
