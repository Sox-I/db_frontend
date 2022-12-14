/**
 =========================================================
 * Material Dashboard 2 React - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import {useEffect, useState} from "react";
import MDButton from "../../components/MDButton";
import Icon from "@mui/material/Icon";
import MDInput from "../../components/MDInput";
import {getToken, hasToken} from "../../utils/localtoken";
import Autocomplete from "@mui/material/Autocomplete";

// Data
const Author = ({name}) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
                {name}
            </MDTypography>
        </MDBox>
    </MDBox>
);

function CourseTables() {
    const [rows, setRows] = useState([])
    const [addCourse, setAddCourse] = useState(false);

    const [name, setName] = useState("");
    const [time, setTime] = useState("10:30:00");
    const [duration, setDuration] = useState(0);
    const [coach, setCoach] = useState("");
    const [date, setDate] = useState("2022-12-20");

    const [coachList, setCoachList] = useState([])

    const openAddCoach = () => setAddCourse(!addCourse);

    const columns = [
        {Header: "????????????", accessor: "name", width: "35%", align: "left"},
        {Header: "????????????", accessor: "time", align: "center"},
        {Header: "????????????(h)", accessor: "duration", align: "center"},
        {Header: "??????", accessor: "coach", align: "center"},
        {Header: "??????", accessor: "action", align: "center"}
    ]

    const updateCoachList = () => {
        fetch("http://localhost:8000/coach/")
            .then((res) => res.json())
            .then((data) => {
                if (data.result === "success") {
                    const temp_row = []
                    data.data.forEach((user) => {
                        temp_row.push(user.name)
                    })
                    setCoachList(temp_row)
                }
            })
    }

    const updateCourseList = () => {
        fetch("http://localhost:8000/course/")
            .then((res) => res.json())
            .then((data) => {
                if (data.result === "success") {
                    const temp_row = []
                    data.data.forEach((course) => {
                        const startTime = new Date(course.course_begin);
                        temp_row.push({
                            name: <Author name={course.course_name}/>,
                            time: startTime.toLocaleString('chinese', {hour12: false}),
                            duration: course.course_last,
                            coach: course.coach_name,
                            action: (
                                <MDTypography
                                    onClick={() => handleDelete(course.id)}
                                    variant="caption"
                                    color="error"
                                    fontWeight="medium"
                                    sx={{cursor: "pointer"}}>
                                    ??????
                                </MDTypography>
                            ),
                        })
                    })
                    setRows(temp_row);
                }
            })
    }

    useEffect(() => {
        updateCourseList();
        updateCoachList();

    }, [])

    const handleCreateCourse = () => {
        if (hasToken()) {
            const jwt_token = getToken();
            const data = {
                course_name: name,
                course_begin: date + " " + time,
                course_last: duration,
                coach_name: coach,
            }
            fetch("http://localhost:8000/course/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + jwt_token,
                },
                method: "POST",
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(data => {
                    updateCourseList();
                })
                .then(() => openAddCoach());
        }
    }

    const handleDelete = (id) => {
        if (hasToken()) {
            const jwt_token = getToken();
            fetch("http://localhost:8000/course/" + id + "/", {
                method: "DELETE",
                headers: {
                    'Authorization': "Bearer " + jwt_token,
                }
            }).then(res => updateCourseList())
        }
    }

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white" mt={0.8} sx={{float: "left"}}>
                                    ????????????
                                </MDTypography>
                                <MDBox sx={{float: "right"}}>
                                    <MDButton variant="gradient" color="dark" onClick={openAddCoach}>
                                        <Icon sx={{fontWeight: "bold"}}>add</Icon>
                                        &nbsp;????????????
                                    </MDButton>
                                </MDBox>
                            </MDBox>
                            <MDBox pt={3}>
                                {!addCourse && <DataTable
                                    table={{columns, rows}}
                                    isSorted={true}
                                    showTotalEntries={false}
                                    canSearch={true}
                                    noEndBorder
                                />}
                                {addCourse && <>
                                    <MDBox m={3} display="flex" sx={{justifyContent: 'space-between'}}>
                                        <MDBox display="flex" alignItems="center" py={1} pr={2}>
                                            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                                                ????????????: &nbsp;
                                            </MDTypography>
                                            <MDInput onChange={e => setName(e.target.value)} type="text" label="????????????"
                                                     value={name}/>
                                        </MDBox>
                                        <MDBox display="flex" alignItems="center" py={1} pr={2}>
                                            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                                                ????????????: &nbsp;
                                            </MDTypography>
                                            <MDInput onChange={e => setDate(e.target.value)} type="date"/>
                                            <MDInput onChange={e => setTime(e.target.value)} type="time"/>
                                        </MDBox>
                                        <MDBox display="flex" alignItems="center" py={1} pr={2}>
                                            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                                                ????????????(h): &nbsp;
                                            </MDTypography>
                                            <MDInput onChange={e => setDuration(e.target.value)} type="number"
                                                     label="????????????"/>
                                        </MDBox>
                                        <MDBox display="flex" alignItems="center" py={1} pr={2}>
                                            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                                                ????????????: &nbsp;
                                            </MDTypography>
                                            <Autocomplete
                                                disableClearable
                                                options={coachList}
                                                onChange={(event, newValue) => {
                                                    setCoach(newValue)
                                                }}
                                                sx={{width: "10rem"}}
                                                renderInput={(params) => <MDInput {...params} />}
                                            />
                                        </MDBox>
                                    </MDBox>
                                    <MDBox mx={5} mb={3} display="flex" sx={{justifyContent: 'flex-start'}}>
                                        <MDButton variant="gradient" color="success" mr={2}
                                                  onClick={handleCreateCourse}>
                                            <Icon sx={{fontWeight: "bold"}}>check</Icon>
                                            &nbsp;????????????
                                        </MDButton>
                                        <MDButton variant="gradient" color="error" onClick={openAddCoach}>
                                            <Icon sx={{fontWeight: "bold"}}>close</Icon>
                                            &nbsp;????????????
                                        </MDButton>
                                    </MDBox>
                                </>
                                }
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer/>
        </DashboardLayout>
    );
}

export default CourseTables;
