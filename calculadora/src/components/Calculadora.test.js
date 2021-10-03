import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event"
import Calculadora from './Calculadora';

test('The app renders! Calculadora clear button is on the screen', () => {
  render(<Calculadora />);
  const linkElement = screen.getByText(/clear/i);
  expect(linkElement).toBeInTheDocument();
});


test('It should not accept multiple zeros at the begning of the operaton part', () => {
	render(<Calculadora/>);

	// screen.getByRole('');
	// userEvent.type()
	const buttonNumberZero = screen.getByRole('button', {name: /0/i})
	fireEvent.click(buttonNumberZero)
	fireEvent.click(buttonNumberZero)
	// expect(document.querySelector('#display')).toHaveTextContent('0')
	expect(document.querySelector('#display').textContent).toBe('0  ')
})

test('It should not accept multiple dots at the operation part', () => {
	render(<Calculadora/>);
	// screen.getByRole('');
	// userEvent.type()
	const buttonDecimal = screen.getByRole('button', {name: /\./i})
	fireEvent.click(buttonDecimal)
	fireEvent.click(buttonDecimal)
	// expect(document.querySelector('#display')).toHaveTextContent('.')
	expect(document.querySelector('#display').textContent).toBe('.  ')
	// expect(document.querySelector('#display').textContent).toEqual('.')
})

test('It should perform multiple operations followed one by one', () => {
	render(<Calculadora/>);
	// screen.getByRole('');
	// userEvent.type()
	const buttonThree = screen.getByRole('button', {name: /3/i})
	const buttonFour = screen.getByRole('button', {name: /4/i})
	const buttonAdd = screen.getByRole('button', {name: /\+/i})
	const buttonMinus = screen.getByRole('button', {name: /-/i})
	const buttonMultiply = screen.getByRole('button', {name: /\*/i})
	const buttonEquals = screen.getByRole('button', {name: /=/i})

	fireEvent.click(buttonThree)
	fireEvent.click(buttonAdd)
	fireEvent.click(buttonFour)
	fireEvent.click(buttonMultiply)
	fireEvent.click(buttonThree)
	fireEvent.click(buttonMinus)
	fireEvent.click(buttonFour)
	fireEvent.click(buttonEquals)
	expect(document.querySelector('#display').textContent).toBe('17  ')
	// expect(document.querySelector('#display').textContent).toEqual('.')
})

test('It should accept keyboard input to perform operations', () => {
	render(<Calculadora/>);
	userEvent.type(document.querySelector('#display'), '64+64-64{enter}')
	// fireEvent.click(buttonDecimal)
	// expect(document.querySelector('#display')).toHaveTextContent('.')
	expect(document.querySelector('#display').textContent).toBe('64  ')
	// expect(document.querySelector('#display').textContent).toEqual('.')
})