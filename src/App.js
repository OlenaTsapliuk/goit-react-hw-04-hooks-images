import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import Searchbar from "./Components/Searchbar";
import { useState,useEffect } from "react";
import ImageGallery from "./Components/ImageGallery";
import imageApiService from "./services/ImagesAPI/ImagesApi";
import Button from "./Components/Button/Button";
import Spinner from "./Components/Loader/Loader";
import Modal from "./Components/Modal";
import Container from "./Components/Container/Container";
import Error from "./Components/Error/Error";

function App() {
  const [images, setImages] = useState([]);
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  

  useEffect(() => {
    if (!imageName) {
      return;
    }

    function fetchImages() {
    setIsLoading(true);
    imageApiService(imageName, page)
      .then((images) => {
        setImages((prevState) => [...prevState, ...images]);
        setPage((prevState) => prevState + 1);
        
        if (images.length === 0 && page > 1) {
          toast.error("There are no more images in this category");
          return;
        }
        if (images.length === 0) {
          throw new Error("No matches were found! Try again!");
        }
      })
      .catch((error) =>
        setError("Something went wrong. Try again.")
      )
      .finally(() => {
        setIsLoading(false);

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

    fetchImages();
  },[imageName,page]);

  // componentDidUpdate(prevProps, prevState) {
  //   const { imageName, page } = this.state;
  //   if (prevState.imageName !== imageName) {
  //     this.fetchImages(imageName, page);
  //   }
  // }

  const searchImage = (imageName) => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
    setError(null);
   
  };

  

  const buttonClickOnMore = () => {
    // fetchImages();
    setPage((state) => state + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

 const  bigImage = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
   setLargeImageURL(e.target.dataset.url);
   setTags(e.target.alt);
   
   toggleModal();
  };

    return (
      <Container>
        <Searchbar onSubmit={searchImage} />

        {error && <Error textError={error} />}

        {images.length > 0 && !error && (
          <ImageGallery images={images} onClick={bigImage} />
        )}
        {isLoading && <Spinner />}

        {!isLoading && images.length > 0 && (
          <Button buttonClick={buttonClickOnMore} />
        )}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  
}
export default App;

// class App extends Component {
//   state = {
//     images: [],
//     imageName: "",
//     page: 1,
//     isLoading: false,
//     error: null,
//     showModal: false,
//     largeImageURL: "",
//     tags: "",
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { imageName, page } = this.state;
//     if (prevState.imageName !== imageName) {
//       this.fetchImages(imageName, page);
//     }
//   }
//   searchImage = (imageName) => {
//     this.setState({
//       imageName,
//       page: 1,
//       images: [],
//       error: null,
//     });
//   };

  // fetchImages = () => {
  //   const { imageName, page } = this.state;

  //   this.setState({ isLoading: true });
  //   imageApiService(imageName, page)
  //     .then((images) => {
  //       this.setState((prevState) => ({
  //         images: [...prevState.images, ...images],
  //         page: prevState.page + 1,
  //       }));
  //       if (images.length === 0 && page > 1) {
  //         toast.error("There are no more images in this category");
  //         return;
  //       }
  //       if (images.length === 0) {
  //         throw new Error("No matches were found! Try again!");
  //       }
  //     })
  //     .catch((error) =>
  //       this.setState({ error: "Something went wrong. Try again." })
  //     )
  //     .finally(() => {
  //       this.setState({ isLoading: false });

  //       window.scrollTo({
  //         top: document.documentElement.scrollHeight,
  //         behavior: "smooth",
  //       });
  //     });
  // };

//   buttonClickOnMore = () => {
//     const { page } = this.state;
//     this.fetchImages();
//     this.setState({
//       page: page + 1,
//     });
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   bigImage = (e) => {
//     if (e.target.nodeName !== "IMG") {
//       return;
//     }
//     this.setState({
//       largeImageURL: e.target.dataset.url,
//       tags: e.target.alt,
//     });
//     this.toggleModal();
//   };

//   render() {
//     const { images, isLoading, showModal, largeImageURL, tags, error } =
//       this.state;
//     return (
//       <Container>
//         <Searchbar onSubmit={this.searchImage} state={this.state} />

//         {error && <Error textError={error} />}

//         {images.length > 0 && !error && (
//           <ImageGallery images={images} onClick={this.bigImage} />
//         )}
//         {isLoading && <Spinner />}

//         {!isLoading && images.length > 0 && (
//           <Button buttonClick={this.buttonClickOnMore} />
//         )}
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={largeImageURL} alt={tags} />
//           </Modal>
//         )}
//         <ToastContainer autoClose={3000} />
//       </Container>
//     );
//   }
// }
// export default App;
