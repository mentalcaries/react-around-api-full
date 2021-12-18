import React from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import MessagePopup from "./MessagePopup";
import InfoTooltip from "./InfoTooltip";
import { register, authorise, verifyUser } from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIspProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsloggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem("jwt"))
  const history = useHistory();

  React.useEffect(() => {
       api
      .getProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIspProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(clickedCard) {
    setSelectedCard(clickedCard);
  }

  // function handleDeleteclick(){
  //   setIsDeletePopupOpen(true)
  // }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIspProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleOutsideClick(evt) {
    if (evt.target.className === "popup__overlay") {
      closeAllPopups();
    }
  }

  function handleUpdateUser(userInfo) {
    api
      .setProfileInfo(userInfo)
      .then((res) => {
        setCurrentUser(res); 
        closeAllPopups();
        
      })
      .catch((err)=>console.log(err))
  }

  function handleUpdateAvatar(link) {
    api.updateProfilePicture(link).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err)=>console.log(err))
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addNewCard(newCard)
      .then((addedCard)=>{
        setCards([addedCard, ...cards]);
        closeAllPopups();
        
      })
      .catch((err)=>console.log(err))
  }

  React.useEffect(() => {
    api
      .getCards()
      .then((cards) => setCards(cards))
      .catch((err)=>console.log(err))
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((err)=>console.log(err))
  }

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(()=>{
        setCards((cards) => cards.filter((c) => c._id !== card._id))
      })
      .catch((err)=>console.log(err))
  }

  const anyPopupOpen =
    isEditAvatarPopupOpen ||
    isAddPlacePopupOpen ||
    isEditProfilePopupOpen ||
    isDeletePopupOpen ||
    isInfoTooltipOpen ||
    selectedCard;


  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

  anyPopupOpen &&  document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
}, [anyPopupOpen])


  function handleRegisterSubmit() {
    register(password, email)
      .then((res) => {
        if (res) {
          setIsSuccess(true);
          // setIsInfoTooltipOpen(true);
          setTimeout(() => {
            setIsInfoTooltipOpen(false);
          }, 1500);
          history.push("/login");
        } else {
          setIsSuccess(false);
          // setIsInfoTooltipOpen(true);
        }
      })
      .catch(() => {
        setIsSuccess(false);
        // setIsInfoTooltipOpen(true);
        
      })
      .finally(()=>{
        setIsInfoTooltipOpen(true)
        setTimeout(() => {
          setIsInfoTooltipOpen(false);
        }, 1000);
      })
  }

  function handleLoginSubmit({ password, email }) {
    if (!password || !email) {
      return;
    }
    authorise(password, email)
      .then((data) => {
        if (!data) {
          setIsInfoTooltipOpen(true);
          setIsSuccess(false);
          return;
        } else {
          localStorage.setItem("jwt", data.token)
          setToken(data.token)
          setIsloggedIn(true);
          setPassword("");
          setUserEmail(email)
          setEmail("");
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setIsSuccess(false);
      });
  }

  const checkToken = React.useCallback(() => {
    if (token) {
      verifyUser(token)
        .then((res) => {
          if (!res) {
            return;
          } else {
            setUserEmail(res.data.email);
            setIsloggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, [history, token]);

  React.useEffect(() => {
    checkToken();
  }, [checkToken]);

  function signOut() {
    localStorage.removeItem("jwt");
    setIsloggedIn(false);
    setUserEmail("")
    history.push("/");
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }


  return (
    <div className="App">
      <div className="root">
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page-content">
            <Switch>
              <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
                <Header
                  button={
                    <button
                      className={`header__open hover-animate ${
                        isMenuOpen ? "header__close" : ""
                      }`}
                      onClick={toggleMenu}
                    />
                  }
                >
                  <div
                    className={`header__user ${
                      !isMenuOpen ? "header__user_collapsed" : ""
                    }`}
                  >
                    <p className="header__username">{userEmail}</p>
                    <Link
                      to="/"
                      className="header__link hover-animate"
                      onClick={signOut}
                    >
                      Log out
                    </Link>
                  </div>
                </Header>
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCard}
                />

                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  onOutsideClick={handleOutsideClick}
                />

                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                  onOutsideClick={handleOutsideClick}
                />

                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlaceSubmit={handleAddPlaceSubmit}
                  onOutsideClick={handleOutsideClick}
                />

                <PopupWithForm
                  name="confirm-delete"
                  title="Are you sure?"
                  onClose={closeAllPopups}
                />

                <ImagePopup
                  card={selectedCard}
                  onClose={closeAllPopups}
                  onOutsideClick={handleOutsideClick}
                />

                <MessagePopup
                  isOpen={isDeletePopupOpen}
                  onClose={closeAllPopups}
                  onOutsideClick={handleOutsideClick}
                >
                  <h2 className="popup__title popup__title_delete">
                    Are you sure?
                  </h2>
                  <button className="popup__save-btn" name="Yes" type="submit">
                    Yes
                  </button>
                </MessagePopup>
              </ProtectedRoute>

              <Route path="/login">
                <Header>
                  {" "}
                  <Link className="header__link hover-animate" to="/register">
                    {" "}
                    <p>Sign up</p>
                  </Link>{" "}
                </Header>
                <Login
                  onSubmit={handleLoginSubmit}
                  password={password}
                  setPassword={setPassword}
                  setEmail={setEmail}
                  email={email}
                />
              </Route>

              <Route path="/register">
                <Header>
                  {" "}
                  <Link className="header__link hover-animate" to="/login">
                    {" "}
                    <p>Log in</p>
                  </Link>{" "}
                </Header>
                <Register
                  handleSubmit={handleRegisterSubmit}
                  password={password}
                  setPassword={setPassword}
                  setEmail={setEmail}
                  email={email}
                />
              </Route>
            </Switch>
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              isSuccess={isSuccess}
              onClose={closeAllPopups}
              onOutsideClick={handleOutsideClick}
            />
            <Footer />
          </div>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
