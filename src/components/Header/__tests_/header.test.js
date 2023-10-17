import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../header";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore();

describe("Header Component", () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      ui: {
        signinVisible: true,
        signOutVisisble: false,
        adminLogged: false,
      },
    };
    store = mockStore(initialState);
  });

  it("renders the Header component correctly", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText("Banner - ads")).toBeInTheDocument();
  });

  it("displays Sign in button", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it("displays Sign out button", () => {
    initialState.ui.signinVisible = false;
    initialState.ui.signOutVisisble = true;
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText("Sign out")).toBeInTheDocument();
  });
});
