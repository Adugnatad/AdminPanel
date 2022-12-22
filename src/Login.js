import React, { useEffect, useState } from "react";
import axios from "axios";
// import { baseUrl, url } from "./Constants";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import hailes from "./resources/images/hailes_cleanup.jpg";
import { bounce, fadeIn } from "react-animations";
import coop from "./resources/images/coop.png";
import styled, { keyframes } from "styled-components";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { Spinner } from "react-bootstrap";
import { useAPI } from "./Context/APIContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const SlideInLeft = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`;

const Login = ({ setIsLoggedIn }) => {
  let navigate = useNavigate();
  const { changeUrlKEY, changeUserType, changeNavBarUser } = useAPI();

  useEffect(() => {
    changeUserType("admin");
    fetch("http://10.100.2.63:5003/core/users/")
      .then((response) => response.json())
      .then((res) => {
        // setUsers(res);
        res
          .filter((user) => user.username === "admin")
          .map((us) => {
            changeUrlKEY(us.id);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [loading, setLoading] = useState(false);

  const HandleError = (type) => {
    if (type === "details") {
      toast.error("Incorrect Login Details", {
        position: toast.POSITION.TOP_LEFT,
      });
    } else if (type === "network") {
      toast.error("Please check your network and try again", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const Bounce = styled.div`
    animation: 2s ${keyframes`${bounce}`} infinite;
  `;
  const FadeIn = styled.div`
    animation: 2s ${keyframes`${fadeIn}`} infinite;
  `;

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required!"),
      password: Yup.string().required("Password is required!"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`http://10.100.2.63:5003/core/auth/new/login/`, values)
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            setIsLoggedIn(true);
            changeNavBarUser("admin");
            navigate(`/dashboard`);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 401) {
            HandleError("details");
          }
          if (error.message === "Network Error") {
            HandleError("network");
          }
        });
    },
  });
  return (
    <main style={{ flex: "1" }}>
      <div className="big-wrapper light">
        <>
          <header>
            <div className="container">
              <div className="logo">
                <Bounce>
                  <img src={coop} alt="Logo" />
                </Bounce>
              </div>
            </div>
          </header>

          <div className="showcase-area">
            <div className="container">
              <div>
                <div className="left">
                  <div className="big-title">
                    <Bounce>
                      <h1>Admin DashBoard</h1>
                    </Bounce>
                  </div>
                  <FadeIn>
                    <p className="text">
                      "To be the leading private bank in 2025"
                    </p>
                  </FadeIn>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className={styles.loginContainer}>
                    <span className={styles.loginLabel}>Login</span>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className={styles.loginInput}
                      placeholder="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    {formik.touched.username && formik.errors.username && (
                      <p>{formik.errors.username}</p>
                    )}
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={styles.loginInput}
                      placeholder="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />

                    {formik.touched.password && formik.errors.password && (
                      <p>{formik.errors.password}</p>
                    )}
                    <button className={styles.loginBtn} type="submit">
                      {" "}
                      Sign In{" "}
                    </button>
                  </div>
                </form>
              </div>

              <div className="right">
                <img src={hailes} alt="Person Image" className="person" />
              </div>
            </div>
          </div>
        </>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </main>
  );
};
export default Login;
