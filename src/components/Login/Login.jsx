import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useContext, useState } from "react";
import passwordErrorChecker from "../../Utility/PasswordErrorChecker";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { AuthContext } from "../AuthProvider/AuthProvider";
import firebaseAuthError from "../../Utility/FirebaseError";
import Swal from "sweetalert2";
import { auth } from "../../firebase/firebase.config";
import { sendEmailVerification } from "firebase/auth";
import Modal from "../../Utility/Modal";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordErrorMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  //   importing context
  const { loginUser } = useContext(AuthContext);

  // handlePasswordChange
  const handlePasswordChange = (e) => {
    setPasswordErrorMessage(passwordErrorChecker(e));
    setErrorMessage(null);
  };

  // handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setShowModal(true);
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    setModalMessage("<p>Login To Your Account ⏳</p>");
    if (passwordError === null) {
      setErrorMessage("");
      loginUser(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user.emailVerified) {
            setModalMessage(
              "<p>Login To Your Account ⏳</p> <p>Login Successfully ✔️</p>"
            );
            setShowModal(false);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully Logged In With Email & Password",
              showConfirmButton: false,
              timer: 2000,
            });
            // navigate after login
            navigate(location?.state ? location.state : "/");
          } else {
            setShowModal(false);
            setModalMessage(
              "<p>Login To Your Account ⏳</p> <p>Email Not Verified ❌</p>"
            );
            Swal.fire({
              title: "Email not Verified",
              text: "Please verify your email to login. A verification email is already being sent to tour email address. If Not found send verification link again by clicking below. Also check your spam folder if not found.",
              icon: "error",
              confirmButtonText: "Send Verification Link",
            }).then((result) => {
              if (result.isConfirmed) {
                sendEmailVerification(auth.currentUser).then(() => {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title:
                      "A New Verification Email is Sent to Your Email Address. Please Check Your Email.",
                    showConfirmButton: false,
                    timer: 3500,
                  });
                });
              }
            });
          }

          e.target.email.value = "";
          e.target.password.value = "";
        })
        .catch((error) => {
          setModalMessage(
            "<p>Login To Your Account ⏳</p> <p>Failed To Login ❌</p>"
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
      <Navbar />
      <div className="lg:w-fit px-16 py-14 bg-white mx-auto text-center">
        <h1 className="font-bold text-[2rem] text-primary">
          Login Your Account
        </h1>
        <hr className="my-12" />
        <form
          className="flex flex-col lg:w-[400px] mx-auto"
          onSubmit={handleLogin}
        >
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
          <input
            className="text-18 font-semibold text-white bg-primary rounded py-2 mt-8 mb-3 cursor-pointer"
            type="submit"
            value="Login"
          />
          <p className="text-secondary">
            Don&apos;t Have an Account?{" "}
            <Link to="/sign-up">
              <span className="text-orange-500">Register</span>
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

export default Login;
