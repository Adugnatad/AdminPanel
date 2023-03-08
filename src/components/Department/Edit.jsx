import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAPI } from "../../Context/APIContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const EditDept = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const index = location.state.index;
  const filterperspectives = location.state.perspectives;
  const DashboardPage = location.state.dashboardPage;
  const kpis = location.state.kpi;
  const [username, setUsername] = useState("");
  const [usernameId, setUsernameId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [roleId, setRoleId] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [userId, setUserId] = useState("");
  const [subDepartment, setSubDepartment] = useState("");
  const [subDepartmentId, setSubDepartmentId] = useState("");
  const [teamDepartment, setTeamDepartment] = useState("");
  const [teamDepartmentId, setTeamDepartmentId] = useState("");
  const [individualDepartment, setIndividualDepartment] = useState("");
  const [individaulDepartmentId, setIndividualDepartmentId] = useState("");
  const [password, setPassword] = useState("");
  const [Role_Name, setRoleName] = useState("");
  const [Hierarchy, setHierarchy] = useState("");
  const [objective, setObjective] = useState("");
  const [kpiName, setKpiName] = useState("");
  const [kpiWeight, setKpiWeight] = useState("");
  const [kpiTarget, setKpiTarget] = useState("");
  const [kpiQ1Target, setKpiQ1Target] = useState("");
  const [kpiQ2Target, setKpiQ2Target] = useState("");
  const [kpiQ3Target, setKpiQ3Target] = useState("");
  const [kpiQ4Target, setKpiQ4Target] = useState("");
  const [perspective, setPerspective] = useState("");
  const [perspectiveWeight, setPerspectiveWeight] = useState("");
  const [objectiveWeight, setObjectiveWeight] = useState("");
  const [kpiUnitMeasurement, setKpiUnitMeasurement] = useState("");
  const [pageType, setPageType] = useState(location.state.page);
  const [ceoPerspective, setCeoPerspective] = useState([]);
  const [ceoPerspectiveId, setCeoPerspectiveId] = useState("");
  const [ceoObjective, setCeoObjective] = useState([]);
  const [ceoObjectiveId, setCeoObjectiveId] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const {
    useTeamDepartments,
    useIndividualDepartments,
    useUsers,
    usePerspectives,
    useObjectives,
    useroles,
    usedepartments,
    useSubDepartments,
    addDepartment,
    addSubDepartment,
    addTeamDepartment,
    addIndividualDepartment,
    addRoles,
    addUsers,
    updateDepartment,
    updateSubDepartment,
    updateTeamDepartment,
    updateIndividualDepartment,
    updateRoles,
    updateUsers,
    urlKEY,
  } = useAPI();
  const [url, setUrl] = useState("");
  const perspUrl = `http://10.1.177.61:5003/bsc/perspective/${urlKEY}/`;
  const objUrl = `http://10.1.177.61:5003/bsc/objective/${urlKEY}/`;

  const kpiUrl = `http://10.1.177.61:5003/bsc/kpi/${urlKEY}/`;
  // const [perspectiveExists, setPerspectiveExists] = useState(false);
  // const [objExists, setObjExists] = useState(false);

  useEffect(() => {
    fetch(perspUrl)
      .then((response) => response.json())
      .then((res) => {
        setCeoPerspective(res);
        index !== "" &&
          res
            .filter(
              (perspectives) =>
                perspectives.perspective_id === kpis[index].perspective
            )
            .map((perspective) => setPerspective(perspective.perspective_name));
      })
      .catch((error) => {
        console.log(error);
      });

    fetch(objUrl)
      .then((response) => response.json())
      .then((res) => {
        setCeoObjective(res);
        index !== "" &&
          res
            .filter(
              (objectives) => objectives.objective_id === kpis[index].objective
            )
            .map((objective) => setObjective(objective.objective_name));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (DashboardPage === "dept") {
      setDepartment(index !== "" ? kpis[index].dept_name : "");
    } else if (DashboardPage === "subDept") {
      setSubDepartment(index !== "" ? kpis[index].name : "");
      setDepartmentId(index !== "" ? kpis[index].department : "");
      index !== "" &&
        usedepartments
          .filter(
            (departments) => departments.dept_id === kpis[index].department
          )
          .map((department) => {
            setDepartment(department.dept_name);
          });
    } else if (DashboardPage === "sub-subDept") {
      setTeamDepartment(index !== "" ? kpis[index].name : "");
      setSubDepartmentId(index !== "" ? kpis[index].subdepartment : "");
      index !== "" &&
        useSubDepartments
          .filter(
            (subdepartments) => subdepartments.id === kpis[index].subdepartment
          )
          .map((subdepartment) => {
            setSubDepartment(subdepartment.name);
          });
    } else if (DashboardPage === "individualDep") {
      setIndividualDepartment(index !== "" ? kpis[index].name : "");
      setTeamDepartmentId(index !== "" ? kpis[index].sub_subdepartment : "");
      index !== "" &&
        useTeamDepartments
          .filter(
            (teamDepartments) =>
              teamDepartments.id === kpis[index].sub_subdepartment
          )
          .map((teamDepartment) => {
            setTeamDepartment(teamDepartment.name);
          });
    } else if (DashboardPage === "role") {
      setRoleName(index !== "" ? kpis[index].role_name : "");
      setHierarchy(index !== "" ? kpis[index].hierarchy : "");
    } else if (DashboardPage === "user") {
      setUsername(index !== "" ? kpis[index].username : "");
      setFirstName(index !== "" ? kpis[index].first_name : "");
      setLastName(index !== "" ? kpis[index].last_name : "");
      setRoleId(index !== "" ? kpis[index].role : "");
      index !== "" &&
        useroles
          .filter((roles) => roles.role_id === kpis[index].role)
          .map((role) => {
            setRole(role.role_name);
          });
      setDepartmentId(index !== "" ? kpis[index].department : "");
      index !== "" &&
        usedepartments
          .filter(
            (departments) => departments.dept_id === kpis[index].department
          )
          .map((department) => {
            setDepartment(department.dept_name);
          });
      setSubDepartmentId(index !== "" ? kpis[index].subdepartment : "");
      index !== "" &&
        useSubDepartments
          .filter(
            (subdepartments) => subdepartments.id === kpis[index].subdepartment
          )
          .map((subdepartment) => {
            setSubDepartment(subdepartment.name);
          });
      setTeamDepartmentId(index !== "" ? kpis[index].sub_subdepartment : "");
      index !== "" &&
        useTeamDepartments
          .filter(
            (teamDepartments) =>
              teamDepartments.id === kpis[index].sub_subdepartment
          )
          .map((teamDepartment) => {
            setTeamDepartment(teamDepartment.name);
          });
      setIndividualDepartmentId(index !== "" ? kpis[index].individuals : "");
      index !== "" &&
        useIndividualDepartments
          .filter(
            (individualDepartments) =>
              individualDepartments.id === kpis[index].individuals
          )
          .map((individualDepartment) => {
            setIndividualDepartment(individualDepartment.name);
          });
    } else if (DashboardPage === "persp") {
      console.log(kpis);
      setPerspective(index !== "" ? kpis[index].perspective_name : "");
      setPerspectiveWeight(
        index !== "" ? parseFloat(kpis[index].perspective_weight) * 100 : ""
      );
      setUserId(index !== "" ? kpis[index].user : "");
      index !== "" &&
        useUsers
          .filter((users) => users.id === kpis[index].user)
          .map((user) => setUsername(user.username));
    } else if (DashboardPage === "obj") {
      setObjective(index !== "" ? kpis[index].objective_name : "");
      setObjectiveWeight(
        index !== "" ? parseFloat(kpis[index].objective_weight) * 100 : ""
      );
      setCeoPerspectiveId(index !== "" ? kpis[index].perspective : "");
      setUserId(index !== "" ? kpis[index].user : "");
      index !== "" &&
        useUsers
          .filter((users) => users.id === kpis[index].user)
          .map((user) => setUsername(user.username));
    } else if (DashboardPage === "kpi") {
      setKpiName(index !== "" ? kpis[index].kpi_name : "");
      setKpiWeight(
        index !== "" ? parseFloat(kpis[index].kpi_weight) * 100 : ""
      );
      setKpiTarget(
        index !== ""
          ? kpis[index].kpi_unit_measurement === "Percentage"
            ? parseFloat(kpis[index].kpi_target) * 100
            : kpis[index].kpi_target
          : ""
      );
      setKpiQ1Target(
        index !== ""
          ? kpis[index].kpi_unit_measurement === "Percentage"
            ? parseFloat(kpis[index].kpi_q1)
            : kpis[index].kpi_q1
          : ""
      );
      setKpiQ2Target(
        index !== ""
          ? kpis[index].kpi_unit_measurement === "Percentage"
            ? parseFloat(kpis[index].kpi_q2)
            : kpis[index].kpi_q2
          : ""
      );
      setKpiQ3Target(
        index !== ""
          ? kpis[index].kpi_unit_measurement === "Percentage"
            ? parseFloat(kpis[index].kpi_q3)
            : kpis[index].kpi_q3
          : ""
      );
      setKpiQ4Target(
        index !== ""
          ? kpis[index].kpi_unit_measurement === "Percentage"
            ? parseFloat(kpis[index].kpi_q4)
            : kpis[index].kpi_q4
          : ""
      );
      setKpiUnitMeasurement(
        index !== "" ? kpis[index].kpi_unit_measurement : ""
      );
      setCeoPerspectiveId(index !== "" ? kpis[index].perspective : "");
      setCeoObjectiveId(index !== "" ? kpis[index].objective : "");
      setUserId(index !== "" ? kpis[index].user : "");
      index !== "" &&
        useUsers
          .filter((users) => users.id === kpis[index].user)
          .map((user) => setUsername(user.username));
    }
  }, []);

  // useEffect(() => {
  //   setPerspectiveExists(false);
  //   usePerspectives.map((perspectives) => {
  //     if (perspectives.perspective_name === perspective) {
  //       setPerspectiveExists(true);
  //     }
  //   })
  // }, [perspective])


  // useEffect(() => {
  //   setObjExists(false);
  //   useObjectives.map((objec) => {
  //     if (objec.objective_name === objective) {
  //       setObjExists(true);
  //     }
  //   })
  // }, [objective])


  const handleAdd = () => {
    if (DashboardPage === "dept") {
      const dept = {
        dept_name: department,
      };
      axios
        .post("http://10.1.177.61:5003/core/department/", dept)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          // HandleSuccess();
          // alert("Department ADDED Successfully");
          setDepartment("");
          HandleSuccess("Department");
          console.log(data);
          addDepartment(data.dept_id, data.dept_name);
        })

        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            HandleError("network");
          } else {
            HandleError("details");
          }
        });
    } else if (DashboardPage === "subDept") {
      const subDept = {
        name: subDepartment,
        department: departmentId,
      };
      axios
        .post("http://10.1.177.61:5003/core/subdepartment/", subDept)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          setSubDepartment("");
          setDepartmentId("");
          HandleSuccess("SubDepartment");
          console.log(data);
          addSubDepartment(data.id, data.name, data.department);
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            HandleError("network");
          } else {
            HandleError("details");
          }
        });
    } else if (DashboardPage === "sub-subDept") {
      const teamDept = {
        name: teamDepartment,
        subdepartment: subDepartmentId,
      };
      axios
        .post("http://10.1.177.61:5003/core/subsub/", teamDept)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          setTeamDepartment("");
          setSubDepartmentId("");
          HandleSuccess("Team Department");
          console.log(data);
          addTeamDepartment(data.id, data.name, data.subdepartment);
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            HandleError("network");
          } else {
            HandleError("details");
          }
        });
    } else if (DashboardPage === "individualDep") {
      const indiDep = {
        name: individualDepartment,
        sub_subdepartment: teamDepartmentId,
      };
      axios
        .post("http://10.1.177.61:5003/core/individual/", indiDep)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          setIndividualDepartment("");
          setTeamDepartment("");
          HandleSuccess("Individual Department");
          addIndividualDepartment(data.id, data.name, data.sub_subdepartment);
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            HandleError("network");
          } else {
            HandleError("details");
          }
        });
    } else if (DashboardPage === "role") {
      const role = {
        role_name: Role_Name,
        hierarchy: Hierarchy,
      };

      axios
        .post("http://10.1.177.61:5003/core/role/", role)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          setRoleName("");
          setHierarchy("");
          HandleSuccess("Role");
          console.log(data);
          addRoles(data.role_id, data.role_name, data.hierarchy);
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            HandleError("network");
          } else {
            HandleError("details");
          }
        });
    } else if (DashboardPage === "user") {
      const user = {
        first_name: firstName,
        last_name: lastname,
        username: username,
        role: roleId,
        department: departmentId,
        subdepartment: subDepartmentId,
        sub_subdepartment: teamDepartmentId,
        individuals: individaulDepartmentId,
        password: password,
      };
      console.log(user);
      axios
        .post("http://10.1.177.61:5003/core/auth/register/", user)
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          setUsername("");
          setFirstName("");
          setLastName("");
          setRole("");
          setDepartment("");
          setSubDepartment("");
          setTeamDepartment("");
          setIndividualDepartment("");
          HandleSuccess("User");
          console.log(data);
          addUsers(data.user.id, data.user.first_name, data.user.last_name, data.user.username, data.user.role, data.user.department, data.user.subdepartment, data.user.sub_subdepartment, data.user.is_active);
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            HandleError("network");
          } else {
            if (error.response.data.password) {
              HandleError("Password");
            } else {
              HandleError("details");
            }
          }
        });
    } else if (DashboardPage === "persp") {
      const persp = {
        perspective_name: perspective,
        perspective_weight: perspectiveWeight,
        user: userId,
      };
      console.log(persp);

      // if (perspectiveExists) {
      //   HandleError("duplicate");
      // }
      {
        // !perspectiveExists && axios
        axios
          .post(
            `http://10.1.177.61:5003/bsc/perspective/${urlKEY}/`,
            persp
          )
          .then((res) => {
            const data = res.data;
            if (res.status !== 201) {
              const error = (data && data.message) || res.status;
              return Promise.reject(error);
            }

            setPerspective("");
            setPerspectiveWeight("");
            setUserId("");
            HandleSuccess("Perspective");
            console.log(data);
          })
          .catch((error) => {
            if (error.code === "ERR_NETWORK") {
              HandleError("network");
            } else {
              HandleError("details");
            }
          });
      }
    } else if (DashboardPage === "obj") {
      const objects = {
        objective_name: objective,
        objective_weight: objectiveWeight,
        perspective: ceoPerspectiveId,
        user: userId,
      };
      console.log(objects);
      // if (objExists) {
      //   HandleError("duplicate");
      // }

      {
        // !objExists && axios
        axios
          .post(
            `http://10.1.177.61:5003/bsc/objective/${urlKEY}/`,
            objects
          )
          .then((res) => {
            const data = res.data;
            if (res.status !== 201) {
              const error = (data && data.message) || res.status;
              return Promise.reject(error);
            }

            setObjective("");
            setObjectiveWeight("");
            setPerspective("");
            setUserId("");
            HandleSuccess("Objective");
          })
          .catch((error) => {
            if (error.code === "ERR_NETWORK") {
              HandleError("network");
            } else {
              HandleError("details");
            }
          });
      }
    } else if (DashboardPage === "kpi") {
      const kpi = {
        objective: ceoObjectiveId,
        kpi_name: kpiName,
        kpi_weight: kpiWeight,
        kpi_target: "0",
        kpi_q1: kpiQ1Target,
        kpi_q2: kpiQ2Target,
        kpi_q3: kpiQ3Target,
        kpi_q4: kpiQ4Target,
        perspective: ceoPerspectiveId,
        kpi_unit_measurement: kpiUnitMeasurement,
        user: userId,
      };
      console.log(kpi);
      axios
        .post(kpiUrl, kpi)
        .then((res) => {
          console.log(res);
          const data = res.data;
          if (res.status !== 201) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }

          setObjective("");
          setKpiName("");
          setKpiWeight("");
          setKpiTarget("");
          setKpiQ1Target("");
          setKpiQ2Target("");
          setKpiQ3Target("");
          setKpiQ4Target("");
          setPerspective("");
          setKpiUnitMeasurement("");
          HandleSuccess("KPI");
          console.log(data);
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            HandleError("network");
          } else {
            HandleError("details");
          }
        });
    }
  };
  const handleSave = () => {
    if (DashboardPage === "dept") {
      const dept = {
        dept_name: department,
      };
      axios
        .put(
          `http://10.1.177.61:5003/core/department/${kpis[index].dept_id}/`,
          dept
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 200) {
            console.log(data);
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }

          setDepartment("");
          HandleSuccessUpdate("Department");
          console.log(data);
          const dept_id = data.dept_id;
          const dept_name = data.dept_name;
          updateDepartment(dept_id, { dept_id, dept_name });
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            HandleError("network");
          } else {
            HandleError("details");
          }
        });
    } else if (DashboardPage === "subDept") {
      const subDept = {
        name: subDepartment,
        department: departmentId,
      };
      axios
        .put(
          `http://10.1.177.61:5003/core/subdepartment_detail/${kpis[index].id}/`,
          subDept
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 200) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          setSubDepartment("");
          setDepartmentId("");
          HandleSuccessUpdate("Subdepartment");
          console.log(data);
          const id = data.id;
          const name = data.name;
          const department = data.department;
          updateSubDepartment(id, { id, name, department });
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            HandleError("network");
          } else {
            HandleError("details");
          }
        });
    } else if (DashboardPage === "sub-subDept") {
      const teamDept = {
        name: teamDepartment,
        subdepartment: subDepartmentId,
      };
      axios
        .put(
          `http://10.1.177.61:5003/core/subsub/${kpis[index].id}/`,
          teamDept
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 200) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          setTeamDepartment("");
          setSubDepartmentId("");
          HandleSuccessUpdate("Team Department");
          console.log(data);
          const id = data.id;
          const name = data.name;
          const subdepartment = data.subdepartment;
          updateTeamDepartment(id, { id, name, subdepartment });
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            HandleError("network");
          } else {
            HandleError("details");
          }
        });
    } else if (DashboardPage === "individualDep") {
      const indiDep = {
        name: individualDepartment,
        sub_subdepartment: teamDepartmentId,
      };
      axios
        .put(
          `http://10.1.177.61:5003/core/individual/${kpis[index].id}/`,
          indiDep
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 201) {
            console.log(res);
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          setIndividualDepartment("");
          setTeamDepartment("");
          HandleSuccessUpdate("Individual Department");
          const id = data.id;
          const name = data.name;
          const sub_subdepartment = data.sub_subdepartment;
          console.log(data);
          updateIndividualDepartment(id, { id, name, sub_subdepartment });
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            HandleError("network");
          } else {
            HandleError("details");
          }
        });
    } else if (DashboardPage === "role") {
      const role = {
        role_name: Role_Name,
        hierarchy: Hierarchy,
      };
      axios
        .put(
          `http://10.1.177.61:5003/core/role_detail/${kpis[index].role_id}/`,
          role
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 200) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          setRoleName("");
          setHierarchy("");
          HandleSuccessUpdate("Role");
          console.log(data);
          const role_id = data.role_id;
          const role_name = data.role_name;
          const hierarchy = data.hierarchy;
          updateRoles(role_id, { role_id, role_name, hierarchy });
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            HandleError("network");
          } else {
            HandleError("details");
          }
        });
    } else if (DashboardPage === "user") {
      const user = {
        first_name: firstName,
        last_name: lastname,
        username: username,
        role: roleId,
        department: departmentId,
        subdepartment: subDepartmentId,
        sub_subdepartment: teamDepartmentId,
        individuals: individaulDepartmentId,
      };
      console.log(user);
      axios
        .put(
          `http://10.1.177.61:5003/core/user/${kpis[index].id}/`,
          user
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 200) {
            console.log(res);
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          setUsername("");
          setFirstName("");
          setLastName("");
          setRole("");
          setDepartment("");
          setSubDepartment("");
          setTeamDepartment("");
          setIndividualDepartment("");
          console.log(res);
          HandleSuccessUpdate("User");
          const id = data.id;
          const first_name = data.first_name;
          const last_name = data.last_name;
          const username = data.username;
          const role = data.role;
          const department = data.department;
          const subdepartment = data.subdepartment;
          const sub_subdepartment = data.sub_subdepartment;
          const is_active = data.is_active;
          updateUsers(id, { id, first_name, last_name, username, role, department, subdepartment, sub_subdepartment, is_active })
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "ERR_NETWORK") {
            HandleError("network");
          } else {
            HandleError("details");
          }
        });
    } else if (DashboardPage === "persp") {
      const persp = {
        perspective_name: perspective,
        perspective_weight: perspectiveWeight,
        user: userId,
      };
      // if (perspectiveExists) {
      //   HandleError("duplicate");
      // }
      {
        // !perspectiveExists && axios
        axios
          .put(
            `http://10.1.177.61:5003/bsc/perspective/${kpis[index].perspective_id}/`,
            persp
          )
          .then((res) => {
            const data = res.data;
            if (res.status !== 200) {
              const error = (data && data.message) || res.status;
              return Promise.reject(error);
            }
            setPerspective("");
            setPerspectiveWeight("");
            setUserId("");
            HandleSuccessUpdate("Perspective");
          })
          .catch((error) => {
            if (error.code === "ERR_NETWORK") {
              HandleError("network");
            } else {
              HandleError("details");
            }
          });
      }
    } else if (DashboardPage === "obj") {
      const obj = {
        objective_name: objective,
        objective_weight: objectiveWeight,
        perspective: ceoPerspectiveId,
        user: userId,
      };
      // if (objExists) {
      //   HandleError("duplicate");
      // }

      {
        // !objExists && axios
        axios
          .put(
            `http://10.1.177.61:5003/bsc/objective/${kpis[index].objective_id}/`,
            obj
          )
          .then((res) => {
            const data = res.data;
            if (res.status !== 200) {
              const error = (data && data.message) || res.status;
              return Promise.reject(error);
            }
            setObjective("");
            setObjectiveWeight("");
            setPerspective("");
            setUserId("");
            HandleSuccessUpdate("Objective");
          })
          .catch((error) => {
            if (error.code === "ERR_NETWORK") {
              HandleError("network");
            } else {
              HandleError("details");
            }
          });
      }
    } else if (DashboardPage === "kpi") {
      const kpi = {
        objective: ceoObjectiveId,
        kpi_name: kpiName,
        kpi_weight: kpiWeight,
        kpi_target: "0",
        kpi_q1: kpiQ1Target,
        kpi_q2: kpiQ2Target,
        kpi_q3: kpiQ3Target,
        kpi_q4: kpiQ4Target,
        perspective: ceoPerspectiveId,
        kpi_unit_measurement: kpiUnitMeasurement,
        user: userId,
      };
      console.log(kpi);
      axios
        .put(
          `http://10.1.177.61:5003/bsc/kpi/${kpis[index].kpi_id}/`,
          kpi
        )
        .then((res) => {
          const data = res.data;
          if (res.status !== 200) {
            console.log(res);
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          }
          setObjective("");
          setKpiName("");
          setKpiWeight("");
          setKpiTarget("");
          setKpiQ1Target("");
          setKpiQ2Target("");
          setKpiQ3Target("");
          setKpiQ4Target("");
          setPerspective("");
          setKpiUnitMeasurement("");
          HandleSuccessUpdate("KPI");
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            HandleError("network");
          } else {
            HandleError("details");
          }
        });
    }
  };

  const handleDelete = () => {
    // setDepartmentName('');
    // fetch(`https://bsc-newapi.herokuapp.com/core/department/`)
    //   .then((res) => {
    //     const data = res.json();
    //     if (!res.ok) {
    //       const error = (data && data.message) || res.status;
    //       return Promise.reject(error);
    //     }
    //     alert('Delete Successful');
    //   })
    //   .catch((error) => {
    //     alert('There was an error!', error);
    //   });
  };

  const HandleError = (type) => {
    if (type === "details") {
      toast.error("Please Fill all the required fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (type === "network") {
      toast.error("Please check your network and try again", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else if (type === "duplicate") {
      toast.error("Already exists", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (type === "Password") {
      toast.error("Password must be atleast 8 characters", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const HandleSuccess = (name) => {
    toast.success(`${name} Added Successfully`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => navigate(-1),
    });
  };
  const HandleSuccessUpdate = (name) => {
    toast.success(`${name} Updated Successfully`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => navigate(-1),
    });
  };

  const handlePerspectiveChange = (e) => {
    setPerspective(e.target.value);
    if (e.target.value === "select") {
      setCeoPerspectiveId("Select");
    }
    ceoPerspective
      .filter((persp) => persp.perspective_name === e.target.value)
      .map((p) => setCeoPerspectiveId(p.perspective_id));

    setCeoObjectiveId("");
  };
  const handleObjectiveChange = (e) => {
    setObjective(e.target.value);
    if (e.target.value === "select") {
      setCeoObjectiveId("Select");
    }
    ceoObjective
      .filter((objective) => objective.objective_name === e.target.value)
      .map((obj) => setCeoObjectiveId(obj.objective_id));
  };

  const handleUserChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value === "select") {
      setUserId("Select");
    }
    useUsers
      .filter((user) => user.username === e.target.value)
      .map((us) => setUserId(us.id));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    if (e.target.value === "select") {
      setRoleId("Select");
    }
    useroles
      .filter((rol) => rol.role_name === e.target.value)
      .map((r) => setRoleId(r.role_id));

    setDepartment("select");
    setTeamDepartment("select");
    setIndividualDepartment("select");
    setSubDepartment("select");
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    if (e.target.value === "select") {
      setDepartmentId("Select");
    }
    usedepartments
      .filter((dep) => dep.dept_name === e.target.value)
      .map((d) => setDepartmentId(d.dept_id));
    setSubDepartmentId("");
    setTeamDepartmentId("");
    setIndividualDepartmentId("");
    if (DashboardPage !== "subDept") {
      setSubDepartment("select");
    }
    setTeamDepartment("select");
    setIndividualDepartment("select");
  };

  const handleSubDepartmentChange = (e) => {
    setSubDepartment(e.target.value);
    if (e.target.value === "select") {
      setSubDepartmentId("Select");
    }
    useSubDepartments
      .filter((subDep) => subDep.name === e.target.value)
      .map((sub) => setSubDepartmentId(sub.id));
    setTeamDepartmentId("");
    setIndividualDepartmentId("");
    if (DashboardPage !== "sub-subDept") {
      setTeamDepartment("select");
    }
    setIndividualDepartment("select");
  };
  const handleTeamDepartmentChange = (e) => {
    setTeamDepartment(e.target.value);
    if (e.target.value === "select") {
      setTeamDepartmentId("Select");
    }
    useTeamDepartments
      .filter((teamDep) => teamDep.name === e.target.value)
      .map((td) => setTeamDepartmentId(td.id));
    setIndividualDepartmentId("");
    if (DashboardPage !== "individualDep") {
      setIndividualDepartment("select");
    }
  };
  const handleIndividualDepartmentChange = (e) => {
    setIndividualDepartment(e.target.value);
    if (e.target.value === "select") {
      setIndividualDepartmentId("Select");
    }
    useIndividualDepartments
      .filter((teamDep) => teamDep.name === e.target.value)
      .map((td) => setIndividualDepartmentId(td.id));
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <div className="Container">
      <div className="header">
        {pageType !== "ADD" && DashboardPage === "dept"
          ? "Edit Process"
          : DashboardPage === "dept"
            ? "Add Process"
            : null}
        {pageType !== "ADD" && DashboardPage === "subDept"
          ? "Edit Sub-Process"
          : DashboardPage === "subDept"
            ? "Add Sub-Process"
            : null}
        {pageType !== "ADD" && DashboardPage === "sub-subDept"
          ? "Edit Head Office Team / Branch"
          : DashboardPage === "sub-subDept"
            ? "Add Head Office Team / Branch"
            : null}
        {pageType !== "ADD" && DashboardPage === "individualDep"
          ? "Edit Position"
          : DashboardPage === "individualDep"
            ? "Add Position"
            : null}
        {pageType !== "ADD" && DashboardPage === "user"
          ? "Edit User"
          : DashboardPage === "user"
            ? "Add User"
            : null}
        {pageType !== "ADD" && DashboardPage === "role"
          ? "Edit Role"
          : DashboardPage === "role"
            ? "Add Role"
            : null}
        {pageType !== "ADD" && DashboardPage === "obj"
          ? "Edit Objective"
          : DashboardPage === "obj"
            ? "Add Objective"
            : null}
        {pageType !== "ADD" && DashboardPage === "persp"
          ? "Edit Perspective"
          : DashboardPage === "persp"
            ? "Add Perspective"
            : null}

        <div>
          {pageType !== "ADD" && DashboardPage === "kpi"
            ? "Edit KPI"
            : DashboardPage === "kpi"
              ? "Add KPI"
              : null}
        </div>
      </div>

      <div className="InputContainer">
        <form
          onSubmit={handleSubmit(pageType === "ADD" ? handleAdd : handleSave)}
        >
          {DashboardPage === "dept" && (
            <>
              <div>
                <span> Process: </span>
                <input
                  className="DeptInput"
                  type="text"
                  onChange={(e) => setDepartment(e.target.value)}
                  value={department}
                />
              </div>
            </>
          )}
          {DashboardPage === "subDept" && (
            <>
              <div>
                <span> Sub-Process: </span>
                <input
                  className="DeptInput"
                  type="text"
                  onChange={(e) => setSubDepartment(e.target.value)}
                  value={subDepartment}
                />
              </div>

              <div>
                <span> Process: </span>

                <select
                  id="subDepartment"
                  name="message"
                  value={department}
                  onChange={(e) => handleDepartmentChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {usedepartments.map((dep, index) => (
                    <option key={index} value={dep.dept_name}>
                      {dep.dept_name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {DashboardPage === "sub-subDept" && (
            <>
              <div>
                <span> Head Office Team / Branch: </span>
                <input
                  className="DeptInput"
                  type="text"
                  onChange={(e) => setTeamDepartment(e.target.value)}
                  value={teamDepartment}
                />
              </div>

              <div>
                <span> Sub-Process:: </span>

                <select
                  id="subDepartment"
                  name="message"
                  value={subDepartment}
                  onChange={(e) => handleSubDepartmentChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {useSubDepartments.map((dep, index) => (
                    <option key={index} value={dep.name}>
                      {dep.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {DashboardPage === "individualDep" && (
            <>
              <div>
                <span> Position: </span>
                <input
                  className="DeptInput"
                  type="text"
                  onChange={(e) => setIndividualDepartment(e.target.value)}
                  value={individualDepartment}
                />
              </div>

              <div>
                <span> Head Office Team / Branch: </span>

                <select
                  id="subDepartment"
                  name="message"
                  onChange={(e) => handleTeamDepartmentChange(e)}
                  value={teamDepartment}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {useTeamDepartments.map((teamDep, index) => (
                    <option key={index} value={teamDep.name}>
                      {teamDep.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {DashboardPage === "role" && (
            <div className="InputFields">
              <div>
                <span> Role Name: </span>
                <input
                  className="RoleInput"
                  onChange={(e) => setRoleName(e.target.value)}
                  value={Role_Name}
                />
              </div>

              <div>
                <span> Hierarchy: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  style={{ width: "50px" }}
                  onChange={(e) => setHierarchy(e.target.value)}
                  value={Hierarchy}
                />
              </div>
            </div>
          )}

          {DashboardPage === "user" && (
            <div className="InputFields">
              <div>
                <span> UserName: </span>
                <input
                  className="UserInput"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>

              <div>
                <span> First Name: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>

              <div>
                <span> Last Name: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastname}
                />
              </div>

              <div>
                <span> Role: </span>

                <select
                  id="userRole"
                  value={role}
                  onChange={(e) => handleRoleChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {useroles.map((role, index) => (
                    <option key={index} value={role.role_name}>
                      {role.role_name}
                    </option>
                  ))}
                </select>
              </div>

              {role === "Vice President" && (
                <>
                  <div>
                    <span> Process: </span>
                    <select
                      id="userDepartment"
                      value={department}
                      onChange={(e) => handleDepartmentChange(e)}
                    >
                      <option key="select" value="select">
                        Select
                      </option>
                      {usedepartments.map((dep, index) => (
                        <option key={index} value={dep.dept_name}>
                          {dep.dept_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {role === "director" && (
                <>
                  <div>
                    <span> Process: </span>
                    <select
                      id="userDepartment"
                      value={department}
                      onChange={(e) => handleDepartmentChange(e)}
                    >
                      <option key="select" value="select">
                        Select
                      </option>
                      {usedepartments.map((dep, index) => (
                        <option key={index} value={dep.dept_name}>
                          {dep.dept_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span> Sub-Process: </span>
                    <select
                      id="userSubDepartment"
                      value={subDepartment}
                      onChange={(e) => handleSubDepartmentChange(e)}
                    >
                      <option key="select" value="select">
                        Select
                      </option>
                      {useSubDepartments
                        .filter((sub) => sub.department === departmentId)
                        .map((subDep, index) => (
                          <option key={index} value={subDep.name}>
                            {subDep.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </>
              )}
              {role === "Manager" && (
                <>
                  <div>
                    <span> Process: </span>
                    <select
                      id="userDepartment"
                      value={department}
                      onChange={(e) => handleDepartmentChange(e)}
                    >
                      <option key="select" value="select">
                        Select
                      </option>
                      {usedepartments.map((dep, index) => (
                        <option key={index} value={dep.dept_name}>
                          {dep.dept_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span> Sub-Process: </span>
                    <select
                      id="userSubDepartment"
                      value={subDepartment}
                      onChange={(e) => handleSubDepartmentChange(e)}
                    >
                      <option key="select" value="select">
                        Select
                      </option>
                      {useSubDepartments
                        .filter((sub) => sub.department === departmentId)
                        .map((subDep, index) => (
                          <option key={index} value={subDep.name}>
                            {subDep.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <span> Head Office Team / Branch: </span>
                    <select
                      id="teamDepartment"
                      value={teamDepartment}
                      onChange={(e) => handleTeamDepartmentChange(e)}
                    >
                      <option key="select" value="select">
                        Select
                      </option>
                      {useTeamDepartments
                        .filter((td) => td.subdepartment === subDepartmentId)
                        .map((t, index) => (
                          <option key={index} value={t.name}>
                            {t.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </>
              )}
              {role === "Individuals" && (
                <>
                  <div>
                    <span> Process: </span>
                    <select
                      id="userDepartment"
                      value={department}
                      onChange={(e) => handleDepartmentChange(e)}
                    >
                      <option key="select" value="select">
                        Select
                      </option>
                      {usedepartments.map((dep, index) => (
                        <option key={index} value={dep.dept_name}>
                          {dep.dept_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span> Sub-Process: </span>
                    <select
                      id="userSubDepartment"
                      value={subDepartment}
                      onChange={(e) => handleSubDepartmentChange(e)}
                    >
                      <option key="select" value="select">
                        Select
                      </option>
                      {useSubDepartments
                        .filter((sub) => sub.department === departmentId)
                        .map((subDep, index) => (
                          <option key={index} value={subDep.name}>
                            {subDep.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <span> Head Office Team / Branch: </span>
                    <select
                      id="teamDepartment"
                      value={teamDepartment}
                      onChange={(e) => handleTeamDepartmentChange(e)}
                    >
                      <option key="select" value="select">
                        Select
                      </option>
                      {useTeamDepartments
                        .filter((td) => td.subdepartment === subDepartmentId)
                        .map((t, index) => (
                          <option key={index} value={t.name}>
                            {t.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <span> Position: </span>
                    <select
                      id="individualDepartment"
                      value={individualDepartment}
                      onChange={(e) => handleIndividualDepartmentChange(e)}
                    >
                      <option key="select" value="select">
                        Select
                      </option>
                      {useIndividualDepartments
                        .filter(
                          (id) => id.sub_subdepartment === teamDepartmentId
                        )
                        .map((i, index) => (
                          <option key={index} value={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </>
              )}
              {pageType === "ADD" && (
                <div>
                  <span> Password: </span>
                  <input
                    autoComplete="new-password"
                    id="HierarchyInput"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
              )}
            </div>
          )}

          {DashboardPage === "kpi" && (
            <div className="InputFields">
              <div>
                <span> KPI Name: </span>
                <input
                  className="UserInput"
                  type="text"
                  onChange={(e) => setKpiName(e.target.value)}
                  value={kpiName}
                />
              </div>

              <div>
                <span> KPI Weight: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setKpiWeight(e.target.value)}
                  value={kpiWeight}
                />
              </div>
              <div>
                <span> KPI Q1 Target: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setKpiQ1Target(e.target.value)}
                  value={kpiQ1Target}
                />
              </div>
              <div>
                <span> KPI Q2 Target: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setKpiQ2Target(e.target.value)}
                  value={kpiQ2Target}
                />
              </div>
              <div>
                <span> KPI Q3 Target: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setKpiQ3Target(e.target.value)}
                  value={kpiQ3Target}
                />
              </div>
              <div>
                <span> KPI Q4 Target: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setKpiQ4Target(e.target.value)}
                  value={kpiQ4Target}
                />
              </div>

              <div>
                <span> KPI Unit of Measurement: </span>
                <select
                  id="unitofmeasurement"
                  value={kpiUnitMeasurement}
                  onChange={(e) => setKpiUnitMeasurement(e.target.value)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  <option key="percent" value="Percentage">
                    Percentage
                  </option>
                  <option key="numbers" value="Numbers">
                    Number
                  </option>
                  <option key="etb" value="ETB">
                    ETB
                  </option>
                  <option key="USD" value="USD">
                    USD
                  </option>
                </select>
              </div>

              <div>
                <span> Perspective: </span>
                <select
                  id="kpiPerspective"
                  value={perspective}
                  onChange={(e) => handlePerspectiveChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {ceoPerspective.length !== 0 &&
                    ceoPerspective.map((perspect, index) => (
                      <option key={index} value={perspect.perspective_name}>
                        {perspect.perspective_name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <span> Objective: </span>
                <select
                  id="kpiObjective"
                  value={objective}
                  onChange={(e) => handleObjectiveChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {ceoObjective.length !== 0 &&
                    ceoObjective
                      .filter((obj) => obj.perspective === ceoPerspectiveId)
                      .map((objec, index) => (
                        <option key={index} value={objec.objective_name}>
                          {objec.objective_name}
                        </option>
                      ))}
                </select>
              </div>
              <div>
                <span> User: </span>
                <select
                  id="kpiUser"
                  value={username}
                  onChange={(e) => handleUserChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {useUsers
                    .filter((u) =>
                      filterperspectives.length !== 0
                        ? u.id === filterperspectives[0].user
                        : u.id !== null
                    )
                    .map((user, index) => (
                      <option key={index} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}

          {DashboardPage === "persp" && (
            <div className="InputFields">
              <div>
                <span> Perspective Name: </span>
                <select
                  id="perspectives"
                  value={perspective}
                  onChange={(e) => handlePerspectiveChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  <option value="Financial">Financial</option>
                  <option value="Customer">Customer</option>
                  <option value="Internal Business Process">
                    Internal Business Process
                  </option>
                  <option value="Learning and Growth">
                    Learning and Growth
                  </option>
                </select>
              </div>

              <div>
                <span> Perspective Weight: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setPerspectiveWeight(e.target.value)}
                  value={perspectiveWeight}
                />
              </div>

              <div>
                <span> User: </span>
                <select
                  id="objUsers"
                  value={username}
                  onChange={(e) => handleUserChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {useUsers
                    .filter((u) =>
                      filterperspectives.length !== 0
                        ? u.id === filterperspectives[0].user
                        : u.id !== null
                    )
                    .map((user, index) => (
                      <option key={index} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}

          {DashboardPage === "obj" && (
            <div className="InputFields">
              <div>
                <span> Objective Name: </span>
                <input
                  className="UserInput"
                  type="text"
                  onChange={(e) => handleObjectiveChange(e)}
                  value={objective}
                />
              </div>

              <div>
                <span> Objective Weight: </span>
                <input
                  id="HierarchyInput"
                  type="text"
                  onChange={(e) => setObjectiveWeight(e.target.value)}
                  value={objectiveWeight}
                />
              </div>

              <div>
                <span> Perspective: </span>

                <select
                  id="objPerspective"
                  value={perspective}
                  onChange={(e) => handlePerspectiveChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {ceoPerspective.map((perspect, index) => (
                    <option key={index} value={perspect.perspective_name}>
                      {perspect.perspective_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span> User: </span>

                <select
                  id="objUsers"
                  value={username}
                  onChange={(e) => handleUserChange(e)}
                >
                  <option key="select" value="select">
                    Select
                  </option>
                  {useUsers
                    .filter((u) =>
                      filterperspectives.length !== 0
                        ? u.id === filterperspectives[0].user
                        : u.id !== null
                    )
                    .map((user, index) => (
                      <option key={index} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}

          <div className="btnArrange">
            {pageType === "ADD" && (
              <button className="btn saveadd">
                <AddCircleOutlineOutlinedIcon />
                ADD
              </button>
            )}
            {pageType !== "ADD" && (
              <button className="btn saveadd">
                <SaveAsOutlinedIcon /> SAVE
              </button>
            )}

            {false && (
              <button className="btn delete">
                <DeleteForeverOutlinedIcon />
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
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
  );
};
export default EditDept;
