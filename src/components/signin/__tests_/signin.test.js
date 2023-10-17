import { render, screen } from "@testing-library/react";
import Signin from "../signin";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../../store";

describe("Login Component", () => {
  test("should render Signin correctly", () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Signin />
        </PersistGate>
      </Provider>
    );
    const signInElement = screen.getByRole("heading");
    expect(signInElement).toBeInTheDocument();
  });

});
