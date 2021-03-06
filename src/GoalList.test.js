import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "./testUtils";
import GoalList from "./GoalList";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <GoalList />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <GoalList />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
