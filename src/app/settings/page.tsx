"use client";
import React, { useEffect } from "react";
import signUp from "../../../firebase/auth/signup";
import { useRouter } from "next/navigation";
import getDocument from "../../../firebase/getData";
import updateData from "../../../firebase/updateData";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "flowbite";

export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [passwordError, setPasswordError] = React.useState("");
  const [emailInUseError, setEmailInUseError] = React.useState("");
  const [genderError, setGenderError] = React.useState("");

  const [name, setName] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");

  const router = useRouter(); 

  const handleForm1 = async (ev?: { preventDefault: () => void }) => {
    
    ev?.preventDefault;
    const user = getAuth().currentUser;
    console.log("user is", user);
    if (!user) {
      console.log("user is not signed in!");
      return router.push("/signin");
    }
    const { result, error } = await getDocument("users", user.uid);
  
    if (error) {
      console.log("error retrieving user data:", error);
      // Handle the error appropriately
    } else if (result?.exists()) {
      console.log("document values", result.data());
      // Process the document data as needed
    } else {
      console.log("No such document!");
      // Handle the case where the document does not exist
    }
  };
  
//   useEffect(() => {
//     handleForm1();
//     // You may need to disable the lint warning about missing dependencies
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // The empty dependency array [] means it will only run once after the initial render

useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const { result, error } = await getDocument("users", user.uid);
          if (error) {
            console.log("error retrieving user data:", error);
            // Handle the error appropriately
          } else if (result?.exists()) {
            console.log("document values", result.data());
            // Process the document data as needed
          } else {
            console.log("No such document!");
            // Handle the case where the document does not exist
          }
        } catch (error) {
          console.error("An error occurred while fetching user data:", error);
        }
      } else {
        console.log("User is not signed in!");
        router.push("/signin");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  // ... your JSX and other code
  
  const handleForm = async (event: { preventDefault: () => void }) => {
    
    event.preventDefault();

    setGenderError("");

    try {
        
      const user = getAuth().currentUser;
      if(!user) {
        console.log("user is not signed in!")
        return router.push("/signin");
      }
        console.log("USER IS:" + user);
        const details:any = null;

    //   const { result, error } = await signUp(email, password);

      const data = {
        weight: weight,
        height: height,
        age: age,
      };
      
      const { resultUpdate, errorUpdate } = await updateData(
        "users",
        user.uid,
        data
      );

    //   const { resultInsert, errorInsert } = await addData(
    //     "users",
    //     result?.user.uid,
    //     data
    //   );

      // If there's an error inserting data, throw it to the catch block
      if (errorUpdate) {
        console.log(errorUpdate);
        throw errorUpdate;
      }


      // else successful
      console.log("Details successfully Updated.", resultUpdate);
    //   console.log(result);
      return router.push("/");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setEmailInUseError("Email already in use."); // Set email error state
      } else if (error.code === "auth/weak-password") {
        setPasswordError("Password too weak."); // Set password error state
      } else {
        console.log(error); // Log unknown errors
      }
    }
  };

  return (
    <section className="dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 min-h-screen">
        {/* lg:py-0 */}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="flex justify-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Modify Settings
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleForm}>
              {/* <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  required
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              </div> */}

              {/* <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailInUseError) {
                      setEmailInUseError("");
                    }
                  }}
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div> */}

              {emailInUseError && (
                <div
                  className="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Warning!</span>{" "}
                    {emailInUseError} {"Try another email."}
                  </div>
                </div>
              )}

              {/* <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) {
                      setPasswordError("");
                    }
                  }}
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div> */}

              {/* if there is error in password setpassword */}
              {passwordError && (
                <div
                  className="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">Warning!</span>{" "}
                    {passwordError} {"Make it >= 6 characters."}
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="age"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Age
                </label>
                <input
                  onChange={(e) => setAge(e.target.value)}
                  required
                  type="age"
                  name="age"
                  id="age"
                  placeholder="Age"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="weight"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Weight
                </label>

                <div className="flex items-center">
                  <input
                    onChange={(e) => setWeight(e.target.value)}
                    required
                    type="weight"
                    name="weight"
                    id="weight"
                    placeholder="Weight"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {/* add small letter saying lb beside weight */}
                  <span className="ps-2 text-xs text-gray-400">lb</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="height"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Height
                </label>

                <div className="flex items-center">
                  <input
                    onChange={(e) => setHeight(e.target.value)}
                    required
                    type="height"
                    name="height"
                    id="height"
                    placeholder="Height"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <span className="ps-2 text-xs text-gray-400">ft, in</span>
                </div>
              </div>

              <div className="flex justify-center">
                {/* put it into the center */}
                <button className="mx-auto">
                  <a
                    // href="#_"
                    className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-black transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
                  >
                    <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[#CEB888] group-hover:h-full"></span>
                    <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                      <svg
                        className="w-5 h-5 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        // xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                    <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                      <svg
                        className="w-5 h-5 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        // xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                    <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                      Update
                    </span>
                  </a>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}