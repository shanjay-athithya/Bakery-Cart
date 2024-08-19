import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '../firebase';
import { FcGoogle } from 'react-icons/fc'; // Google icon from react-icons

const SignInForm = ({ onSignIn }) => {

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      onSignIn(); // Close the modal on successful sign-in
    } catch (err) {
      console.error('Error signing in with Google:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-2xl border border-gray-200">
      <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">Sign In</h2>
      
      <button
        onClick={handleGoogleSignIn}
        className="w-full bg-gray-50 text-gray-800 py-3 rounded-lg flex items-center justify-center shadow-sm hover:bg-gray-100 transition duration-300"
      >
        <FcGoogle className="w-6 h-6 mr-3" /> {/* Google icon */}
        Sign in with Google
      </button>

      <p className="text-center mt-6 text-gray-600">
        Fast, Secure, & Easy Access
      </p>
    </div>
  );
};

export default SignInForm;
