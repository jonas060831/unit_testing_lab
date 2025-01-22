/*
identifying elements in App.tsx https://vitest.dev/guide/browser/locators.html#options
*/

import {describe, expect, test, assert } from 'vitest'
import { render, screen } from '@testing-library/react';
import App from '../App'
import { useState } from 'react';
import userEvent from '@testing-library/user-event';

describe('App Component', () :void => {

    //header that only accepts h1 
    test("renders an h1 tag with text that says 'Todo'", () :void => {
        const app = render(<App />)
        const heading : HTMLHeadElement = app.getByRole('heading', { level: 1 }) 
        expect(heading).toHaveTextContent('Todo List') 
    })

    //check if there is a input text on the page
    test("renders an input type text with a label of 'Task:'", () :void => {
        const app= render(<App />)
        const todoInputText = app.getByRole('textbox', { name: 'Task:' })
        expect(todoInputText).toBeTruthy()
    })

    //check if there is a button
    test("renders a button with text 'Add'", () => {

        const app = render(<App />)
        const button = app.getByRole('button', { name: 'Add' })
        expect(button)

    })

    //https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react/ example here using data-testid on li element
    test("'Laundry' Task Added to List as a default value", () :void => {
        const app = render(<App />)
        const listElement = app.getAllByTestId('record')

        expect(listElement.length).toBe(1)
    })

    test("Successfully Add Task to the State when Add Button is Clicked", async () :Promise<void> => {
        const app = render(<App />)
        const todoInputText = app.getByRole('textbox', { name: 'Task:' })

        //https://vitest.dev/guide/browser/interactivity-api.html#userevent-type

        
        await userEvent.type(todoInputText, 'Cook Dinner')
        const button = app.getByRole('button', { name: 'Add' })
        await userEvent.click(button)

        let listElement = app.getAllByTestId('record')
        //console.log(listElements.length)

        expect(listElement.length).toBe(2)
    })

    test("Successfully Deletes a task when delete button is clicked", async () :Promise<void> => {
        const app = render(<App />)
        
        const todoInputText = app.getByRole('textbox', { name: 'Task:' })
        const addButton = app.getByRole('button', { name: 'Add' })
        
        const deleteButtons = app.getAllByRole('button', { name: 'DELETE' }) //getAllByRole will result to the array of buttons

        await userEvent.type(todoInputText, 'Car Wash')
      
        await userEvent.click(addButton)

        const listItemBeforeDelete = app.getAllByRole('listitem')
        // console.log(listItemBeforeDelete.length)
        console.log(listItemBeforeDelete.length)

        await userEvent.click(deleteButtons[0]) //click the first delete button which is Laundry
        
        
        const listItemAfterDelete = app.getAllByRole('listitem')

        expect(listItemAfterDelete.length).toBe(1)
    })
})


