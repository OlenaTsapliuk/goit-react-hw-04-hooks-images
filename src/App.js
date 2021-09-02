import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import Searchbar from "./Components/Searchbar";
import { Component } from "react";
import ImageGallery from "./Components/ImageGallery";
import imageApiService from "./services/ImagesAPI/ImagesApi";
import Button from "./Components/Button/Button";
import Spinner from "./Components/Loader/Loader";
import Modal from "./Components/Modal";
import Container from "./Components/Container/Container";
import Error from "./Components/Error/Error";

class App extends Component {
  state = {
    images: [],
    imageName: "",
    page: 1,
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: "",
    tags: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName, page } = this.state;
    if (prevState.imageName !== imageName) {
      this.fetchImages(imageName, page);
    }
  }
  searchImage = (imageName) => {
    this.setState({
      imageName,
      page: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { imageName, page } = this.state;

    this.setState({ isLoading: true });
    imageApiService(imageName, page)
      .then((images) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }));
        if (images.length === 0 && page > 1) {
          toast.error("There are no more images in this category");
          return;
        }
        if (images.length === 0) {
          throw new Error("No matches were found! Try again!");
        }
      })
      .catch((error) =>
        this.setState({ error: "Something went wrong. Try again." })
      )
      .finally(() => {
        this.setState({ isLoading: false });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

  buttonClickOnMore = () => {
    const { page } = this.state;
    this.fetchImages();
    this.setState({
      page: page + 1,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  bigImage = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    this.setState({
      largeImageURL: e.target.dataset.url,
      tags: e.target.alt,
    });
    this.toggleModal();
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, tags, error } =
      this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.searchImage} state={this.state} />

        {error && <Error textError={error} />}

        {images.length > 0 && !error && (
          <ImageGallery images={images} onClick={this.bigImage} />
        )}
        {isLoading && <Spinner />}

        {!isLoading && images.length > 0 && (
          <Button buttonClick={this.buttonClickOnMore} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
export default App;
