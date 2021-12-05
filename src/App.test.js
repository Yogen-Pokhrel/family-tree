import { render, fireEvent, act } from '@testing-library/react';
import AddMember from './components/modal/AddMember';


window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};


describe("Add Member component", () => {
  const mockChangeValue = jest.fn();
  const handleFormSubmit = () => {
    
  }
  const getMembers = () => {
    return {};
  }
  const getPartnersOfMember = () => {

  }

  it("shows all required input fields with empty values", () => {
    const mockSetOpen = jest.fn();
    const { getByTestId,queryAllByTestId } = render(
      <AddMember
      handleFormSubmit={handleFormSubmit}
      getMembers={getMembers}
      getPartnersOfMember={getPartnersOfMember}
      />
    );
    //check for initial values of forms
    fireEvent.click(getByTestId('modal_open_button'));

    expect(getByTestId("test_name").value).toBe("");
    expect(getByTestId("test_gender").value).toBe(undefined);
    expect(getByTestId("test_relationType").value).toBe(undefined);
    expect(getByTestId("test_pid").value).toBe(undefined);

    fireEvent.change(getByTestId("test_name"), { target: { value: 'Laxmi' } })
    expect(getByTestId("test_name").value).toBe('Laxmi')

  });
})
