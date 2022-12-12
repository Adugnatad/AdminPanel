import styles from "./Dashboard.module.scss";
import Spline from "./Charts/Spline";
import { MdOutlineWavingHand } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAPI } from "../../Context/APIContext";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import IconBreadcrumbs from "../BreadCrumps/BreadCrumps";

const Dashboard = () => {
  const location = useLocation();
  let navigate = useNavigate();
  // const { userType } = useAPI();
  const {
    changeTeamDepartments,
    changeIndividualDepartments,
    changeDepartments,
    changeSubDepartments,
    changeRoles,
    changeUsers,
    userType,
  } = useAPI();

  const Users = ["Departments", "Roles", "Users"];
  const Bsc = ["Perspective", "Objective", "KPIs"];

  useEffect(() => {
    fetch("http://10.100.2.63:9000/core/department/")
      .then((response) => response.json())
      .then((res) => {
        changeDepartments(res);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("http://10.100.2.63:9000/core/subdepartment/")
      .then((response) => response.json())
      .then((res) => {
        changeSubDepartments(res);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("http://10.100.2.63:9000/core/subsub/")
      .then((response) => response.json())
      .then((res) => {
        changeTeamDepartments(res);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("http://10.100.2.63:9000/core/individual/")
      .then((response) => response.json())
      .then((res) => {
        changeIndividualDepartments(res);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("http://10.100.2.63:9000/core/role/")
      .then((response) => response.json())
      .then((res) => {
        changeRoles(res);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("http://10.100.2.63:9000/core/users/")
      .then((response) => response.json())
      .then((res) => {
        changeUsers(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDepartment = () => {
    navigate("/dept", { state: { page: "dept" } });
  };

  const handleSubDepartment = () => {
    navigate("/subDepartment", { state: { page: "subDept" } });
  };
  const handleTeamDepartment = () => {
    navigate("/teamDepartment", { state: { page: "sub-subDept" } });
  };
  const handleIndividualDepartment = () => {
    navigate("/individualDepartment", { state: { page: "individualDep" } });
  };

  const handleRoles = () => {
    navigate("/role", { state: { page: "role" } });
  };

  const handleUsers = () => {
    navigate("/user", { state: { page: "user" } });
  };

  const handlePerspectives = () => {
    navigate("/perspective", { state: { page: "persp" } });
  };

  const handleObjectives = () => {
    navigate("/objective", { state: { page: "obj" } });
  };

  const handleKpis = () => {
    navigate("/kpi", { state: { page: "kpi" } });
  };

  return (
    <main className={styles.container}>
      <div className="breadcrumps">
        <IconBreadcrumbs />
      </div>
      <ProfileHeader />
      {userType === "admin" && (
        <div className={styles.dashboardContainer}>
          <div className={styles.charts}>
            <div className={styles.lines} onClick={handleDepartment}>
              <Spline titles="Processes" />
            </div>
            <div className={styles.lines} onClick={handleSubDepartment}>
              <Spline titles="Sub-Processes" />
            </div>
            <div className={styles.lines} onClick={handleTeamDepartment}>
              <Spline titles="Head Office Teams / Branchs" />
            </div>
          </div>
          <div className={styles.charts}>
            <div className={styles.lines} onClick={handleIndividualDepartment}>
              <Spline titles="Positions" />
            </div>
            <div className={styles.lines} onClick={handleRoles}>
              <Spline titles="Roles" />
            </div>
            <div className={styles.lines} onClick={handleUsers}>
              <Spline titles="Users" />
            </div>
          </div>
        </div>
      )}
      {userType !== "admin" && (
        <>
          <div className={styles.charts}>
            <div className={styles.lines} onClick={handlePerspectives}>
              <Spline titles="Perspectives" />
            </div>
            <div className={styles.lines} onClick={handleObjectives}>
              <Spline titles="Objectives" />
            </div>
            <div className={styles.lines} onClick={handleKpis}>
              <Spline titles="KPIs" />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;
