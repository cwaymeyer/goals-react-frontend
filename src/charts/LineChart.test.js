import { render } from "@testing-library/react";
import { goal } from "../testUtils";
import LineChart from "./LineChart";

global.ResizeObserver = require("resize-observer-polyfill");

it("renders without crashing", function () {
  const setProgressData = jest.fn();
  render(<LineChart goalData={goal} setProgressData={setProgressData} />);
});

it("matches snapshot", function () {
  const setProgressData = jest.fn();
  const { asFragment } = render(
    <LineChart goalData={goal} setProgressData={setProgressData} />
  );
  expect(asFragment()).toMatchSnapshot();
});
