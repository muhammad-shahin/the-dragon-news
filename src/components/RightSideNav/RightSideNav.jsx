import { FcGoogle } from "react-icons/fc";
import { BsGithub, BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import kidsZone1 from "../../assets/qZone1.png";
import kidsZone2 from "../../assets/qZone2.png";
import kidsZone3 from "../../assets/qZone3.png";
import "./RightSideNav.css";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import firebaseAuthError from "../../Utility/FirebaseError";
import Swal from "sweetalert2";

const RightSideNav = () => {
  const { signInWithGoogle, signInWithGithub } = useContext(AuthContext);

  // handle google sign in
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log("Google User: ", user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Signed In With Google",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        firebaseAuthError(error.message);
      });
  };
  // handle github sign in
  const handleGithubSignIn = () => {
    signInWithGithub()
      .then((result) => {
        const user = result.user;
        console.log("Github User: ", user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Signed In With Github",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        firebaseAuthError(error.message);
      });
  };

  return (
    <section className="">
      {/* login buttons section */}
      <h2 className="text-20 text-primary font-bold mb-6">Login With</h2>
      <div className="space-y-4">
        <button
          className="text-20 text-primary flex justify-center items-center gap-2 border-2 border-blue-400 px-4 py-1 rounded-lg font-medium w-full hover:bg-gray-200 duration-500"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="text-[24px]" /> Login with Google
        </button>
        <button
          className="text-20 text-primary flex justify-center items-center gap-2 border-2 border-blue-400 px-4 py-1 rounded-lg font-medium w-full hover:bg-gray-200 duration-500"
          onClick={handleGithubSignIn}
        >
          <BsGithub className="text-[24px]" /> Login with Github
        </button>
      </div>
      {/* social links section */}
      <h2 className="text-20 text-primary font-bold my-8 mb-6">Find Us On</h2>
      <div className=" border-2 rounded-lg py-5 space-y-4">
        {/* facebook */}
        <div className="flex justify-start items-center gap-3 px-5">
          <div className="w-fit p-2 rounded-full bg-gray-200">
            <BsFacebook className="w-[24px] h-[24px] text-blue-600" />
          </div>
          <p className="text-secondary text-18 font-medium">Facebook</p>
        </div>
        <hr />
        {/* Twitter */}
        <div className="flex justify-start items-center gap-3 px-5">
          <div className="w-fit p-2 rounded-full bg-gray-200">
            <BsTwitter className="w-[24px] h-[24px] text-sky-400" />
          </div>
          <p className="text-secondary text-18 font-medium">Twitter</p>
        </div>
        <hr />
        {/* Instagram */}
        <div className="flex justify-start items-center gap-3 px-5">
          <div className="w-fit p-2 rounded-full bg-gray-200">
            <BsInstagram className="w-[24px] h-[24px] text-[#ee4c4c]" />
          </div>
          <p className="text-secondary text-18 font-medium">Instagram</p>
        </div>
      </div>

      {/* Kids Zone */}
      <div className="bg-gray-200 rounded px-2 py-6 my-8">
        <h2 className="text-20 text-primary font-bold">Kids Zone</h2>
        <div className="space-y-6">
          <img src={kidsZone1} alt="Swimming Kids" />
          <img src={kidsZone2} alt="Class Kids" />
          <img src={kidsZone3} alt="Playground Kids" />
        </div>
      </div>
      {/* Ads Section */}
      <div className="bg-img w-full py-16 px-8 text-center my-10">
        <h3 className="text-white font-semibold text-[30px]">
          Create an Amazing Newspaper
        </h3>
        <p className="text-white font-normal my-5">
          Discover thousands of options, easy to customize layouts, one-click to
          import demo and much more.
        </p>
        <button className="bg-rose-600 px-5 py-2 text-white">Learn More</button>
      </div>
    </section>
  );
};

export default RightSideNav;
