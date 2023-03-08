import styles from "./Spline.module.scss";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";

const Spline = ({ titles }) => {
  return (
    <div className="{styles.chart}">
      {/* <div className={styles.canvas_wrapper}> */}
      <div className={styles.card}>
        {titles === "Processes" && (
          <>
            <p className={styles.title}>Processes</p>
            <p className={styles.text}>Manage Your Processes</p>
          </>
        )}
        {titles === "Sub-Processes / Districts" && (
          <>
            <p className={styles.title}>Sub-Processes / Districts</p>
            <p className={styles.text}>Manage Your Sub-Processes / Districts</p>
          </>
        )}
        {titles === "Head Office Teams / Branchs" && (
          <>
            <p className={styles.title}>Head Office Teams / Branchs</p>
            <p className={styles.text}>
              Manage Your Head Office Teams / Branchs
            </p>
          </>
        )}
        {titles === "Positions" && (
          <>
            <p className={styles.title}>Positions</p>
            <p className={styles.text}>Manage Your Positions</p>
          </>
        )}
        {titles === "Roles" && (
          <>
            <p className={styles.title}>Roles</p>
            <p className={styles.text}>Manage Your Roles</p>
          </>
        )}
        {titles === "Users" && (
          <>
            <p className={styles.title}>Users</p>
            <p className={styles.text}>Manage Your Users</p>
          </>
        )}
        {titles === "Perspectives" && (
          <>
            <p className={styles.title}>Perspectives</p>
            <p className={styles.text}>Manage Your Perspectives</p>
          </>
        )}
        {titles === "Objectives" && (
          <>
            <p className={styles.title}>Objectives</p>
            <p className={styles.text}>Manage Your Objectives</p>
          </>
        )}
        {titles === "KPIs" && (
          <>
            <p className={styles.title}>KPIs</p>
            <p className={styles.text}>Manage Your KPIs</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Spline;
