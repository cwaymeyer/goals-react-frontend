import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import getMonthsFromNow from "../helpers/getMonthsFromNow";
import {
  Container,
  Box,
  Grid,
  Button,
  FormControl,
  Select,
  InputLabel,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";

function NewGoalForm({ createGoal }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const initialState = {
    name: "",
    target_weight: "",
    timeline: 0,
  };

  const [formData, setFormData] = useState(initialState);

  /** Generate goal data from form data
   *
   * Returns { name, username, start_weight, target_weight, timeline, start_date, end_date }
   */
  function setGoalData(data) {
    let goalData = {};

    goalData.name = data.name;
    goalData.username = currentUser.username;
    goalData.start_weight = null;
    goalData.target_weight = data.target_weight;

    let { current_date, target_date } = getMonthsFromNow(data.timeline);
    goalData.timeline = data.timeline;
    goalData.start_date = current_date;
    goalData.end_date = target_date;

    return goalData;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let goalData = setGoalData(formData);
    await createGoal(goalData);
    navigate("/home");
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 5, mb: -2 }}>
        <h1>Set a new goal 🏋️‍♀️</h1>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container p={3}>
          <Grid item xs={12} my={1}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              id="outlined-basic"
              sx={{ width: 1 / 1 }}
            />
          </Grid>
          <Grid item xs={6} my={1} pr={1}>
            <TextField
              label="Target weight"
              name="target_weight"
              value={formData.target_weight}
              onChange={handleChange}
              id="outlined-end-adornment"
              sx={{ width: 1 / 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">lb</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} my={1} pl={1}>
            <FormControl fullWidth>
              <InputLabel id="timeline-btn">Timeline</InputLabel>
              <Select
                labelId="timeline-btn-label"
                name="timeline"
                label="Timeline"
                onChange={handleChange}
                id="timeline-btn"
                sx={{ width: 1 / 1 }}
                size="large"
              >
                <MenuItem value={3}>3 months</MenuItem>
                <MenuItem value={6}>6 months</MenuItem>
                <MenuItem value={9}>9 months</MenuItem>
                <MenuItem value={12}>1 year</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
            Create goal
          </Button>
          <Button
            variant="text"
            color="secondary"
            onClick={() => navigate("/home")}
            sx={{ mt: 2, ml: 2 }}
          >
            Back
          </Button>
        </Grid>
      </form>
    </Container>
  );
}

export default NewGoalForm;
