import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import passwordErrorChecker from "../../Utility/PasswordErrorChecker";
import firebaseAuthError from "../../Utility/FirebaseError";
import firebaseStorageError from "../../Utility/FirebaseStorageError";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { auth, storage } from "../../firebase/firebase.config";
import Swal from "sweetalert2";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Modal from "../../Utility/Modal";

const SignUp = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("Modal Message");
  const [imageName, setImageName] = useState(null);
  const [imageUpload, setImageUpload] = useState();
  const { createUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  // handlePasswordChange
  const handlePasswordChange = (e) => {
    setPasswordErrorMessage(passwordErrorChecker(e));
    setErrorMessage(null);
  };

  //   handle Image Input on change
  const handleImageInput = (event) => {
    setImageUpload(event.target.files[0]);
    setImageName(event.target.files[0].name);
  };

  //   handle Image Upload
  const handleImageUpload = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    const imageRef = ref(
      storage,
      `NewsHunt/profilePicture/${randomNumber}${imageUpload.name}`
    );
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      setModalMessage(
        "<p>Creating Your Account ⏳</p> <p>Account Created Successfully ✔️</p> <p>Profile Updated ✔️</p> <p>Profile Picture Uploaded Successfully ✔️</p>"
      );
      getDownloadURL(snapshot.ref).then((url) => {
        updateProfile(auth.currentUser, {
          photoURL: url,
        })
          .then(() => {
            setImageName(null);
            setModalMessage(
              "<p>Creating Your Account ⏳</p> <p>Account Created Successfully ✔️</p> <p>Profile Updated ✔️</p> <p>Profile Picture Uploaded Successfully ✔️</p> <p>Registration Complete ✔️</p> <p>Verification Email Sent ✔️</p>"
            );
            sendEmailVerification(auth.currentUser).then(() => {
              setTimeout(() => {
                setShowModal(false);
                Swal.fire({
                  title: "Sign Up Complete",
                  text: "Account Created & Profile Picture Updated Successfully. Now Verify Your Account To Sign In",
                  icon: "success",
                  confirmButtonText: "Sign In Now",
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate("/login");
                  }
                });
              }, 1500);
            });
          })
          .catch((error) => {
            setShowModal(false);
            firebaseStorageError(error.message);
          });
      });
    });
  };

  //   handle Register
  const handleRegister = (e) => {
    e.preventDefault();
    setShowModal(true);
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    if (!passwordError) {
      setPasswordErrorMessage(null);
      createUser(email, password)
        .then((userCredential) => {
          console.log(userCredential.user);
          setModalMessage(
            "<p>Creating Your Account ⏳</p> <p>Account Created Successfully ✔️</p>"
          );
          e.target.name.value = "";
          e.target.email.value = "";
          e.target.password.value = "";
          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {
              if (imageUpload) {
                handleImageUpload();
              } else {
                sendEmailVerification(auth.currentUser).then(() => {
                  setModalMessage(
                    "<p>Creating Your Account ⏳</p> <p>Account Created Successfully ✔️</p> <p>Profile Updated ✔️</p> <p>Verification Email Sent ✔️</p>"
                  );
                  setTimeout(() => {
                    setShowModal(false);
                    Swal.fire({
                      title: "Sign Up Complete",
                      text: "Account Created & Profile Updated Successfully. Now Verify Your Account To Sign In",
                      icon: "success",
                      confirmButtonText: "Sign In Now",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate("/login");
                      }
                    });
                  }, 1500);
                });
              }
            })
            .catch((error) => {
              setShowModal(false);
              firebaseAuthError(error.message);
            });
        })
        .catch((error) => {
          setModalMessage(
            "<p>Creating Your Account ⏳</p> <p>Failed To Create Account ❌</p>"
          );
          setShowModal(false);
          firebaseAuthError(error.message);
        });
    } else {
      setShowModal(false);
      setErrorMessage(passwordError);
    }
  };
  return (
    <section className="h-auto pb-8">
      <div className="lg:w-fit px-16 py-14 bg-white mx-auto text-center">
        <h1 className="font-bold text-[2rem] text-primary">
          Register Your Account
        </h1>
        <hr className="my-12" />
        <form
          className="flex flex-col lg:w-[400px] mx-auto"
          onSubmit={handleRegister}
        >
          <label
            className="text-left text-18 font-semibold text-primary mb-2"
            htmlFor="name"
          >
            Your Name
          </label>
          <input
            className="px-5 py-3 outline-none bg-[#F3F3F3] lg:w-[400px] text-primary text-18 mb-4"
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            required
          />
          <label
            className="text-left text-18 font-semibold text-primary mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="px-5 py-3 outline-none bg-[#F3F3F3] lg:w-[400px] text-primary text-18 mb-4"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            required
          />
          <label
            className="text-left text-18 font-semibold text-primary mb-2"
            htmlFor="email"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="px-5 py-3 outline-none bg-[#F3F3F3] lg:w-[400px] text-primary text-18 mb-4"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={handlePasswordChange}
              required
            />
            {passwordError && (
              <p className="text-red-600 text-[12px] text-center">
                {passwordError}
              </p>
            )}
            {showPassword ? (
              <AiFillEyeInvisible
                className="absolute top-[25%] right-[5%] text-gray-600 text-[24px] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <AiFillEye
                className="absolute top-[25%] right-[5%] text-gray-600 text-[24px] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          <div className="font-medium bg-transparent hover:bg-gray-300 duration-700 flex flex-col justify-center items-center bg-[#f1f1f1] lg:w-[400px] h-[45px] text-primary text-18">
            <label
              className="cursor-pointer bg-[#F3F3F3] w-full "
              htmlFor="profileImg"
            >
              Upload Profile Picture
            </label>
            <input
              className="hidden"
              type="file"
              name="photoImg"
              id="profileImg"
              accept=".png, .jpg, .jpeg, .gif, .webp"
              onChange={handleImageInput}
            />
            {imageName && (
              <p className=" text-green-600 text-[14px] text-center">
                {imageName}
              </p>
            )}
          </div>
          <input
            className="text-18 font-semibold text-white bg-primary rounded py-2 mt-8 mb-3 cursor-pointer hover:bg-black duration-500"
            type="submit"
            value="Register"
          />
          <p className="text-secondary">
            Already Have an Account?
            <Link to="/login">
              <span className="text-orange-500"> Login</span>
            </Link>
          </p>
          {errorMessage && (
            <p className="text-red-600 font-medium text-[18px] text-center mt-4">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
      <Modal
        title="Creating Account"
        message={modalMessage}
        modalStatus={showModal}
      />
    </section>
  );
};

export default SignUp;
